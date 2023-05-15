import styled from 'styled-components'

export const Container = styled.div`
    overflow-y: scroll ;
    //min-height: 100vh;
    height: 100vh;
    margin-bottom: 3rem;


    ::-webkit-scrollbar{
            height: 4px;
            justify-content: center;
            align-items: center;
            padding: none;
            margin: none;
            border-radius: 4px;
            max-width: 4px;
        }

        ::-webkit-scrollbar-track{
            background-color: var(--color-grey-secundary);
            height: 4px;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb{
            background-color: var(--primary-color);
            border-radius: 4px;
        }

    h2{
        margin-top: .5rem ;
        margin-left: 1rem ;
        color : var(--text-blue-primary)
    }

    div{
        align-items: center ;
        justify-content: center ;
        text-align:  center;

        #divGraphicBottom{
            padding: 0 1rem ;
            display: grid ;
            grid-template-columns: 1fr 1fr;

            #apexchartsbar{
                /*width: 100% !important*/
            }

            @media(max-width: 1010px){
                
                grid-template-columns: 1fr ;

            }

        }

        @media (max-width: 1010px){
            grid-template-columns: auto;
            max-height: 89vh;
            //overflow-y:none ;
        }

        ::-webkit-scrollbar{
            height: 4px;
            justify-content: center;
            align-items: center;
            padding: none;
            margin: none;
            border-radius: 4px;
            max-width: 4px;
        }

        ::-webkit-scrollbar-track{
            background-color: var(--color-grey-secundary);
            height: 4px;
            border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb{
            background-color: var(--primary-color);
            border-radius: 4px;
        }

    }
    #ranking{
        margin: 2rem 0 3rem 0;
        height: 37.25rem;
        background-color: var(--color-white-primary);
        border-radius: 4px;
        border: 1px solid var(--color-grey-primary);
        box-shadow: 2px 0 8px 8px var(--color-grey-primary);
        h3{
            font-size: 1.5rem;
            font-weight: 600;
            margin: 1.5rem 0 1rem 0;
        }
        table{
            width: 95%;
            height: 85%;
            background-color: var(--color-grey-secundary);
            margin: auto;
            border-style: inset;
            border-color: var(--color-grey-primary);
            border-radius: 4px;
            .fit{
                width: 10rem;
                @media (max-width: 700px) {
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
        
    }
    
`