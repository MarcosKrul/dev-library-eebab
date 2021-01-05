
export function startFieldsAnimation(props) {
    document.querySelector('.'+props.outerClass).classList.add(props.classToAdd)
    const formError = document.querySelector('.'+props.classToAdd)
    if(formError) { 
        formError.addEventListener('animationend', (event) => {
            if(event.animationName === props.animation) 
                formError.classList.remove(props.classToAdd)
        })        
    } 
}

export function startFormAnimation(mess, opc='') {
    const classMessage = document.querySelector('.message-user'+opc)
    if(!classMessage){
        const message = document.createElement('div')
        message.textContent = mess
        message.classList.add('message-user'+opc)

        startFieldsAnimation({
            outerClass: 'form-block',
            classToAdd: 'validate-sucess'+opc,
            animation: 'responseAnimation'+opc
        })
        
        const classValidate = document.querySelector('.validate-sucess'+opc)
        classValidate.addEventListener('animationend', (event) => {
            if(event.animationName === 'responseAnimation'+opc)
                document.querySelector('form').prepend(message)
        })
    } else {
        const message = document.querySelector('.message-user'+opc)
        message.innerHTML = mess
    }
}

export default undefined