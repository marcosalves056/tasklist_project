import styled from 'styled-components';

export const ContainerHeaderModal = styled.div`
    display:flex ;
    flex: 1 ;
    flex-direction: row ;
    align-items: initial ;
    strong{
        font-size: .8rem ;
        margin-right: .25rem ;
    }
    p{
        font-size: .8rem ;
        margin-right: .25rem ;
    }
`

export const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column ;
    position: relative;
    width: 100% ;
    margin: auto;
    max-height: 60rem;
    overflow-y: scroll;
    overflow-x: hidden;
    .buttonPlus .icons{
        color: var(--color-green-dark-primary);
        font-size: 20pt;
        &:hover{
            color: var(--color-green-light-primary);
        }
    }
    @media (max-width: 992px){
        max-height: 40rem;
    }
    @media (max-width: 600px){
        max-height: 35rem;
    }
    label{
        font-size: .9rem;
        margin: 0.25rem 0 0.25rem 0;
    }
    #divStatusLocation{
        display: flex ;
        flex: 1 ;
        flex-direction: row ;
        margin-bottom: .25rem;
        align-items: center ;
        label{
            margin: 0 .25rem 0 0 ;
            font-weight: bold;
        }
        input{
            max-width: 10rem ;
        }
    }

    #divDescription{
        display: flex;
        flex: 1;
        flex-direction:  column;
        margin-bottom: .25rem;
        label{
            font-weight: bold ;
        }
    }
    

    #divAttachment{
        display: flex;
        flex: 1 ;
        flex-direction: column ;
        
    }

    #divAssignedTo{
        display: flex;
        flex: 1;
        flex-direction: row;
        align-items: center;
        justify-content:  flex-start;
        margin-bottom: .5rem;
        margin-top: .5rem ;
        #spanSelect{
            margin-left: 0.2rem;
            border-radius: 4px;
            div{
                border-color: var(--primary-color);
                border-radius: 4px;
                div{
                    color:  var(--text-blue-primary);
                }
                span{
                    background-color: var(--text-blue-primary);
                }
                svg{
                    color:  var(--text-blue-primary);
                }
            }
            &:hover{
                div{
                    border-color: var(--primary-color);
                    background-color: var(--primary-color);
                    color:  var(--text-white-primary);
                    border-radius: 4px;
                    cursor:pointer;
                    div{
                        color:  var(--text-white-primary);
                    }
                    span{
                        background-color: var(--color-white-primary);
                    }
                    svg{
                        color:  var(--text-white-primary);
                    }
                }
            }
        }
        label{
            margin-right: .5rem ;
            font-weight: bold ;
        }
        div{
            label{
                font-weight: 400;
            }
        }
    }

    #divNotification{
        display: flex;
        flex: 1;
        flex-direction:  row;
        align-items: center;
        margin-bottom: .25rem;
        label{
            font-weight: bold ;
            margin-right: .25rem ;
        }
        
    }
    #divDueDate{
        display: flex;
        flex: 1;
        flex-direction: row;
        align-items: center ;
        margin-bottom: .25rem;
        label{
            font-weight: bold;
            margin-right: .25rem ;
        }
        span{
            margin-right: .25rem ;
            font-size: .9rem ;
        }

    }
    #divInteractions{
        display: flex;
        flex: 1;
        flex-direction:  row;
        align-items: center;
        margin-bottom: .25rem;
        label{
            font-weight: bold ;
            margin-right: .25rem ;

        }
    }
    #divComments{
        display: flex;
        flex: 1;
        flex-direction: column;
        div{
            display: flex ;
            flex: 1 ;
            width: 100% ;
        }
    }
    #divHistory{
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: left;
        text-align: center;
        justify-content: center;
        background-color: var(--primary-color);
        min-height: 5rem;
        height: fit-content;
        max-height: 10rem;
        cursor: pointer;
        border-radius: 4px;
        border: none;
        color: var(--text-white-primary);
        margin-top: 0.25rem;
        padding: .25rem .25rem 0 .25rem ;
        max-height: 10rem;
        label {
            padding-left: 0;
            font-size: 1rem ;
            height: 100%;
            width: 100%;
            div{
                padding: 0 ;
                margin: 0 auto ;
                height: 1.5rem ;
                width: 1.5rem ;
            }
        }
    }
    .tooltip{
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
`