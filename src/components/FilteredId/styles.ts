import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: row-reverse;
    height: 2rem;
    width: fit-content;
    color: var(--text-white-primary);
    position: fixed;
    z-index: 3;
    justify-content: space-evenly;
    top:  95%;
    left: calc(100vw - 10.5rem);


    label{
        width: 10rem;
        min-height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        left: -10rem;
        white-space: nowrap;
        text-align: center;
        font-size: 1rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        p{
            cursor: pointer;
            text-decoration: underline;
            &:hover{
                color: var(--text-blue-secundary);
            }
        }
    }
    
    progress{
        min-height: 100%;
        width: 10rem;
        appearance: none;
        border-radius: 8px;
    }
    progress[value]::-webkit-progress-bar{
        border-radius: 8px;
        background-color: var(--color-grey-tertiary);
    }
    progress[value]::-webkit-progress-value{
        border-radius: 8px;
        background-color: var(--primary-color);
    }
    progress[value]::-moz-progress-bar{
        padding: 0;
        margin: 0;
        border: 0;
        background-color: var(--primary-color);

    }
`