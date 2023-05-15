import styled from 'styled-components'

export const Container= styled.div`
    position: absolute;
    z-index: 1;
    right: -25%;
    display: flex;
    flex-direction:row;
    justify-content: right;
    width: 25%;
    height: 100%;
    transition: all .8s;

    &.isOpen{
        right:0;
        display: flex;
    }

    @media (max-width: 720px){
        display: none;
        width: 100%;
        #contentSidebar{
            width: 100%;
        }
    }
    `
export const SideBar= styled.div`
    border-left: solid 5px var(--color-grey-primary);
    margin: 0;
    background-color: var(--color-white-primary);
    width: 100%;
    height: calc(100%-38px);

    

    @media (max-width: 720px){
        width: 100%;
        border-left: none;
        #contentSidebar{
            width: 100%;
        }
    }

    #buttonCloseRightSidebar{
        text-align: right;
    }
    
    nav{    
        display: flex;
        text-align: center;
        .headerSideBar{
            justify-content: space-between;
            align-items: center;
            text-align:center;
            padding: 1.1rem;
            display: block;
            border: solid 1px #f4f4f4;
            width:50%;
            background-color: #f4f4f4;
        }
        .navNotSelected{
            &:hover{
                background-color: var(--color-grey-tertiary);
                border-color: #f4f4f4;
            }
        }
        .selectedNav{
            background-color: #fff;
            border-bottom-color: transparent;
        }
        
        &.oneOption{
            .headerSideBar{
                width:100%;
            }
        }
        
    }
    
    .badge {
        padding: 4px 4px;
        border-radius: 50%;
        background: red;
        color: white;
        font-size: 6pt;
    }
    .containerBadge{
        margin-left: 7px;
        display: flex;
        margin-top: 2px;
        align-items: center;
    }
    .notificationButton{
        display:flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .badge{
            margin-left: -5px
        }
    }

    #contentSidebar{
        padding: 10px;
        -webkit-overflow-scrolling:auto;
        margin-top:10px;
        overflow-y: scroll;
        white-space: nowrap;
        height: 85%;
    }
    
    .headerSideBar{
        padding: calc(2.375rem / 2 - 8pt) 0.7rem ;
        align-items: center;
        justify-content: space-between;
        width:100%;
        display:flex;
        background-color: var(--primary-color);

        .icons{
            color: var(--color-white-primary);
        }
        .titleSideBar{
            color: white;
            width:60%;
            display:flex;
            text-align: left;
            .icons{
                margin-top: 3px;
                margin-right: 25px;
            }
        }  
    }

    ::-webkit-scrollbar{
    width: 0.3125rem;
    justify-content: center;
    align-items: center;
    padding: none;
    margin: none;
    border-radius: 4px;
    }

    ::-webkit-scrollbar-track{
        background-color: var(--color-grey-secundary);
        width: 0.4375rem;
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb{
        background-color: var(--primary-color);
        border-radius: 4px;
    }


`