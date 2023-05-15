import styled from 'styled-components';

export const Container = styled.div`
    position: fixed ;
    display: flex ;
    flex: 1 ;
    top: 0;
    left: 0 ;
    min-width: 100vw ;
    min-height: 100vh ;
    background-color: transparent;
    z-index: 8;
    align-items: center ;
    justify-content: center ;
    margin: auto ;

    #spanInvisible{
        position: fixed ;
        display: flex ;
        flex: 1 ;
        top: 0;
        left: 0 ;
        min-width: 100vw ;
        min-height: 100vh ;
        background-color: rgba(0,0,0,.7);
        z-index: 8;
        align-items: center ;
        justify-content: center ;
        margin: auto ;
    }

    #modal{
        background-color: var(--color-white-primary) ;
        display: block ;
        top: 5rem;
        position: absolute ;
        max-width: 33rem;
        min-width: 20.625rem;
        width: 95% ;
        margin: 0 auto ;
        border-radius: 4px ;
        align-items: center ;
        justify-content: center ;
        padding:.5rem  1rem;
        z-index: 9;
        font-size: 1rem;
        @media (max-width: 465px){
            top: 2rem;
        }
        @media (min-width: 466px) {
            top: 3rem;
        }

        #modalTop{
            display: flex ;
            flex-direction: row;
            justify-content: center ;
            align-items:  center;
            z-index: 10;

            span{
                display: flex ;
                flex: 1 ;
                justify-content: center ;
                color: var(--primary-color)
            }
        }
        #modalBody{
            display:  flex;
            flex: 1 ;
            flex-direction: column ;
            padding: 1rem  0 ;
            z-index: 10;
            align-items: baseline ;
            
            max-height: 80vh ;
            
            form{
                display: flex ;
                flex: 1 ;
                flex-direction: row ;
                padding:  0 ;
                z-index: 10;
            }
            @media (max-width: 465px) {
                max-height: 100%;
            }
            @media (min-width: 466px) {
                max-height: 80vh;
            }


            ::-webkit-scrollbar {
                height: 0.3125rem;
                justify-content: center;
                align-items: center;
                padding: none;
                margin: none;
                width: 4px ;
                border-radius: 4px;
            }
        
            ::-webkit-scrollbar-track {
                background-color: var(--color-grey-secundary);
                height: 0.4375rem;
                border-radius: 4px;
            }
        
            ::-webkit-scrollbar-thumb {
                background-color: var(--primary-color);
                border-radius: 4px;
            }
        }
        #modalBotton{
            display: flex ;
            flex: 1;
            flex-direction:  row;
            justify-content: end ;
            align-items: left ;
            z-index: 10;
        }
    }
    
`