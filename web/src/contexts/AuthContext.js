import React, { useState, useContext, createContext, useEffect } from 'react'
import { getUser, login, logout } from '../services/auth'

const AuthContext = createContext({
    user: {}
})

export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState({})

    function signIn(data) {
        setUser(data.user)
        login(data.token, data.user)
    }

    function signOut() {
        logout()
        setUser({})
    }

    useEffect(() => {
        function loadStoragedData() {
            const storagedUser = getUser()
            if(storagedUser) setUser(JSON.parse(storagedUser))
        }
        loadStoragedData()
    }, [])
    
    return (
        <AuthContext.Provider value={{isAuthenticated: !!user, user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    return context
}
