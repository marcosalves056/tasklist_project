import styled from 'styled-components';

export const Container = styled.div`
    #modal{
        max-width: fit-content !important;
    }
    #modalBody{
        display: flex;
        flex-direction: row !important;
        justify-content: space-around;
        @media (max-width:600px){
            max-width: 25rem;
            min-height: 70vh;
            overflow-x: auto;
            flex-direction: column !important;
            align-items: center !important;
        }
        div{
            display: flex;
            flex-direction: column;
            padding-left: 1rem;
            padding-right: 1rem;
            
            a{
                display: flex;
                flex-direction: column;
                cursor: pointer;
                label{
                    text-align: center;
                    &:hover{
                        color: var(--primary-color-hover);
                        cursor: pointer;
                    }
                }
                img{
                    align-self: center;
                    max-height: 3.75rem;
                    max-width: 3.75rem;
                    cursor: pointer;
                }
            }
            label{
                text-align: center;
            }
            img{
                align-self: center;
                max-height: 3.75rem;
                max-width: 3.75rem;
                cursor: pointer;
            }
            .focused{
                max-height: 46rem;
                max-width: 50rem;
                @media (max-width: 1600px) {
                    max-height: 35rem;
                    max-width: 35rem;
                }
                @media (max-width: 600px) {
                    max-height: 25rem;
                    max-width: 25rem;
                }
            }
        }
        .arrow{
            cursor: pointer;
            align-self: center;
            font-weight: 600;
            font-size: 2rem;
            &:hover{
                color: var(--primary-color-hover);
            }
        }
    }
`