import React from 'react';
import { Modal } from 'react-responsive-modal';
import { useSelector } from 'react-redux';
import 'react-responsive-modal/styles.css';
import strings from '../../resources/strings';
import { Button } from '../';
import './ModalComponent.css';

const ModalComponent = (props) => {
    const {
        title,
        button,
        isOpen,
        onClose,
        children,
    } = props;

    const state = useSelector((state) => state);
    const pageStrings = strings[state.login.data.language];

    return (
            <Modal
                open={isOpen}
                onClose={onClose}
                animationDuration={0}
                center={true}
                showCloseIcon={false}
                classNames={{modal: 'modal-postContent'}}
                styles={{modal:{ borderRadius: "16px",  width: '80%'}}}
            >
                <h2 style={{fontSize: '22px'}}>{title}</h2>
                {children}
                <div style={{display: 'flex', justifyContent: 'end', marginTop: '24px'}}>
                    <Button
                        onClick={onClose}
                        style={{
                            background: '#FFFFFF',
                            color: '#000000',
                            border: '1px solid #000000',
                        }}
                    >
                        {pageStrings.common.cancel}
                    </Button>
                    <Button
                        style={{ background: button.color, marginLeft: '24px' }}
                        onClick={button.onClick}
                        disabled={button.disabled}
                    >
                        {button.title}
                    </Button>
                </div>
            </Modal>
    );
};

export default ModalComponent;