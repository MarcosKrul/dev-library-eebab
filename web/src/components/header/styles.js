import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
    color: white;
    font: 400 1.6rem Poppins;
    background-color: #141b2d;
    border-bottom: 1px solid #1f2940;
    
    button {
        margin: 0;
        padding: 0;
        height: 80%;
        color: white;
        background-color: #141b2d;
    }

    button:hover { color: #ccc; }
`

export const Ul = styled.ul`
    display: flex;
    list-style: none;
    align-items: center;
    justify-content: flex-end;
`

export const Li = styled.li`
    padding-top: 25px;
    padding-left: 10px;
    padding-right: 30px;
`