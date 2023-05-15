import styled from 'styled-components'


export const Container = styled.div`
    background-color: var(--color-white-primary);
    max-height: 100%;
    
    .divHistoryLogs{
        display: flex ;
        flex: 1 ;
        flex-direction: column ;
        margin-bottom: 0.5rem;
        background-color: var(--color-grey-secundary);
        border-radius: 4px;
        padding: 0.5rem;
        
        .divHistoryLog{
            color: var(--text-blue-primary);
            font-size: 0.875rem;
            
            span{
                margin-left: .25rem ;
                color: var(--text-black-primary);
                padding-right: 0.25rem;
            }
            
        }
        
        .divLinkToModal{
            display: flex ;
            flex: 1;
            flex-direction: row ;
            padding-top: 0.35rem;
            padding-left: 0.5rem;
            align-items: center ;
            justify-content: space-between;
            a{
                display: flex;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width:70%;
                cursor: pointer;
                span{
                    margin-left: 0.5rem;
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    &:hover{
                        color: var(--text-blue-secundary);
                    }
                }

            }
            small{
                font-size: .6875rem;
            }
        }
        @media (max-width: 500px){
            max-width: 100%;
        }
        

    }
`