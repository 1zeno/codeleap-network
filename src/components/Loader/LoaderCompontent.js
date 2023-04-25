import React from 'react';
import { TailSpin, ThreeDots } from 'react-loader-spinner';

const LoaderComponent = (props) => {
    const {type, isVisible} = props;
    if(type === 'spin'){
       return(
            <TailSpin
                height="80"
                width="80"
                color="#7695EC"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={isVisible}
            />
        )
    }
    return (
        <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="#7695EC" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={isVisible}
        />
    );
};

export default LoaderComponent;