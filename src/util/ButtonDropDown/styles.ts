import styled from 'styled-components';

interface ContainerProps {
    isExpanded: Boolean
    buttonText : String
}

export const Container = styled.div<ContainerProps>`
        padding-top: auto;
        height: 1.9rem;
        background: var(--primary-color);
        color : var(--text-white-primary);
        border-color: transparent ;
        border-radius: 4px ;
        margin:  0 .25rem;
        padding: calc(.25rem - 2px) .5rem calc(.25rem - 2px) .5rem;
        align-items: center ;
        justify-content: center ;
        transition: 0,2s all;
        border: 0.125rem solid var(--primary-color) ;
        display: inline-block !important ; 
        
        &:hover{
            background-color: var(--color-white-primary) ;
            color: var(--text-blue-primary) ;
        }

        &:disabled{
            background-color: var(--color-blue-secundary);
        }

        .div_invisible{
            display: ${props => (props.isExpanded ? 'flex' : 'none')} ;
            position: fixed ;
            flex: 1 ;
            top:0 ;
            left: 0 ;
            width: 100vw;
            height: 100vh ;
        }
        
        a{
            cursor: pointer;
            display: inline-flex;
            flex-wrap: nowrap;
            flex-direction: row;
            align-content: center;
            justify-content: center;
            align-items: center;
            min-height: 1rem;
            font-size: 1rem;
        
            img {
                width: 0.875rem;
                height: 0.875rem;
                margin-left: 0.125rem;
                /* color: var(--color-white-primary); */
            }

        }

        ${props => ('.dropdown_ul_'+props.buttonText)}{
            list-style: none ;
            display: ${props => (props.isExpanded ? 'block' : 'none')} ;
            position: absolute;
            padding: .5rem .25rem .25rem .25rem;
            margin: .35rem 0 0 -.5rem ;
            border-radius: 0.15rem;
            background-color: #f9f9f9;
            box-shadow: 0 8px 16px rgb(0 0 0 / 20%);
            border-radius: 4px ;
            z-index: 3;

            li{
                width: 100% ;
                padding: .25rem 1rem ;
                color: var(--color-black-primary) ;
                justify-content: center ;
                align-items: center ;
                text-align: left;
                white-space: nowrap;
                display: block ;
                border-radius: 2px;

                &:hover{
                    background-color: var(--color-grey-primary) ;
                    cursor: pointer;
                }
            }

        }
`