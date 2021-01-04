import React from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import { isAuthenticated } from './services/auth'

import MainPage from './pages/main/index'
import LoginPage from './pages/login/index'
import ResetPasswordPage from './pages/resetPassword/index'
import ForgotPasswordPage from './pages/forgotPassword/index'


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => 
            isAuthenticated() ?
            (<Component {...props}/>) :
            (<Redirect to={{
                pathname: '/',
                state: {from: props.location}
            }}/>)
        }
    />
)

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LoginPage} />    
                <PrivateRoute path="/main" component={MainPage} />
                <Route path="/forgot/password/page" component={ForgotPasswordPage} />
                <Route path="/reset/password/page" component={ResetPasswordPage} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes