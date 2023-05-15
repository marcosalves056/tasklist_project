import styled from 'styled-components';


export const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    width: 100%;
    #newAttachments{
        display: flex;
        flex-direction: row;
        max-width: 100%;
        min-height: 7.5rem;
        overflow-y: hidden;
        overflow-x: scroll;
        div{
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            min-height: 7.5rem;
        }
        img{
            max-height: 3.75rem;
            max-width: 3.75rem;
        }
        label{
            font-size: 0.75rem;
            padding-top: 0.25rem;
        }
        a{
            height: 1rem;
            width: 2rem;
            display: flex;
            justify-content: center;
            padding-top: 0.08rem;
            position: relative;
            font-size: 0.75rem;
            cursor: pointer;
            color: var(--color-white-primary);
            font-weight: 600;
            bottom: 5.15rem;
            left: 1.75rem;
            background-color: var(--color-green-dark-primary);
            border-radius: 35%;
        }
    }
    #existentAttachments{
        display: flex;
        flex-direction: row;
        max-width: 100%;
        min-height: 7.5rem;
        overflow-y: hidden;
        overflow-x: scroll;
        div{
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            min-height: 7.5rem;
        }
        img{
            max-height: 3.75rem;
            max-width: 3.75rem;
        }
        label{
            font-size: 0.75rem;
            padding-top: 0.25rem;
        }
        a{
            height: 1rem;
            width: 1rem;
            display: flex;
            justify-content: center;
            padding-top: 0.08rem;
            position: relative;
            font-size: 0.75rem;
            cursor: pointer;
            color: var(--color-white-primary);
            font-weight: 600;
            bottom: 5.15rem;
            left: 1.75rem;
            background-color: var(--color-red-primary);
            border-radius: 50%;
        }
    }
    div{
        display: flex;
        flex: 1;
        flex-direction: row;
        align-items: center; 
        margin-bottom: .25rem;
        label{
            font-weight: bold ; 
            margin-right: .25rem ;
        }
        input{
            display: inline-block;
            color: var(--text-black-primary);
            outline: none;
            cursor: pointer;
            ::-webkit-file-upload-button {
                background: var(--primary-color);
                border-radius: 4px;
                border: 0.125rem solid var(--primary-color);
                color: var(--text-white-primary);
                cursor: pointer;
            }
        }
    }

    span{
        display: flex ;
        flex: 1 ;
        flex-direction: column ;
        align-items: left;
        justify-content: left;
        width: 100%;
        min-height: 112px;
        border-radius: 4px ;
        border: 0.125rem solid var(--color-grey-primary);
        p{
            margin: .25rem  ;
        }
        div{
            display: baseline ;
            flex: 1 ;
            flex-direction: column ;
            align-items: baseline ;
            margin-left:.5rem ;
            div{
                flex-direction: row ;
                align-items: center ;
                img{
                    flex-direction: row ;
                    max-width: 5rem ;
                    max-height: 5rem ;
                }
            }
        }
    }
`