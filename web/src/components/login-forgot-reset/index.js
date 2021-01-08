import React from 'react'

import BaseComponent from '../auth-pages/index'

import './styles.css'


const PageComponent = (props) => {
    return (
        <BaseComponent>
            <div className="container-content-left">
                <div className="top-content">
                    <h1>
                        {props.leftTitle}
                    </h1>
                </div>
                <div className="bottom-content"></div>
            </div>
            <div className="container-content-right">
                <div className="left-content">
                    {props.rightTitle}
                    {props.children}
                </div>
                <div className="right-content" />
            </div>
        </BaseComponent>
    )
}

export default PageComponent