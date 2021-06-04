import React from 'react';
import Lottie from 'react-lottie';
import './AnimationLoading.css';

const AnimationLoading = ({ lotti, width, height}) => {

    const defaultOptions = {
        loop: true,
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
            <h1 className="promotion-list__loading">{`Carregando`}</h1>
        </>
    );
};

export default AnimationLoading;