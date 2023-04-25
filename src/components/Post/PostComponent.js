import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Card, Button, Input, Modal } from '../';
import { getTime } from '../../resources/helpers';
import './PostComponent.css';
import strings from '../../resources/strings';

const PostComponent = (props) => {
    const {
        data,
        isAuthor,
        onEdit,
        onDelete,
    } = props;

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    const state = useSelector((state) => state);
    const pageStrings = strings[state.login.data.language];

    const onOpenModalDelete = () => setOpenDelete(true);
    const onCloseModalDelete = () => setOpenDelete(false);

    const onOpenModalEdit = () => {
        setEditTitle(data.title);
        setEditContent(data.content);
        setOpenEdit(true);
    }
    const onCloseModalEdit = () => setOpenEdit(false);

    return (
        <>
            <Card
                rounded={true}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #999999',
                    margin: '24px 0px',
                }}
            >
                <div className='home-postTitle'>
                    <h2>{data.title}</h2>
                    <div className='home-postTitleIcons'>
                        {isAuthor && (
                            <>
                                <Button onClick={onOpenModalDelete}>
                                    <img src='./icons/deleteIcon.svg' alt='delete-icon' />
                                </Button>
                                <Button onClick={onOpenModalEdit}>
                                    <img src='./icons/editIcon.svg' alt='edit-icon' />
                                </Button>
                            </>
                        )}
                    </div>
                </div>
                <div className='home-postContent'>
                    <div className='home-postUserInfo'>
                        <p className='home-postUserName'>@{data.username}</p>
                        <p>{getTime(data.created_datetime)}</p>
                    </div>
                    <p className='home-postDescription'>
                        {data.content}
                    </p>
                </div>
            </Card>
            <Modal
                isOpen={openDelete}
                onClose={onCloseModalDelete}
                title={pageStrings.pages.home.modal.delete.title}
                button={{
                    title: pageStrings.common.delete,
                    color: '#FF5151',
                    onClick: ()=>{
                        onDelete(data.id);
                        onCloseModalDelete();
                    }
                }}
            />
            <Modal
                isOpen={openEdit}
                onClose={onCloseModalEdit}
                title={pageStrings.common.edit}
                button={{
                    title: pageStrings.common.save,
                    color: '#47B960',
                    onClick: ()=>{
                        onEdit(
                            data.id,
                            {
                                title: editTitle,
                                content: editContent,
                            },
                        );
                        onCloseModalEdit();
                    },
                    disabled: !editTitle || !editContent,
                }}
            >
                <p>{pageStrings.common.title}</p>
                <Input
                    placeholder={pageStrings.common.placeholders.helloWorld}
                    value={editTitle}
                    onChange={(event) => setEditTitle(event.target.value)}
                />
                <p>{pageStrings.common.content}</p>
                <textarea
                    className='home-textarea'
                    placeholder={pageStrings.common.placeholders.contentHere}
                    value={editContent}
                    onChange={(event) => setEditContent(event.target.value)}
                />

            </Modal>
        </>
    );
};

export default PostComponent;