import React, {useState, useMemo} from 'react';
import './PromotionModalCommentsTree.css';


function getTree(list) {
  if (!list) {
    return [];
  }
  const roots = [];
  const childrenByParentId = {};

  list.forEach((item) => {
    if (!item.parentId) {
      roots.push(item);
      return;
    }
    if (!childrenByParentId[item.parentId]) {
      childrenByParentId[item.parentId] = [];
    }
    childrenByParentId[item.parentId].push(item);
  });

  function buildNodes(nodes) {
    if (!nodes) {
      return null;
    }
    return nodes.map((node) => ({
      ...node,
      children: buildNodes(childrenByParentId[node.id]),
    }));
  }

  return buildNodes(roots);
}


const PromotionModalCommentsTree = ({comments, sendCommentAnswer}) => {
  const tree = useMemo(() => getTree(comments), [comments]);
  const [commentAnswer, setCommentAnswer] = useState('');
  const [activeCommentBox, setActiveCommentBox] = useState(null);

  if(!comments){
    return <h1>...</h1>
  }

  function renderItem(item){
    return(
      <div className="scroll">
        <li key={item.id} className="promotion-modal-comments-tree__item" >
        <img 
          className="promotion-modal-comments-tree__item__avatar" 
          src={item.user.avatarUrl} 
          alt={`foto de ${item.user.name}`}/>
        
        <div className="promotion-modal-comments-tree__item__info">
          <span className="promotion-modal-comments-tree__item__name">{item.user.name}</span>
          <p>{item.comment}</p>
          <button
            className="promotion-modal-comments-tree__answer-button"
            type="button"
            onClick={
              () => {
                setCommentAnswer('')
                setActiveCommentBox(
                  activeCommentBox === item.id ? null : item.id
                );
              } 
            } 
          >
            {`Responder`}
          </button>
          {activeCommentBox === item.id && (

            <div className="promotion-modal-comments-tree__comment-box">
              <textarea 
                value={commentAnswer} 
                onChange={(event)=> setCommentAnswer(event.target.value)}
              />
              <button 
                className="promotion-modal-comments-tree__send-button" 
                type="button"
                onClick={() => {
                    sendCommentAnswer(commentAnswer, item.id);
                    setCommentAnswer('');
                    setActiveCommentBox(null);
                  }
                }
              >
                {`Enviar`}
              </button>
            </div>

          )}
          {item.children && renderList(item.children)}
        </div>
      </li>
      </div>
      
    );
  }

  function renderList(list){
    return(
      <ul className="promotion-modal-comments-tree">
        {list.map(renderItem)}
      </ul>
    );
  }


  return renderList(tree);
};

PromotionModalCommentsTree.defaultProps = {
  sendCommentAnswer: (comment, parentId) => {},
}

export default PromotionModalCommentsTree;