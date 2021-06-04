import React, {useState} from 'react';
import useApi from 'components/utils/useApi';
import PromotionCard from 'components/Promotion/Card/PromotionCard';
import PromotionModal from 'components/Promotion/Modal/PromotionModal';
import AnimationLoading from 'components/Animation/Loading/AnimationLoading';
import AnimationError from 'components/Animation/Error/AnimationError';
import loading_lottie from 'assets/lotties/loading_lottie';
import error_lottie from 'assets/lotties/error_lottie';
import './PromotionList.css';

const PromotionList = ({ loading, promotions, error, refetch }) => {
    
    const [promotionId, setPromotionId] = useState(null);
    const [deletePromotion, deletePromotionInfo] = useApi({
        method: 'DELETE',
    })

    if(error){
        return (
            <>
                <AnimationError
                    lotti={error_lottie}
                    width={120}
                    height={120}
                />
            </>
        );
    }

    if(promotions === null || deletePromotionInfo.loading){
        return (
            <>
                <AnimationLoading
                    lotti={loading_lottie}
                    width={120}
                    height={120}
                />
            </>
        );
    };

    if(promotions.length === 0){
        return <div>{`Nenhum resultado encontrado!`}</div>
    }

    return (
        <div className="promotion-list">
            {promotions.map((promotion) => (
                <PromotionCard 
                    key={promotion.id}
                    promotion={promotion} 
                    onClickComents={() => setPromotionId(promotion.id)}
                    onClickDelete={ async ()=>{
                        await deletePromotion({
                            url: `/promotions/${promotion.id}`,
                        });
                        refetch();
                    }}
                />
            ))}
            {loading && <div>{`Carregando mais promoções...`}</div>}
            {promotionId && (
                <PromotionModal
                    promotionId={promotionId}
                    onClickClose={() => setPromotionId(null)}
                />
            )}
        </div>
    );
};

export default PromotionList;