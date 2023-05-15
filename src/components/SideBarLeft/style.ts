import styled from 'styled-components'

export const SideBar= styled.div`
    position: absolute;
    left: -50vw;
    top: 0;
    z-index: 6;
    background-color: rgba(209,209,209,.5);
    height: 100vh ;
    width: 100vw;

    .buttonCloseSlideBar{
        .icons{
            margin-top:1rem ;
            height: 1rem ;
            width: 1rem ;
            &:hover{
                color: var(--text-blue-secundary);
                cursor: pointer;
            }
        }

    }

    .icons{
            color:var(--primary-color);    
        }

    //class to defined the state of component slider bar left
    &.state_true{
        left: 0 ;
    }
    &.state_false{
        left: -100vw ;
    }
    span{
        display: flex ;
        flex: 1;
        img{
            height: 1rem ;
            width: 1rem ;
        }
    }
    nav{
        overflow:scroll;
        max-height: 100%;
        position: relative;
        top:0;
        left: 0;
        background-color: var(--color-white-primary) ;
        min-height: 100vh ;
        width: 20.625rem;
        padding: 1rem;
        z-index: 7; 
        display: flex ;
        flex-direction: column ;
        
        &.sideBar_false{
            left: -330px;
        }

        div{
            
            display:flex ;
            flex-direction: row;
            justify-content: space-between ;
            margin-bottom: 0.5rem ;
            h4{
                color: var(--text-blue-primary);
                font-weight: 600;
                font-size: 1rem;
            }
        }
        button{
            margin: 0 ;
        }
    }
    div & .div_invisible{
            display: flex;
            flex: 1 ;
            width: 100%;
            height: 100% ;
            svg {
                width: 0.625rem;
            }
        }
        #buttonCloseLeftSideBar{
            font-size: 5pt;
            color: var(--text-blue-primary);
            &:hover{
                color: var(--text-blue-secundary);
                cursor: pointer;
            }
        }

`