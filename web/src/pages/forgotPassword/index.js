import React, { useState } from 'react'

import api from '../../services/api'
import ForgotPageComponent from '../../components/login-forgot-reset/index'
import { startFieldsAnimation, startFormAnimation } from '../../utils/start-animation' 

import './styles.css'

const ForgotPasswordPage = () => {
    
    const [ email, setEmail ] = useState('')

    async function handleForgotPassword(e) {
        e.preventDefault()

        if(email === '') {
            startFieldsAnimation({
                outerClass: 'input-block',
                classToAdd: 'validate-error',
                animation: 'rejectLoginAnimation'
            })
            return
        }

        try {
            
            await api.patch('/users/forgot/password', {
                email: email
            })
            startFormAnimation(`Enviamos um email para "${email}" com as próximas instruções. Obrigado!`)

        } catch(error) {
            switch(error.response.data.error) {
                case 'user not found': 
                    startFormAnimation('Usuário não encontrado.')
                    break
                case 'google user':
                    startFormAnimation('Não podemos alterar a senha de uma conta de outro domínio.')
                    break
                default: alert('ERROR')
            }
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