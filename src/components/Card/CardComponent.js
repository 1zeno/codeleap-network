import React from 'react';
import './CardComponent.css';

const CardComponent = (props) => {

    return (
        <div className={props.rounded ? 'roundedCard' : 'card'} style={props.style}>
            {props.children}
        </div>
    );
};

export default CardComponent;