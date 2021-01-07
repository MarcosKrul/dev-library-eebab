import React from 'react'
import './assets/styles/global.css'
import Routes from './routes'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  )
}

export default App
