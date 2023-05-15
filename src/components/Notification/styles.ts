import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    min-height: fit-content;
    width: 100% ;
    border-radius: 4px;
    margin-bottom: 0.5rem;
    background-color: var(--color-grey-secundary);
    cursor: pointer;
    #notificationText{
        cursor: text;
        #userName{
            margin-right: 10px;
            color: var(--text-blue-primary);
            padding-right: 0.60rem;
        }
        span{
            margin-left: 8px;
        }
    }
    h4{
        width: fit-content;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--text-blue-primary);
        font-weight: 400;
        white-space: nowrap ;
        @media (max-width: 600px) {
            max-width: 7rem;
        }
        &:hover{
            color: var(--text-blue-secundary);
        }

        img{
            padding-right: 0.25rem;
            max-height: 0.875rem;
        }
    
    }

    span{
        display: flex;
        align-items: center;
        max-width:15rem;
        width: max-content;

        img{
            padding-right: 0.25rem;
        }
    }
    #colorIndicator{
            min-height: 100%;
            min-width: 0.375rem;
            margin: 0;
            padding: 0;
            background-color: var(--color-black-secundary);
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
        }
    #content{

        display: flex;
        flex-direction: column;
        width: 99%;
        border-radius: 4px;
        padding: 0.5rem;
        font-size: 0.875rem;
        justify-content: space-around;

        div{
            display: flex;
            flex-direction: row;
        }

        #notificationLocation{
            padding-top: 0.35rem;
            align-items: center ;
            justify-content: space-between;
           

            #spanLinks{

                display: block;
                #a_tasklist{
                    &:hover{
                        color: var(--text-blue-alternative);
                    }
                    h4{
                        margin: 0;
                        // width: 10rem;
                        margin-right: 0.5rem;
                    }

                }
                
                #a_taskModal{
                    color: var(--text-blue-secundary) ;
                    span{
                        p{  
                            margin-top: 3px;
                            // max-width: 9.75rem;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            @media (max-width:600px) {
                                max-width: 6rem;
                            }
                        }
                    }

                    &:hover{
                        color: var(--text-blue-alternative);
                    }

                }
                
            }

            #span_date{
                color: var(--text-grey-primary) ;
                font-size: .8rem ;
                cursor: text;
            }

        }

    }

    

    //#tasklistName{
    //    padding-right: 0.75rem;
    //    white-space: nowrap;
    //}
//
    //#taskId{
    //    color: var(--text-blue-secundary);
    //    display: flex ;
    //}

`