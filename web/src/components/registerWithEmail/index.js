import React from 'react'

import './styles.css'

const RegisterWithEmail = (props) => {
    return (
        <div className="container-email">
            <div className="left-container-email">
                <button type="button" onClick={props.setState}>
                    Registrar-se com conta do Google
                </button>
            </div>
            <div className="right-container-email">
                {props.children}
            </div>
        </div>
    )
}

export default RegisterWithEmail