import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const portalRoot = document.getElementById('portal-root');

const UIModal = ({children, isOpen, onClickClose, titleModal}) => {

    if(!isOpen){
        return null;
    };

    return ReactDOM.createPortal(
        <div className="ui-modal__overlay">
            <div className="ui-modal">
                <button 
                    className="ui-modal__close-button"
                    type="button"
                    onClick={onClickClose}>
                    {`X`}
                </button>
                {titleModal ? titleModal : ''}
                {children}
            </div>
        </div>,
        portalRoot,
    );

};

export default UIModal; 