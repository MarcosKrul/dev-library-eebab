import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import api from '../../services/api'

import { startFieldsAnimation } from '../../utils/start-animation.js'
import RegisterPageComponent from '../../components/auth-pages/index'
import RegisterWithEmailComponent from '../../components/registerWithEmail/index'
import RegisterWithGoogleComponent from '../../components/registerWithGoogleAcc/index'
import AvatarChooserComponent from '../../components/avatarFileChooser/index'

import './styles.css'

require('dotenv/config')

const RegisterPage = () => {
    
    const history = useHistory()

    const { token } = useParams()

    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ userMessage, setUserMessage ] = useState('')
    const [ confirmPass, setConfirmPass ] = useState('')
    const [ registerWithEmail, setRegisterWithEmail ] = useState(true)
    const [ avatar, setAvatar ] = useState('http://localhost:3333/files/cb78c6153c2a1e3d9be89b08eccd28ff-avatar-default.png')
        
    function handleError(err) {
        switch(err) {
            case 'user already exists':
                setUserMessage('O usuário já possui cadastro no sistema.')
                break
            case 'user has no invitation':
                setUserMessage('O usuário não possui um convite para cadastro.')
                break
            case 'invalid token': 
            case 'token expired':
                setUserMessage('O convite para cadastro é inválido.')
                break
            case 'password is null':
            case 'email is not valid':
            case 'name exceed 45 char':
            case 'email exceed 45 char':
            case 'password exceed 45 char':
                setUserMessage('Existe algum erro nas credenciais informadas.')
                break
            default: alert('ERROR')
        }
    }

    async function handleRegister(e) {
        e.preventDefault()

        if(name === '' || avatar === '' || password === '' || confirmPass === '') { 
            startFieldsAnimation({
                outerClass: 'input-block-re',
                classToAdd: 'validate-error',
                animation: 'rejectLoginAnimation'
            }) 
            return
        }
        
        if(password !== confirmPass) {
            startFieldsAnimation({
                outerClass: 'pass-block-re',
                classToAdd: 'validate-error',
                animation: 'rejectLoginAnimation'
            })
            return
        }

        try {
            setLoading(true)
            await api.post(`/users/${token}`, {
                name: name,
                email: email,
                avatar: avatar, 
                password: password
            })
            setLoading(false)
            history.push('/')
        } catch(error) { 
            setLoading(false)
            handleError(error.response.data.error) 
        }
    } 
    
    async function handleRegisterGoogleAcc(googleUser) {    
        try {
            const profile = googleUser.getBasicProfile()
            await api.post(`/users/${token}`, {
                password: '',
                googleAcc: true,
                name: profile.getName(),
                email: profile.getEmail(),
                avatar: profile.getImageUrl() 
            })
            history.push('/')            
        } catch(error) { handleError(error.response.data.error) }
    }

    return (
        <RegisterPageComponent>
            <div className="register-container">
                {registerWithEmail? 
                    <RegisterWithEmailComponent  setState={() => {setRegisterWithEmail(!registerWithEmail)}}>
                        <div className="container-register-email">
                            <div className="title-container-re">
                                <h1>Cadastro com email</h1>
                            </div>
                            <div className="input-block-re">
                                <form id="form-re" onSubmit={handleRegister}>
                                    <h2>Dados pessoais</h2>
                                    <input 
                                        id="name"
                                        type="text"
                                        maxLength={45}
                                        placeholder="Nome completo"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <input 
                                        id="email"
                                        type="text"
                                        maxLength={45}
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div className="pass-block-re">
                                        <input 
                                            id="password"
                                            type="password"
                                            maxLength={45}
                                            placeholder="Senha"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <input 
                                            id="confirm-password"
                                            type="password"
                                            maxLength={45}
                                            placeholder="Confirme sua senha"
                                            onChange={(e) => setConfirmPass(e.target.value)}
                                        />
                                    </div>
                                    <div className="user-message">
                                        {userMessage}
                                    </div>
                                </form>
                             </div>
                            <div className="avatar-choice-container-re">
                                <h2>Foto de perfil</h2>
                                <AvatarChooserComponent 
                                    avatar={avatar}
                                    setAvatar={setAvatar}
                                />
                            </div>
                            <button type="submit" form="form-re">
                                {loading? 'Enviando...' : 'Enviar'}
                            </button>
                        </div>
                    </RegisterWithEmailComponent> 
                    :
                    <RegisterWithGoogleComponent setState={() => {setRegisterWithEmail(!registerWithEmail)}}>
                        <div className="container-register-googleacc">
                            <GoogleLogin
                                theme={'dark'}
                                isSignedIn={false}
                                onSuccess={handleRegisterGoogleAcc}
                                cookiePolicy={'single_host_origin'}
                                buttonText="Faça cadastro com conta Google"
                                onFailure={console.log('error login with google')}
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            />
                        </div>
                        <h3>{userMessage}</h3>
                    </RegisterWithGoogleComponent>
                }
            </div>
        </RegisterPageComponent>
    )
}

export default RegisterPage
