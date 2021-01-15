import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import GoogleLogin from 'react-google-login'

import api from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'

import { startFieldsAnimation } from '../../utils/start-animation' 
import Button from '../../components/buttonWithLoadingAnimation/index'
import LoginPageComponent from '../../components/login-forgot-reset/index'

import './styles.css'

require('dotenv/config')

const LoginPage = () => {

    const history = useHistory()

    const { signIn } = useAuth()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ userMessage, setUserMessage ] = useState('')

    async function handleAuthLogin(e) {
        e.preventDefault()
        
        if(email === '' || password === '') {
            startFieldsAnimation({
                outerClass: 'input-block',
                classToAdd: 'validate-error',
                animation: 'rejectLoginAnimation'
            })
            return
        }

        try {
            setLoading(true)
            const { data } = await api.post('/login', {
                emailToAuth: email,
                passToAuth: password
            })
            signIn(data)
            setLoading(false)
            history.push('/main')
        } catch(error){
            switch(error.response.data.error){
                case 'user not found': 
                    startFieldsAnimation({
                        outerClass: 'in-email-block',
                        classToAdd: 'validate-error',
                        animation: 'rejectLoginAnimation'
                    })
                    break
                case 'invalid password': 
                    startFieldsAnimation({
                        outerClass: 'in-pass-block',
                        classToAdd: 'validate-error',
                        animation: 'rejectLoginAnimation'
                    })
                    break
                default: 
                    startFieldsAnimation({
                        outerClass: 'input-block',
                        classToAdd: 'validate-error',
                        animation: 'rejectLoginAnimation'
                    })
            }
            setLoading(false)
        }            
    }

    async function onSignIn(googleUser) {
        try {
            const { data } = await api.post('/login/google', {
                token: googleUser.getAuthResponse().id_token
            })
            signIn(data)
            history.push('/main')
        } catch (error) {
            switch(error.response.data.error) {
                case 'user not found':
                    setUserMessage('O usuário não possui cadastro no sistema.')
                    break 
                case 'token is null':
                case 'token is not valid':
                    setUserMessage('Ocorreu um erro com a validação da sua conta Google.')
                    break
                default: alert('ERROR')
            }
        }
    }
            
    return (
        <LoginPageComponent
            leftTitle="Bem vindo(a) à biblioteca virtual da Escola de Educação Básica Antônio Blaskowski!"
            rightTitle="Log in"
        >
            <form onSubmit={handleAuthLogin}>
                <div className="input-block">
                    <div className="in-email-block">
                        <input 
                            id="email" 
                            type="text" 
                            placeholder="E-mail" 
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                    </div>
                    <div className="in-pass-block">
                        <input 
                            id="password" 
                            maxLength="45" 
                            type="password" 
                            placeholder="Senha" 
                            onChange={(e) => {setPassword(e.target.value)}}
                        />
                    </div>
                </div>
                <a href="http://localhost:3000/forgot/password/page">Esqueceu sua senha?</a>
                <Button className="btn-login" type="submit" activeLoading={loading}/>
            </form>
            <div className="or-content">
                <hr /><p>ou</p><hr />
            </div>
            <GoogleLogin
                isSignedIn={false}
                onSuccess={onSignIn}
                onFailure={console.log('error login with google')}
                cookiePolicy={'single_host_origin'}
                buttonText="Faça login com o google"
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            />
            <h3>
                {userMessage}
            </h3>
        </LoginPageComponent>
    )
}

export default LoginPage