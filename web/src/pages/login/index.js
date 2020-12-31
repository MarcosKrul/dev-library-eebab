import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import GoogleLogin from 'react-google-login'

import './styles.css'

const LoginPage = () => {

    const history = useHistory()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    
    function handleAuthLogin() {
        const inputEmail = document.querySelector('#email')
        const inputPassword = document.querySelector('#password')
        if(inputEmail.value === '' || inputPassword.value === '') return
        
        // connect with server
        
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

        const inputBlock = document.querySelector('.input-block')
        const btnLogin = document.querySelector('.btn-login')
        btnLogin.addEventListener('click', (event) => {
            event.preventDefault()
                        
            const fields = [...document.querySelectorAll('.left-content input')]
            fields.forEach((field) => {
                if(field.value === '') inputBlock.classList.add('validate-error')
            })

            const formError = document.querySelector('.validate-error')
            if(formError) formError.addEventListener('animationend', (event) => {
                if(event.animationName === 'rejectLoginAnimation') 
                    formError.classList.remove('validate-error')
            })
        })

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
                        <form>
                            <div className="input-block">
                                <input 
                                    id="email" 
                                    type="text" 
                                    placeholder="E-mail" 
                                    onChange={(e) => {setEmail(e.target.value)}}
                                    />
                                <input 
                                    id="password" 
                                    maxLength="45" 
                                    type="password" 
                                    placeholder="Senha" 
                                    onChange={(e) => {setPassword(e.target.value)}}
                                />
                            </div>
                            <a href="http://localhost:3001/reset/password/page">Esqueceu sua senha?</a>
                            <button class="btn-login" onClick={handleAuthLogin}>Enviar</button>
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