import styled from 'styled-components';

export const Container = styled.div`
        display: flex ;
        flex: 1;
        flex-direction: column ;
        width: 100% ;
        #divAssignedTo, #divDueDate{
            .icons{
                height: 20pt;
                width: 20pt;
                &:hover{
                    color: var(--color-green-light-primary);
                }
            }
        }
        #divLocation{
            display: flex ;
            flex-direction: row;
            align-items: baseline;
            justify-content:  flex-start;
            label{
                margin-right: .5rem ;
                font-weight: bold ;
                font-size: 1rem ;
            }
            input{
                max-width: 7rem ;
            }
        }
        #divDescription{
            display: flex ;
            flex: 1;
            flex-direction: column ;
            align-items: baseline;
            justify-content:  flex-start;
            margin-top: .5rem;
            label{
                margin-bottom: .25rem;
                font-weight: bold ;
                font-size: 1rem ;
            }
        }
        #divMultiTask{
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
        #divAttachment{
            display: flex ;
            flex: 1;
            flex-direction: column ;
            align-items: baseline;
            justify-content:  flex-start;
            margin-top: .5rem;
            label{
                font-weight: bold ;
                font-size: 1rem ;
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
                        background-color: var(--primary-color);
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
                            background-color: var(--text-white-primary);
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
                font-size: 1rem ;
            }
            div{
                label{
                    font-weight: 400;
                    font-size: .8rem ;
                }
            }
            svg{
                color: var(--color-green-dark-primary);
                width: 0.94rem;
            }
        }
        #divDueDate{
            display: flex;
            flex: 1;
            flex-direction: row;
            align-items: center ;
            margin-bottom: .25rem;
            label{
                font-weight: bold ;
                margin-right: .25rem ;
                font-weight: bold ;
                font-size: 1rem ;
            }
            span{
                margin-right: .25rem ;
                font-size: .8rem ;
            }
            svg{
                color: var(--color-green-dark-primary); ;
                margin-right: .25rem ;
                width: 0.9375rem;
            }
        }
        #divComments{
            display: flex;
            flex: 1;
            flex-direction: column;
            label{
                margin-bottom: .25rem;
                font-weight: bold ;
                font-size: 1rem ;
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