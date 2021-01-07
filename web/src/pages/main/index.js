import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

const MainPage = () => {

    const { user, signOut } = useAuth()

    function handleSignOut() {
        signOut()
    }

    return(
        <div>
            <h1>
                Bem vindo, {user.name}
            </h1>
            <form onSubmit={handleSignOut}>
                <button type="submit">Sair</button>
            </form>
        </div>
    )
}

export default MainPage