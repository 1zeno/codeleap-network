import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Page, Input, Button, Post, Loader } from '../../components';
import {
    fetchPosts, fetchNextPosts, createPost,
    deletePost, editPost,
} from '../../actions/home';
import { login, logout, changeLanguage } from '../../actions/login';
import strings from '../../resources/strings';
import './HomePage.css'


const HomePage = () => {
    const stateHome = useSelector((state) => state.home);
    const stateLogin = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isFetched, setisFetched] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [language, setLanguage] = useState('en-us');

    const loaderRef = useRef(null);
    const hasNext = useMemo(() =>
        stateHome.fetch.data &&
        stateHome.fetch.data.next &&
        stateHome.fetch.data.next.length > 0,
        [stateHome.fetch.data],
    );
    const pageStrings = useMemo(() => strings[language], [language])

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasNext) {
            dispatch(fetchNextPosts());
        }
    }, [dispatch, hasNext]);

    const onLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    const createNewPost = useCallback(() => {
        const data = {
            username: stateLogin.data.username,
            title,
            content,
        }
        dispatch(createPost(data));
        setTitle('');
        setContent('');
    }, [content, dispatch, stateLogin.data, title]);

    const onEdit = (id, data) => {
        dispatch(editPost(id, data));
    }

    const onDelete = (id) => {
        dispatch(deletePost(id));
    };

    const onChangeLanguage = (value) => {
        dispatch(changeLanguage(value));
        setLanguage(value);
    }

    const fetch = useCallback(() => {
        dispatch(login());
        dispatch(fetchPosts());
        setisFetched(true);
    }, [dispatch])

    //Effects

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        };
        return () => {
            if (loaderRef.current) {
              observer.unobserve(loaderRef.current);
            }
          };
    }, [loaderRef, handleObserver]);

    useEffect(() => {
        if (stateLogin.data) {
            setLanguage(stateLogin.data.language);
        }
    }, [stateLogin.data])

    useEffect(() => {
        if(!isFetched){
            fetch();
        };
    }, [fetch, isFetched]);


    if (!isFetched) {
        return (
            <div className='home-initialLoader'>
                <Loader type='spin' />
            </div>);
    }
    return (
        <Page>
            <Card
                style={{
                    maxWidth: '800px',
                }}
            >
                <div className='home-cardContent'>
                    <div className='home-titleContent'>
                        <h2>CodeLeap Network</h2>
                        {stateLogin.data ? (
                            <Button onClick={onLogout} style={{ width: 'auto' }}>
                                <img src='./icons/logoutIcon.svg' alt='logout-icon' />
                            </Button>
                        ) : (
                            <Button onClick={() => navigate('/')} style={{ width: 'auto' }}>
                                <img src='./icons/loginIcon.svg' alt='login-icon' />
                            </Button>
                        )}
                    </div>
                    <select
                        className='home-select'
                        onChange={(event) => onChangeLanguage(event.target.value)}
                        defaultValue={language}
                    >
                        <option value='en-us'>{pageStrings.common.english}</option>
                        <option value='pt-br'>{pageStrings.common.brazilianPortuguese}</option>
                    </select>
                    <div className='home-content'>
                        {stateLogin.data && (
                            <Card
                                rounded={true}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    border: '1px solid #999999',
                                    padding: '24px',
                                    overflowY: 'auto',
                                }}
                            >
                                <h2>{pageStrings.pages.home.title}</h2>
                                <p>{pageStrings.common.title}</p>
                                <Input
                                    placeholder={pageStrings.common.placeholders.helloWorld}
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                                <p>{pageStrings.common.content}</p>
                                <textarea
                                    className='home-textarea'
                                    placeholder={pageStrings.common.placeholders.contentHere}
                                    value={content}
                                    onChange={(event) => setContent(event.target.value)}
                                />
                                <Button
                                    style={{ marginTop: '16px' }}
                                    onClick={createNewPost}
                                    disabled={!title || !content}
                                >
                                    {pageStrings.common.create}
                                </Button>
                            </Card>
                        )}
                        {stateHome.fetch.data && stateHome.fetch.data.results.map((data, index) => (
                            <Post
                                key={index}
                                data={data}
                                isAuthor={stateLogin && stateLogin.data && (stateLogin.data.username === data.username)}
                                onDelete={onDelete}
                                onEdit={onEdit}
                            />
                        ))}
                        {hasNext && (
                            <div ref={loaderRef} className='loader'>
                                <Loader isVisible={hasNext} />
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </Page>
    );
}

export default HomePage;