import React, { useState } from 'react'

import startFieldsAnimation from '../../utils/start-animation' 
import ResetPageComponent from '../../components/login-forgot-reset/index'

import './styles.css'

const ResetPasswordPage = () => {

    const [ email, setEmail] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPass, setConfirmPass ] = useState('')

    async function handleResetPassword(e) {
        e.preventDefault()

        if(
            document.querySelector('#email').value === '' ||
            document.querySelector('#password').value === '' ||
            document.querySelector('#confirm-password').value === ''
        ) {
            startFieldsAnimation({
                outerClass: 'input-block',
                classToAdd: 'validate-error',
                animation: 'rejectLoginAnimation'
            })
            return
        }
        if(password !== confirmPass) {
            console.log(password, confirmPass)
            startFieldsAnimation({
                outerClass: 'in-pass-block',
                classToAdd: 'validate-error',
                animation: 'rejectLoginAnimation'
            })
            return
        }

        try {

            // connect server

            const classMessage = document.querySelector('.message-user2')
            if(!classMessage){
                const message = document.createElement('div')
                message.textContent = 'Senha alterada com sucesso!'
                message.classList.add('message-user2')

                startFieldsAnimation({
                    outerClass: 'form-block',
                    classToAdd: 'validate-sucess2',
                    animation: 'response-animation2'
                })
                
                const classValidate = document.querySelector('.validate-sucess2')
                classValidate.addEventListener('animationend', (event) => {
                    if(event.animationName === 'response-animation2')
                        document.querySelector('form').prepend(message)
                })
            }
            
        } catch(error) {
            alert('error')
            console.log(error)
        }
    }

    return (
        <ResetPageComponent
            leftTitle="Por favor, insira suas novas credenciais ao lado."
            rightTitle="Redefinição"
        >
            <div className="form-block">
                <form onSubmit={handleResetPassword}>
                    <div className="input-block">
                        <input 
                            id="email"
                            type="text"
                            placeholder="E-mail"
                            onChange={(e) => {setEmail(e.target.value)}}
                        />
                        <div className="in-pass-block">
                            <input 
                                id="password"
                                type="password"
                                placeholder="Nova senha"
                                maxLength={45}
                                onChange={(e) => {setPassword(e.target.value)}}
                                />
                            <input 
                                id="confirm-password"
                                type="password"
                                placeholder="Confirme a nova senha"
                                maxLength={45}
                                onChange={(e) => {setConfirmPass(e.target.value)}}
                            />
                        </div>
                    </div>
                    <button className="btn-reset" type="submit">Enviar</button>
                </form>
            </div>
        </ResetPageComponent>
    )
}

export default ResetPasswordPage