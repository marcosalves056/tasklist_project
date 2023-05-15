import styled from 'styled-components';

export const Container = styled.section`
    width: 100%;
    height: 80vh;
    background-color: var(--color-white-primary);
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    margin: auto;
    align-items: flex-end ;

    #errorMessage{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: center;
        text-align: center;
    }
    
    #divFormBottom{
        justify-content: center;
        width: 100%;

        #RememberMeGroup{
            display: flex;
            flex-direction: row;
            margin-bottom: .25rem ;
            justify-content: center;
            cursor: pointer;

            input{
                cursor: pointer;
                margin-right:  .25rem;
            }
        }

        hr{
            margin-left: auto;
            margin-right: auto;
            
        }

        #forgotPasswordLink{
            margin-top: .25rem ;

            a{
                color: var(--text-blue-primary);
                margin-right: .25rem ;
                cursor: pointer;

            
                :hover{
                    color:var(--text-blue-alternative)

                }
            }
        }
    }

    #divSpinLoading{

        div{
            display: block ;
        }

        h4{
            margin-top: .5rem;
            color: var(--text-grey-primary)
        }
    }

    #formPosition{
        display: flex ;
        flex-direction: column ;
        text-align: center;
        margin: 5rem auto;
        min-width: 20rem ;

        h1{
            font-size: 2.19rem;
            font-weight: 400;
            color: var(--text-blue-alternative);
            margin-bottom: 1rem;

            @media (max-width: 476px){
                font-size: 3.5rem;
            }
        }

        #spanQuestion{
            margin-bottom: .25rem ;
        }

        #emailGroup{
            display: flex;
            flex-direction: column;
            height: auto;
            align-items: flex-end;
            
            input{
                //position: absolute;
                //max-width: 18.7rem;
                color: var(--text-grey-primary);
            }

            #emailButton{
                position: relative;
                top: -1.75rem;
                right: 0.25rem;
                
                img{
                    height: 1.5rem;
                    cursor: pointer;
                }

            }
        }
        
        #passwordGroup{
            position: relative;
            display: flex;
            flex-direction: column;
            height: auto;
            align-items: flex-end;
            top: .5rem;


            input{
                //position: absolute;
                //max-width: 18.7rem;
                color: var(--text-grey-primary);
            }

            #passwordButton{
                position: relative;
                top: -1.75rem;
                right: 0.25rem;
                
                img{
                    height: 1.5rem;
                    cursor: pointer;
                }
            }
        }

        #passwordConfirmationGroup{
            display: flex;
            flex-direction: column;
            height: 5rem;
            justify-content: space-between;

        }

        @media (max-width: 476px){
            flex: 1 ;
            padding: 0 3rem ;
            width: 100vw;
            margin: 6rem 0rem 0rem 0rem ;
        }

    }
    #tooltip{
            img{
                max-height: 1rem;
            }
            span{
                display: flex;
                font-size: 0.65rem;
                background-color: var(--color-grey-secundary);
                width: 10rem;
                position: fixed;
                text-align: left;
                padding: .4rem;
                border-radius: 4px;
                border: 2px solid var(--color-black-primary);
                }
            
        }
    
    .PortalOption{
        border-style: solid;
        border-color: var(--primary-color);
        border-radius: 4px;
        font-size: 1rem;
        background-color: var(--primary-color);
        color: var(--color-white-primary);
        margin: 0.5rem;
        &:hover{
            background-color: var(--primary-color-hover);
        }
    }
`
