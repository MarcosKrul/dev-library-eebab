
function startFieldsAnimation(props) {
    document.querySelector('.'+props.outerClass).classList.add(props.classToAdd)
    const formError = document.querySelector('.'+props.classToAdd)
    if(formError) { 
        formError.addEventListener('animationend', (event) => {
            if(event.animationName === props.animation) 
                formError.classList.remove(props.classToAdd)
        })        
    } 
}

export default startFieldsAnimation