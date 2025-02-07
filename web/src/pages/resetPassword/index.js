import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../services/api'

import Button from '../../components/buttonWithLoadingAnimation/index'
import ResetPageComponent from '../../components/login-forgot-reset/index'
import { startFieldsAnimation, startFormAnimation } from '../../utils/start-animation' 

import './styles.css'

const ResetPasswordPage = () => {

    const { token } = useParams()

    const [ email, setEmail] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loading, setLoading ] = useState(false)
    const [ confirmPass, setConfirmPass ] = useState('')

    async function handleResetPassword(e) {
        e.preventDefault()

        if(email === '' || password === '' || confirmPass === '') {
            startFieldsAnimation({
                outerClass: 'input-block',
                classToAdd: 'validate-error',
                animation: 'rejectLoginAnimation'
            })
            return
        }
        if(password !== confirmPass) {
            startFieldsAnimation({
                outerClass: 'in-pass-block',
                classToAdd: 'validate-error',
                animation: 'rejectLoginAnimation'
            })
            return
        }

        try {

            setLoading(true)
            await api.patch(`/users/reset/password?token=${token}`, {
                email: email,
                newPassword: password
            })
            setLoading(false)
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
            setLoading(false)
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
                    <Button className="btn-reset" type="submit" activeLoading={loading}/>
                </form>
            </div>
        </ResetPageComponent>
    )
}

export default ResetPasswordPage