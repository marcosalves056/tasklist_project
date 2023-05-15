import styled from 'styled-components';

interface ContainerProps{
    browser: string;
}

export const Container = styled.li<ContainerProps>`
    .tasklist_a{
            min-width: 100%;
            padding:0 ;
            margin: 0;
            text-decoration: none;
            
            span, a{
                display: flex;
                flex-direction: row;
                min-height: 3.8rem;
                height: fit-content;
                border-radius: 4px;
                padding-bottom: ${props => props.browser.includes('Firefox')? 'auto':'0.5rem'};
                .ProgressGroup{
                    height: 2.5rem;
                    padding-top: 0rem;
                    .TasklistName{
                        padding-top: 0.15rem;
                        max-width: 11rem;
                        max-height: ${props => props.browser.includes('Firefox')? 'auto':'3rem'};
                        padding-bottom: 0.3rem;
                        overflow: ${props => props.browser.includes('Firefox')? '-moz-hidden-unscrollable':'visible'};
                        display: ${props => props.browser.includes('Firefox')? '-webkit-box':'flex'};
                        -webkit-line-clamp: ${props => props.browser.includes('Firefox')? '2':'unset'};
                        -webkit-box-orient: ${props => props.browser.includes('Firefox')? 'vertical':'unset'}; 
                        -webkit-box-pack: ${props => props.browser.includes('Firefox')? 'center':'unset'};
                    }
                }
                img {
                    height: 2.5rem ;
                    width: 2.2rem ;
                    margin: .25rem  ;
                }
                div{
                    display: flex ;
                    flex-direction: column;
                    flex-grow: 1;
                    justify-content:left;
                    align-items: initial ;
                    h4{
                        color: var(--text-black-primary);
                        font-weight: 400 ;
                        padding-bottom: .15rem;
                    }
                }
                .CounterGroup{
                    display: flex;
                    flex-direction: row;
                    height: 100% ;
                    color: var(--primary-color) ;
                    margin: 0 .25em 0 .25rem;
                    min-width: 4rem;
                    justify-content: end ;
                    h4{
                        font-size: 1rem;
                        color: var(--text-black-primary);
                        font-weight: 500;
                        display: flex;
                        height: 2.5rem;
                        flex-direction: column;
                        justify-content: end;
                        margin-top: 0;
                        padding-bottom: 0.25rem;
                    }
                    h5{
                        font-size: 1rem;
                        color: var(--text-green-primary);
                        display: flex;
                        height: 2.5rem;
                        flex-direction: column;
                        justify-content: end;
                        padding-bottom: 0.25rem;
                    }
                }
                :hover{
                    background-color : var(--color-grey-secundary);
                }
            }

            .desactive{
                background-color: var(--color-grey-primary);
                :hover{
                    background-color : var(--color-black-secundary);;
                    .TasklistName{
                        color : var(--color-grey-secundary);
                    }
                    .CounterGroup{
                        h4, h5{
                            color: var(--color-grey-secundary);
                        }
                    }
                    progress[value]::-webkit-progress-value{
                        background: var(--color-grey-secundary);
                    }
                }
                .TasklistName{
                    color: var(--text-black-primary);
                }
                .CounterGroup{
                    h4{
                        color: var(--text-grey-primary);
                        display: flex;
                        height: 2.5rem;
                        flex-direction: column;
                        justify-content: end;
                        padding-bottom: 0.25rem;
                    }
                    h5{
                        color :   var(--text-black-primary);
                        font-weight: 500;
                        display: flex;
                        height: 2.5rem;
                        flex-direction: column;
                        justify-content: end;
                        padding-bottom: 0.25rem;
                    }
                }
                
            }
        }
`