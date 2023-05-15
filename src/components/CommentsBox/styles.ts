import styled from 'styled-components'

export const Container = styled.div`
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: baseline;
        text-align: left;
        background-color: var(--color-grey-primary);
        font-size: 0.875rem;
        padding: 0.25rem;
        border-radius: 4px;
        margin-bottom: .25rem ;
        list-style-type: none;
        border: none;
        
        

        #divComments{
            display: flex;
            flex: 1;
            flex-direction: column ;
        }

        div{
            display: flex ;
            flex: 1;
            width: 100% ;
            min-height: 3rem ;
            align-items: center ;

            div{
                display: flex ;
                flex: 1;
                width: 100% ;

                textarea{
                    display: flex ;
                    flex: 1;
                    flex-direction: row ;
                    padding: .25rem .25rem .25rem .5rem;
                    border-radius: 4px ;
                    border: 2px solid var(--color-grey-primary);
                    text-align: left ;
                    align-items: center ;
                    background-color: var(--color-white-primary)!important;

                    &:focus{
                        border: 2px solid var(--primary-color)!important;
                    }

                    &:hover{
                        border: 2px solid var(--primary-color)!important;
                    }

                }

            }

            img{
                height: 18px ;
                width: 24px;
                cursor: pointer;

                &:hover{
                    transform: scale(1.25) ;
                }
            }
        }

`

