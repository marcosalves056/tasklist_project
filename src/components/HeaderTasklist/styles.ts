import styled from 'styled-components';

export const Container = styled.header`
    background-color: var(--text-blue-secundary) ;
    width: 100%;
    height: 2.375rem;
    display: flex;
    flex-direction: row ;
    justify-content: flex-start;
    align-items:center ;
    overflow: hidden;
    padding: 0;
    div{
        display: flex;
        flex-direction: row ;
        justify-content: flex-start;
        align-items:center ;
    }
    @media (max-width: 270px){
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        scroll-behavior: none;
        ::-webkit-scrollbar{
            height: 0.3125rem;
            justify-content: center;
            align-items: center;
            padding: none;
            margin: none;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-track{
            background-color: var(--color-grey-secundary);
            height: 0.4375rem;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb{
            background-color: var(--primary-color);
            border-radius: 4px;
        }
    }
    
`