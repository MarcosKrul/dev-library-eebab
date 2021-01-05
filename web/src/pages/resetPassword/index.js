import React, { useState } from 'react'

import api from '../../services/api'
import ResetPageComponent from '../../components/login-forgot-reset/index'
import { startFieldsAnimation, startFormAnimation } from '../../utils/start-animation' 

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

            const token = 'token'
            await api.patch(`/users/reset/password?token=${token}`, {
                email: email,
                newPassword: password
            })
            startFormAnimation('Senha alterada com sucesso!', '2')
            
        } catch(error) {
            switch(error.response.data.error){
                case 'user not found':
                    startFormAnimation('Usuário não encontrado.', '2')
                    break
                case 'request to reset_password not found':
                    startFormAnimation('O usuário informado não possui requisição de redefinição.', '2')
                    break
                case 'invalid token': case 'token expired':
                    startFormAnimation('A requisição para redefinição de senha é inválida. Por favor, tente novamente.', '2')
                    break
                default: alert('ERROR')
            }
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