import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    .inputFilter{
        display: flex;
        flex-direction: row;
        margin-bottom: 0.8rem;
        min-width: 9.5rem;
        width: 100%;
        padding:.15rem ;
        list-style: none ;
        padding: .375rem 0rem .375rem 0rem ;
        border-radius: 4px;
        border: 0.125rem solid var(--color-grey-primary);
        outline: none ;
        display: flex ;
        flex: 1;
        max-height: 2rem;
        max-width: 9.5rem;
        background-color: var(--color-white-primary);
        align-items:center;
        &:hover{
            border: 0.125rem solid var(--primary-color-hover);
        }

        &:focus{
            border: 0.125rem solid var(--primary-color-hover);
        }
        input {
            appearance: none;
            border: none;
            width: 80%;
            &:focus{
                outline:none;
            }
    
        }
    }


    .xButton{
        
        color: var(--primary-color);
        font-size: 1.2rem;
        font-weight: 400;
        cursor: pointer;
        &:hover{
            color: var(--color-grey-primary);

        }
    }
    
`
