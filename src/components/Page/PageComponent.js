import React from 'react';
import './PageComponent.css';

const PageComponent = ({children}) => {
    return (
        <div className='page'>
            {children}
        </div>
    );
};

export default PageComponent;