import React from 'react'

import './styles.css'

const RegisterWithGoogle = (props) => {
    return (
        <div className="container-google">
            <div className="left-container-google">
                {props.children}
            </div>
            <div className="right-container-google">
                <button type="button" onClick={props.setState}>
                    Registrar-se com email
                </button>
            </div>
        </div>
    )
}

export default RegisterWithGoogle