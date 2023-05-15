import styled from 'styled-components';
interface HeaderOptionsUserProps{
    usingAt?: string
    filterVisibility?: boolean
}

export const Container = styled.div<HeaderOptionsUserProps>`
    height: fit-content;
    padding: .3rem;
    width: ${props => props.usingAt == undefined ||props.usingAt == 'AssignedToMe'?'100%': 'fit-content'};
    padding-left: ${props => props.usingAt == undefined ||props.usingAt == 'AssignedToMe'?'.25rem%': '0'} ;
    background-color: var(--color-grey-secundary);
    border-radius: 4px ;
    position:  ${props => props.usingAt == undefined ||props.usingAt == 'AssignedToMe'? 'fixed': 'unset'};
    top: ${props => props.usingAt == undefined ||props.usingAt == 'AssignedToMe'? props.filterVisibility == false? '6.4rem': 'calc(11rem - 29.5px)': '0'};
    display: ${props => props.usingAt == undefined ||props.usingAt == 'AssignedToMe'?'flex': 'unset'};
    z-index: 1;
    left: 0;
    align-items: center;
    .buttonPrimary{
        width: auto;
    }
    @media (max-width: 1600px){
        top: ${props => props.usingAt == undefined ||props.usingAt == 'AssignedToMe'? props.filterVisibility == false? '6.4rem': '9.2rem': '0'};
    }
    @media (max-width: 500px){
        top: ${props => props.usingAt == undefined ||props.usingAt == 'AssignedToMe'? props.filterVisibility == false? '6.6rem': '9.2rem': '0'};
        width: auto;
        display: flex;
        overflow-x: scroll;
        
        padding: .15rem ;
        margin: .25rem;
        ::-webkit-scrollbar{
            width: 0;

            padding: none;
            margin: none;
            border-radius: 0px;
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


    }
    h4{
        color: var(--text-blue-primary);
        padding-right: .5rem ;
        
        span{
            font-size: 1.5rem ;
            font-weight: bold ;
            padding-right: .25rem;
        }
        
    }

    .ButtonDropDown{
        margin-bottom: 0 ;
    }
 `