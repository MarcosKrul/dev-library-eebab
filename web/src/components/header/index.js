import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

import { Li, Ul, Container } from './styles'
import { GoSignOut, GoBell } from 'react-icons/go'

const Header = () => {
    
    const { signOut } = useAuth()
    
    return (
        <Container>
            <Ul>
                <Li>Bem vindo(a) ao painel principal da biblioteca EEB Antônio Blaskowski!</Li>
                <Li>
                    <button><GoBell /></button>
                </Li>
                <Li>
                    <form onSubmit={signOut}>
                        <button type="submit"><GoSignOut /></button>
                    </form>
                </Li>
            </Ul>
        </Container>
    )
}

export default Header