import React, {useEffect} from 'react'

import './styles.css'


const PageComponent = (props) => {

    useEffect(() => {

        const ulCircles = document.querySelector('ul.circles')
        for(let i=0 ; i<12 ; i++) {
            const li = document.createElement('li')
            
            const random = (min, max) => Math.floor(Math.random() * (max - min) + min)
            const size = random(10, 120)
            const delay = random(5, 0.1)
            const position = random(1, 99)
            const duration = random(24, 12)

            li.style.width = `${size}px`
            li.style.height = `${size}px`
            li.style.bottom = `-${size}px`
            li.style.left = `${position}%`
            li.style.animationDelay = `${delay}s`
            li.style.animationDuration = `${duration}s`
            li.style.animationTimingFunction = `cubic-bezier(
                ${Math.random()}, 
                ${Math.random()}, 
                ${Math.random()}, 
                ${Math.random()}
            )`
            
            ulCircles.appendChild(li)
        }

    }, [])

    return (
        <div className="container-image">
            <ul className="circles" />
            <div className="container-content">
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
            </div>
        </div>
    )
}

export default PageComponent