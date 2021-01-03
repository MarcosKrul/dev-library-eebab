import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import GoogleLogin from 'react-google-login'

import api from '../../services/api'
import { login } from '../../services/auth'

import LoginPageComponent from '../../components/login-forgot-reset/index'

import startFieldsAnimation from '../../utils/start-animation' 

import './styles.css'

const LoginPage = () => {

    const history = useHistory()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    async function handleAuthLogin(e) {
        e.preventDefault()
        
        if(
            document.querySelector('#email').value    === '' || 
            document.querySelector('#password').value === ''
        ) {
            startFieldsAnimation({
                outerClass: 'input-block',
                classToAdd: 'validate-error',
                animation: 'rejectLoginAnimation'
            })
            return
        }

        try {
            const response = await api.post('/login', {
                emailToAuth: email,
                passToAuth: password
            })
            login(response.data.token)
            history.push('/main')
        } catch(error){
            switch(error.response.data.error){
                case 'user not found': 
                    startFieldsAnimation({
                        outerClass: 'in-email-block',
                        classToAdd: 'validate-email-error',
                        animation: 'rejectLoginAnimation'
                    })
                    break
                case 'invalid password': 
                    startFieldsAnimation({
                        outerClass: 'in-pass-block',
                        classToAdd: 'validate-pass-error',
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
        }            
    }

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile()
        console.log('Name: ' + profile.getName())
        console.log('Image URL: ' + profile.getImageUrl())
        console.log('Email: ' + profile.getEmail())
        console.log('Token: ' + googleUser.getAuthResponse().id_token)
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
                <button className="btn-login" type="submit">Enviar</button>
            </form>
            <div className="or-content">
                <hr /><p>ou</p><hr />
            </div>
            <GoogleLogin
                isSignedIn={true}
                onSuccess={onSignIn}
                onFailure={console.log('error login with google')}
                cookiePolicy={'single_host_origin'}
                buttonText="Faça login com o google"
                clientId="1038099324845-rkju37roc4fm8r5q3qj9nd6gu8egqcvo.apps.googleusercontent.com"
                // render={(renderProps) => (
                //     <button>Log in com o google</button>
                // )}
            />
        </LoginPageComponent>
    )
}

export default LoginPage