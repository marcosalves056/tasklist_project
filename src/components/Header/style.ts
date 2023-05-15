import styled from 'styled-components'

export const Container= styled.header`
    background-color: var(--primary-color);
    height: 2.375rem;
    max-height: 2.375rem;
    width: 100%;
    display:  flex;
    flex-direction:  row;
    justify-content: space-between;
    align-items: center ;
    padding: 0 0.625rem;
	color: var(--text-white-primary) ;
    box-sizing: border-box ;
    justify-content: space-between;

    .divAssignedToMe{
        display: flex ;
        flex-direction: row ;
        color: var(--primary--color);
        align-items: center ;
        justify-content: left ;
        margin-top: .5rem ;
        h5{
            color: var(--primary-color);
            font-size: 1rem ;
            margin-left: .25rem ;
            font-weight: bold;
            &:hover{
                color: var(--color-blue-primary) ;
            }
        }  
    }

    .PortalName {
        display: flex;
        width: 9rem;
        height: 1.5rem;
        margin-left: 0.5rem;
        color: var(--color-white-primary);
        background-color: var(--text-blue-secundary);
        border-radius: 15px;
        -webkit-box-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        align-items: center;
        margin-right: 10px;
        border-color: var(--text-blue-secundary);     
        text-align: center;
        
    }

    #portal{
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        margin-bottom: -1rem;
        

        p{
            margin-bottom: 0rem;
        }

        @media (max-width: 600px) {
            .LabelChangePortal{
                display: none;
            }
        }
        
    }

    .UserMenu{
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 2.2rem;
        right: 0px;
        min-width: 5rem;
        width: fit-content;
        justify-content: center;
        text-align: center;
        margin: 0;
        z-index: 4;
        background-color: var(--primary-color);
        border: 10px solid var(--primary-color);
        border-radius: 4px;
        h5{
            align-self: end;
        }
        p{
            padding-bottom: 0.5rem;
        }
        p, a, button{
            margin: 0;
        }
        @media (max-width: 600px) {
            top: 2.1rem;
        }
        
    }
    .SideBarLeft, .infoUserButtonIcon{
        width: 30%;
    }

    .infoUserButtonIcon{
        justify-content: right;
    }

    .appTitle{
        height: 2.375rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;
        width: auto;
        a{  
            padding: 2px;
            display: flex;
            align-items: center;
            text-align: center;
        }
        .icons{ 
                background-color: var(--color-white-primary);
                margin: 0.4rem;
                max-height: 2rem;
                border-radius: 4px;
                border: 2px solid var(--color-white-primary);
            }
        @media (max-width: 600px) {
            max-width: 14rem;
            h4{
                padding-top: 0.5rem;
                display: inline;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            
        }
    }
    h4{
        height: 2.375rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 0.25rem;
        margin-bottom: 0.25rem;       
    }
    
	a{
		:hover{
			color: var(--text-blue-secundary);
            cursor: pointer;
		}
	}
    div{
        display: flex;
        flex-direction: row ;
		align-items: center ;

		span{
			position: relative ;
			bottom: 0.5rem;
            font-size: .85rem ;
            position: top ;
		}

        a{
            margin-left: .5rem;
        }
    }
    .icons{
        margin-right: 10px;
        height: 1.5rem;
        width: auto;
        height: 1.75rem;
        color:var(--color-white-primary); 
    }
`
