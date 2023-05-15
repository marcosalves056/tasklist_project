import styled from 'styled-components';

export const Container = styled.textarea`
    list-style: none ;
    padding: .375rem .25rem .375rem .75rem ;
    border-radius: .25rem;
    border: 0.125rem solid var(--color-grey-primary);
    outline: none ;
    display: flex ;
    flex: 1;
    width: 100%;
    min-height: 7rem;
    left: 1.25rem;
    top: 9.5rem;
    resize: none;
    &:hover{
        border: 0.125rem solid var(--primary-color-hover);
    }
    &:focus{
        border: 0.125rem solid var(--primary-color-hover);
    }
    ::-webkit-scrollbar{
        width: 0.3125rem;
        justify-content: center;
        align-items: center;
        padding: none;
        margin: none;
        border-radius: .25rem;
    }
    ::-webkit-scrollbar-track{
        background-color: var(--color-grey-secundary);
        width: 0.4375rem;
        border-radius: .25rem;
    }
    ::-webkit-scrollbar-thumb{
        background-color: var(--primary-color);
        border-radius: 2.5px;
    }
`
