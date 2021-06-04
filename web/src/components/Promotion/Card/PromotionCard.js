import React from 'react';
import { Link } from 'react-router-dom';
import {ImCancelCircle} from 'react-icons/im'
import UIButton from 'components/UI/Button/Button';
import './PromotionCard.css';

const PromotionCard = ({ promotion, onClickComents, onClickDelete }) => (
    <div className="promotion-card">
        <img
            src={promotion.imageUrl}
            className="promotion-card__image"
            alt={promotion.title}
        />
        <div className="promotion-card__info">
            <h1 className="promotion-card__title">{promotion.title}</h1>
            <span className="promotion-card__price">{`R$ ${promotion.price}`}</span>
            <footer className="promotion-card__footer">
                {promotion.comments.length > 0 && (
                    <div className="promotion-card__comment">
                        "{promotion.comments[0].comment}"
                    </div>
                )}
                <button 
                    onClick={onClickComents}
                    className="promotion-card__comments-count"
                    type="button" >
                    {promotion.comments.length}{' '}
                    {promotion.comments.length > 1
                        ? 'Comentários'
                        : 'Comentário'}
                </button>
                <UIButton
                    component="a"
                    href={promotion.url}
                    target="_blank"
                    rel="noreferrer"
                >
                    {`Ir para o site`}
                </UIButton>
                <UIButton
                    component={Link} 
                    theme="contained-yellow"
                    className="promotion-card__edit-button"
                    to={`/edit/${promotion.id}`}>
                    {`Editar`}
                </UIButton>
            </footer>
            <button 
                className="promotion-card__delete-button"
                type="button"
                onClick={onClickDelete}
            >
                <ImCancelCircle/>
            </button>
        </div>
    </div>
);

export default PromotionCard;
