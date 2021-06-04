import React from 'react';
import Lottie from 'react-lottie';
import './AnimationError.css';

const AnimationError = ({ lotti, width, height}) => {

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: lotti,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <>
            <Lottie 
                options={defaultOptions}
                width={width}
                height={height}
            />
            <h1 className="promotion-list__error">{`Aplicação apresenta erros, contate o suporte!`}</h1>
        </>
    );
};

export default AnimationError;