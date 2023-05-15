import styled from 'styled-components';


export const Container = styled.input`
    list-style: none ;
    padding: .375rem .25rem .375rem .75rem ;
    border-radius: 4px;
    border: 0.125rem solid var(--color-grey-primary);
    outline: none ;
    display: flex ;
    flex: 1;
    max-height: 2rem;
    width: 100% ;
    font-size: 1rem;
    &:hover{
        border: 0.125rem solid var(--primary-color-hover);
    }
    &:focus{
        border: 0.125rem solid var(--primary-color-hover);
    }
`