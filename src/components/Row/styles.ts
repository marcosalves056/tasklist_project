import styled from 'styled-components';
interface ContainerRowProps{
    status: Number
    isChecked : Boolean
}

export const ContainerRow = styled.tr<ContainerRowProps>`
    overflow-x: hidden;
    flex: 1;
    flex-direction: row ;
    background-color: ${
        props => 
            props.isChecked ? 'var(--color-grey-primary)'
            : props.status == 2 ? 'var(--color-green-light-secundary)'
            : props.status == 3 ? 'var(--color-red-secundary)' 
            : 'var(--color-white-secundary)'
        } ;
    margin : .15rem;
    border-radius: 4px ;
    transition: all .1s;
    border-spacing: 1px solid var(--color-white-primary) ;
    margin-bottom: 2rem ;
    align-items: center ; 
    position: relative;
    cursor: pointer;
    :hover{
        transform: translateX(5px) ;
        box-shadow: 0px 0px 10px var(--primary-color);
    }
    
    td{
        min-height: 1rem;
        max-height: 9rem ;
    }

    #tdColor{
        flex: 1 ;
        background-color: ${props => props.status == 2 ? 'var(--color-green-light-primary)': props.status == 3 ? 'var(--color-red-primary)' :'var(--color-grey-primary)'} ;
        background-color: ${props => props.isChecked ? 'var(--color-grey-primary)':''};
        border-radius: 4px 0 0 4px ;
        div{
            width: 6px ;
            max-width: 6px !important;
            display: flex ;
            flex: 1 ;
            height: 100% ;
        }
    }

    #tdId{
        color: var(--text-blue-primary);
        min-width: 5.5rem;
        max-width: 5.5rem;
        text-align: center;
    }

    #tdStatus{
        font-weight: bold ;
        color: ${props => props.status == 2 ? 'var(--color-green-dark-primary)':'var(--text-blue-primary)'} ;
        text-align: center;
        min-width: 7.2rem;
    }

    #tdTasklist{
        text-align: center;
        color: var(--text-blue-primary);
        width: 10rem;
        max-height: 8rem;
    }

    #tdLocation{
        text-align: center;
        color: var(--text-blue-primary);
        min-width: 10rem;
        max-width: 10rem;
        max-height: 8rem;
        padding-right: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    #tdDescription{
        text-align: justify;
        min-width: 25rem;
        max-width: 25rem;
        overflow: hidden;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        padding-right: 0.5rem;
        color: var(--text-blue-primary);
        line-break: strict;
        display: -webkit-box;
        -webkit-line-clamp: 7;
        -webkit-box-orient: vertical; 
        -webkit-box-pack: center;
    }
    #tdArchive{
        color: var(--text-blue-primary);
        flex-direction: row;
        min-width: 6.2rem;
        align-items: center;
        span {
            display: flex ;
            flex: 1;
            width: 3.75rem ;
            max-width: 100%;
            border-radius: 4px ;
            justify-content: center ;
            align-items: center ;
            text-align: center ;
            margin: .15rem ;
            color: var(--color-grey-secundary);
            margin-right: .5rem;
            :hover{
                transform: scale(1.5) ;
            }
        }
        #preview{
            height: fit-content !important;
            img{
                max-width: 3.75rem ;
                max-height: 3.75rem ;
            }
            label{
                display: flex;
                flex-direction: column;
                height: 1.35rem;
                width: 1.35rem;
                position: relative;
                bottom: 1rem;
                left: 3rem;
                background-color: var(--primary-color);
                color: var(--color-white-primary);
                border-radius: 50%;
                text-align: center;
                justify-content: center;

            }
        }
    }
    #tdDateOpened{
        max-width: 100%;
        min-width: 8.2rem;
        margin-right: 2rem;
        align-content: center ;
        color: var(--text-blue-primary);
    }
    #tdOwner{
        max-width: 100%;
        min-width: 10.5rem;
        color: var(--text-blue-primary);
    }
    #tdDueDates {
        max-width: 100%;
        min-width: 8.3875rem;

        div{
            display: flex ;
            flex: 1 ;
            flex-direction: column ;
            color: var(--text-blue-primary);
            margin-right: .25rem  ;
            span{
                margin-bottom: .25rem ;
                text-decoration: line-through;
            }
            span:last-child{
                text-decoration: none ;
            }
        }
    }
    #tdAssignedTo{
        flex: 1;
        flex-direction: column;
        height: 100%;
        min-width: 10rem;
        font-size: 1rem ;
        color: var(--text-blue-primary);
        max-height: 100%;

        span {
            display: flex;
            height: 100%;
            align-items: center;
            img{
            color: var(--color-blue-primary);
            margin-right: .25rem  ;
            }
        }
    }
    #tdComments{
        max-width: calc(100vw - 85.5rem);
        min-width: 26.5rem;
        display: flex;
        flex-direction: column;
        align-content: center ;
        #Comments{
            display: flex;
            flex-direction: column;
            max-height: 7.3rem;
            overflow: hidden;
        }
        #endIndicator{
            display: flex;
            width: 100%;
            text-align: center;
            justify-content: center;
        }
        div{
            display: -webkit-box;
            max-width: 100%;
            width: 100%;
            height:  100%;
            max-height: 100vh;
            flex-direction: column;
            border-bottom: 1px solid var(--color-grey-primary) ;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical; 
            -webkit-box-pack: center;
            overflow: hidden;
            
            span{
                margin-bottom: .25rem ;
            }
            h6{
                color: var(--text-blue-primary);
                font-size: .65rem ;
                font-weight: bold;
                text-align: end;
            }
        }
    }
    ::-webkit-scrollbar{
        height: 0.3125rem;
        justify-content: center;
        align-items: center;
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

    .userIcon{
        height: 1rem;
        width: auto
    }
`