import React from 'react';
import './ButtonComponent.css';

const ButtonComponent = (props) => {

    return (
        <button className='button' {...props}>{props.children}</button>
    );
};

export default ButtonComponent;