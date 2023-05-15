import styled from 'styled-components';

export const Container = styled.div`

    display: flex ;
    flex: 1;
    flex-direction: column;
    align-items: left ;
    justify-content: left ;
    text-align: left ;
    min-height: 5rem;
    height: fit-content;
    max-height: 10rem;
    overflow-y: scroll ;
    cursor: text;
    header{
        margin-bottom: 0.25rem ;
        cursor: pointer;
    }
    
    div{        
        display: flex ;
        flex: 1 ;
        flex-direction: row ;
        background-color: var(--text-blue-secundary) ;
        border-radius: 4px ;
        padding: .25rem ;
        margin-bottom: .25rem ;
        margin-right: 5px;
        min-height: 2rem;

        p{
            flex: 1 ;
            flex-direction: row ;
            padding: 0 .25rem ;
            font-size: .85rem;
            flex-wrap: nowrap;
            max-width: 100vw;
            span{
                font-weight: bold ;
                max-width: 100%;
            }
        }
        small{
            display: flex ;
            font-size: .6875rem;
            align-content: flex-end;
            align-items: flex-end;
            max-width: 100%;
        }
    }
`