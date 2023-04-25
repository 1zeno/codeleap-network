import React from 'react';
import './InputComponent.css';

const InputComponent = (props) => {
    return (
        <input className='input' {...props}/>
    );
};

export default InputComponent;