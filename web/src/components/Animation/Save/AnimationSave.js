import React from 'react';
import Lottie from 'react-lottie';
import './AnimationSave.css';

const AnimationSave = ({ lotti, width, height, id}) => {

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: lotti,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        
            <div className={"promotion-list__save-animation"}>
                <Lottie
                    options={defaultOptions}
                    width={width}
                    height={height}
                />
                <h1 className="promotion-list__save-text">{id ? `Salvando edição...` : `Salvando promoção...`}</h1>
            </div>
            
        
        
    );
};

export default AnimationSave;