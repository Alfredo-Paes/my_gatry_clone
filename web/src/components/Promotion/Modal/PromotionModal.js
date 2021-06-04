import React, {useEffect, useState} from 'react';
import UIModal from 'components/UI/Modal/Modal';
import PromotionModalCommentsTree from './Comments/PromotionModalCommentsTree';
import useApi from 'components/utils/useApi';
import './PromotionModal.css';

const PromotionModal = ({promotionId,  onClickClose}) => {
    const [comment, setComment ] = useState('');
    const [load, loadInfo] = useApi({
        url: '/comments',
        params: {
            promotionId,
            _expand:'user'
        }
    });

    const [sendComment, sendCommentInfo] = useApi({
        url: '/comments',
        method: 'POST',
    });

    useEffect(() => {
        load();
    }, []);

    async function onSubmit(event){
        event.preventDefault();
        try {
            await sendComment({
                data: {
                    userId:1,
                    promotionId,
                    comment,
                }
            });
            setComment('');
            load({quietly: true});
        } catch (error) {}
    }

    async function sendAnswer(text, parentId) {
        await sendComment({
            data: {
                userId:1,
                promotionId,
                comment: text,
                parentId
            }
        });
        load();
    }

    return (
        <UIModal 
            isOpen
            onClickClose={onClickClose}
            titleModal={`Comentários`}
        >
            <form className="promotion-modal__comment-form" onSubmit={onSubmit}>
                <textarea 
                    placeholder="Comentar..." 
                    onChange={(event) => setComment(event.target.value)}
                    value={comment}
                />
                <button 
                    type="submit" 
                    disabled={sendCommentInfo.loading}>
                        {sendCommentInfo.loading? `Enviando...` : `Enviar`}
                </button>
            </form>
            <PromotionModalCommentsTree
                key={loadInfo.id}
                comments={loadInfo.data}
                sendCommentAnswer={sendAnswer}
            />
        </UIModal>
            
    );
};

export default PromotionModal;