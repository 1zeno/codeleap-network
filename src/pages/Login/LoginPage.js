import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Page, Card, Button, Input} from '../../components';
import { signUp, login } from '../../actions/login';
import strings from '../../resources/strings';
import './LoginPage.css'
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [language, setLanguage] = useState('en-us');
    const pageStrings = useMemo(()=>strings[language],[language])

    const onSubmit = useCallback(() => {
        dispatch(signUp(username, language));
    }, [dispatch, language, username])

    const fetch = useCallback(() => {
        dispatch(login());
        if(state.login.data){
            navigate('/home');
        }
    }, [dispatch, navigate, state.login.data])

    useEffect(()=>{
        fetch();
    },[fetch])

    return(
        <Page>
            <div
                style={{
                    maxWidth: '500px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh'
                }}
            >
                <Card
                    rounded={true}
                >
                    <div className='login-cardContent'>
                        <h2>{pageStrings.pages.login.title}</h2>
                        <p>{pageStrings.pages.login.inputTitle}</p>
                        <div className='login-actionContent'>
                            <Input
                                placeholder='John doe'  
                                value={username}
                                onChange={(event)=>setUsername(event.target.value)}
                            />
                            <select
                                className='login-select'
                                onChange={(event)=>setLanguage(event.target.value)}
                                defaultValue={language}
                            >
                                <option value='en-us'>{pageStrings.common.english}</option>
                                <option value='pt-br'>{pageStrings.common.brazilianPortuguese}</option>
                            </select>
                            <Button
                                onClick={onSubmit}
                                style={{ marginTop: '16px' }}
                                disabled={!username}
                            >
                                {pageStrings.pages.login.enter}
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}

export default LoginPage;