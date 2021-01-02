import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import GoogleLogin from 'react-google-login'

import api from '../../services/api'
import { login } from '../../services/auth'

import './styles.css'

const LoginPage = () => {

    const history = useHistory()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    function startFieldsAnimation(outerClass, classToAdd) {
        document.querySelector('.'+outerClass).classList.add(classToAdd)
        const formError = document.querySelector('.'+classToAdd)
        if(formError) { 
            formError.addEventListener('animationend', (event) => {
                if(event.animationName === 'rejectLoginAnimation') 
                    formError.classList.remove(classToAdd)
            })        
        } 
    }

    async function handleAuthLogin(e) {
        e.preventDefault()
        
        if(
            document.querySelector('#email').value    === '' || 
            document.querySelector('#password').value === ''
        ) {
            startFieldsAnimation('input-block', 'validate-error')
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
                case 'user not found': startFieldsAnimation('in-email-block', 'validate-email-error'); break
                case 'invalid password': startFieldsAnimation('in-pass-block', 'validate-pass-error'); break
                default: startFieldsAnimation('input-block', 'validate-error')
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
    
    useEffect(() => {

        const ulCircles = document.querySelector('ul.circles')
        for(let i=0 ; i<12 ; i++) {
            const li = document.createElement('li')
            
            const random = (min, max) => Math.floor(Math.random() * (max - min) + min)
            const size = random(10, 120)
            const delay = random(5, 0.1)
            const position = random(1, 99)
            const duration = random(24, 12)

            li.style.width = `${size}px`
            li.style.height = `${size}px`
            li.style.bottom = `-${size}px`
            li.style.left = `${position}%`
            li.style.animationDelay = `${delay}s`
            li.style.animationDuration = `${duration}s`
            li.style.animationTimingFunction = `cubic-bezier(
                ${Math.random()}, 
                ${Math.random()}, 
                ${Math.random()}, 
                ${Math.random()}
            )`
            
            ulCircles.appendChild(li)
        }

    }, [])
        
    return (
        <div className="container-image">
            <ul className="circles" />
            <div className="container-content">
                <div className="container-content-left">
                    <div className="top-content">
                        <h1>
                            Bem vindo(a) à biblioteca virtual da Escola de Educação Básica Antônio Blaskowski!
                        </h1>
                    </div>
                    <div className="bottom-content"></div>
                </div>
                <div className="container-content-right">
                    <div className="left-content">
                        Log in
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
                            <a href="http://localhost:3000/reset/password/page">Esqueceu sua senha?</a>
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
                    </div>
                    <div className="right-content" />
                </div> 
            </div>
        </div>
    )
}

export default LoginPage