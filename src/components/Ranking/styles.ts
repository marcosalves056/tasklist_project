import styled from 'styled-components'

export const Container = styled.div`
        margin: 2rem 0 3rem 0;
        height: 31.1vw;
        min-height: fit-content;
        background-color: var(--color-white-primary);
        border-radius: 4px;
        border: 1px solid var(--color-grey-primary);
        box-shadow: 2px 0 8px 8px var(--color-grey-primary);
        padding-bottom: 3rem;
        @media (max-width: 1010px) {
            padding-bottom: 5rem;
            min-height: 50vh;
            height: 40vw;
                }
        h3{
            font-size: 1.5rem;
            font-weight: 600;
            margin: 0.5rem 0 3rem 0;
        }
        table{
            width: 95%;
            height: calc(65% + 11vh);
            max-height: 87%;
            background-color: var(--color-grey-secundary);
            margin: auto;
            border: 1px;
            border-style: solid;
            border-color: var(--color-grey-primary);
            //margin-top: 4.5rem;
            //border-radius: 4px;
            
            .fit{
                width: 10rem;
                @media (max-width: 768px) {
                    width: 5rem;
                }
            }
            #columnTitle{
                font-weight: 500;
            }
            td{
                font-size: 1.25rem;
                height: 2rem;
                progress{
                    appearance: none;
                    width: 75%;
                }
                progress[value]::-webkit-progress-bar{
                    border-radius: 4px;
                    background-color: var(--color-grey-secundary);
                }
                progress[value]::-webkit-progress-value{
                    height: 2rem;
                    border-radius: 5px;
                    background-color: var(--primary-color);
                }
            }
            #bold{
                font-weight: 600;
            }
        }
        .medal{
            height: 2rem;
            width: auto;
        }
    
`