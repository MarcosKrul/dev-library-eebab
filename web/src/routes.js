import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import loginPage from './pages/login/index'

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={loginPage} />    
        </BrowserRouter>
    )
}

export default Routes