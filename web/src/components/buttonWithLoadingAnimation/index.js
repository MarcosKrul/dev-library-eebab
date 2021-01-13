import React from 'react'

import './styles.css'

const ButtonWithLoadingAnimation = ({activeLoading, ...rest}) => {
    return (
        <button {...rest}>
            <div className="button-content-text">
                Enviar
            </div>
            {activeLoading? (<div className="loading-container"/>) : null}
        </button>
    )
}

export default ButtonWithLoadingAnimation