import React, { useState } from 'react'

import startFieldsAnimation from '../../utils/start-animation' 
import ForgotPageComponent from '../../components/login-forgot-reset/index'

import './styles.css'

const ForgotPasswordPage = () => {
    
    const [ email, setEmail ] = useState('')

    async function handleForgotPassword(e) {
        e.preventDefault()

        if(document.querySelector('#email').value === '') {
            startFieldsAnimation({
                outerClass: 'input-block',
                classToAdd: 'validate-error',
                animation: 'rejectLoginAnimation'
            })
            return
        }

        try {
                        
            const classMessage = document.querySelector('.message-user')
            if(!classMessage){
                const message = document.createElement('div')
                message.textContent = `Enviamos um email para "${email}" com as próximas instruções. Obrigado!`
                message.classList.add('message-user')

                startFieldsAnimation({
                    outerClass: 'form-block',
                    classToAdd: 'validate-sucess',
                    animation: 'response-animation'
                })
                
                const classValidate = document.querySelector('.validate-sucess')
                classValidate.addEventListener('animationend', (event) => {
                    if(event.animationName === 'response-animation')
                        document.querySelector('form').prepend(message)
                })
            }

        } catch(error) {
            alert('error')
            console.log(error)
        }
    }

    return (
        <ForgotPageComponent
            leftTitle="Por favor, nos informe seu e-mail para que possamos validar sua redefinição."
            rightTitle="Recuperação"
        >
            <div className="form-block">
                <form onSubmit={handleForgotPassword}>
                    <div className="input-block">
                        <input
                            id="email"
                            type="text"
                            placeholder="E-mail"
                            onChange={(e) => {setEmail(e.target.value)}}
                            />
                    </div>
                    <button className="btn-forgot" type="submit">Enviar</button>
                </form>
            </div>
        </ForgotPageComponent>
    )
}

export default ForgotPasswordPage