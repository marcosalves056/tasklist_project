import styled from 'styled-components';

interface ContainerProps {
    filterVisibility: boolean;
}

export const Container = styled.main<ContainerProps>`
    display: block;
    z-index: 0;
    position: fixed;
    left: 5px;
    top: 90px;
    overflow-x: auto;
    overflow-y: auto;
    height:calc(99% - 90px);
    color: var(--text-blue-primary);
    margin:0;
    width: 99.7%;
    transition: all .5s;
    &.sidebarOn{
        width: 74.5%;
    }
    

    @media (max-width: 500px){
        top: 70px;
    }

    ::-webkit-scrollbar{
        height: 0.3125rem;
        width: 0.3125rem;
        justify-content: center;
        align-items: center;
        padding: none;
        margin: none;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-track{
        background-color: var(--color-grey-secundary);
        height: 0.4375rem;
        width: 0.4375rem;
        border-radius: 4px;
        margin-top: 2.8rem;
    }

    ::-webkit-scrollbar-thumb{
        background-color: var(--primary-color);
        border-radius: 4px;
    }
    #spin{
        width: 100vw;
        justify-content: center;
        margin-bottom: 3rem;
        img{
            min-width: 3rem;
        }
    }
    table {
        margin: auto 0;
        min-width: 100%;
        border-spacing: 0 .25rem;
        transition: all .5;
        .disableScroll{
            width: 99.5%;
            overflow: hidden;
            
        }

        .enableScroll{
            width:100vw;
            overflow-x:scroll;
            overflow-y:hidden;
            transition: all .5;
        }
        .sidebarOn{
                width: 74.5%;
            }
        #Location{
            margin:0;
            padding: -35px;
        }
        #TaskFilterHeaderThead {
            align-items: center;
            /* min-height: 2rem; */
            margin: 0;
            padding: 1px;
            max-height: max-content;
            background-color: var(--text-blue-secundary);
            color: var(--text-white-primary);
            border-radius: 4px;
            top: 4.7rem;
            display: flexbox;
            position: fixed;
            left:0;
            z-index: 2;
            ::-webkit-scrollbar{
                visibility: hidden;
            }

            ::-webkit-scrollbar-track{
                visibility: hidden;
            }

            ::-webkit-scrollbar-thumb{
                visibility: hidden;
            }
            /* input{
                margin: 0;
                padding: 0;
            } */
                #Id {
                    padding-left: calc(0.25% + 6px + 1rem);
                    min-width:5.9rem;   
                }

                #CheckBox{
                    padding-left: 0.2rem;
                    padding-right: 1.8rem;
                    min-width: 1.5rem;
        
                }

                #Status {
                    min-width: 7.2rem;
                }
                #Tasklist {
                    min-width: 100%;
                    width: 7.1875rem;
                    padding-left: 1rem;
                    padding-right: 0.5rem;
                }
                #Location {
                    padding: 0 3.1rem 0 1.7rem;
                }

                #Description {
                    min-width: 25rem;

                }

                #Attachments {
                    

                    p {
                        min-width: 6.2rem;
                        text-align: start;
                        font-weight: 600;
                        font-size: 1rem;
                    }

                }

                #DateOpened {
                    max-width: 100%;
                    min-width: 8.2rem;
                    padding-right: 2.2rem;
                }

                #Owner {
                    padding-left: 0.5rem;
                    min-width: 10rem;
                }

                #DueDate {
                    padding-left: 0.5rem;
                    min-width: 9.1875rem;

                }

                #AssignedTo {
                    min-width: 10rem;
                }

                #Comments {
                    min-width: 25rem;
                    max-width: 100%;
                }

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

        #HeaderOptionsUser{
            flex-direction: row;
            margin: .25rem;
            padding: .15rem ;
            padding-left: .25rem ;
            align-items: center;
            background-color: var(--color-grey-secundary);
            border-radius: 4px ;
            overflow-x: scroll;
            overflow-y: hidden;
            //position: fixed;

            #HeaderOptionsUserGroup{
                display: flex;

                h4{
                    color: var(--text-blue-primary);
                    padding-right: .5rem ;

                    span{
                        font-size: 1.5rem ;
                        font-weight: bold ;
                        padding-right: .25rem;
                    }

                }
            }

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
        tbody{
            position: relative;
            top: ${props => props.filterVisibility == false? '1rem': '55px'};
        }
        #column{
            display : table-row-group;
            position: relative;
            min-width: 100%;
            width: fit-content;
            overflow-y: scroll;
            overflow-x: hidden;
            text-overflow: ellipsis;

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

    #divLoadingSpin{
        display: flex ;
        flex: 1  ;
        align-items: center ;
        justify-content: center ;
    }

    .tdOptions{
        padding-bottom: 1.5rem;
        div{
            margin-top: 0rem;
        }
    }
`