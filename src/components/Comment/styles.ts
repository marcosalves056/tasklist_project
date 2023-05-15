import styled from 'styled-components';

export const ContainerComment = styled.div`
    display: flex ;
    flex: 1;
    flex-direction: row; 
    background-color: var(--primary-color) ;
    color: var(--text-white-primary) ;
    border-radius: 4px ;
    margin-bottom:.25rem ;
    padding: .75rem  .75rem;
    min-height: 100%;
    
    #divCommentStatic{
        display: flex ;
        flex-direction: column;
        flex: 1;
        width: 100% ;
        flex-wrap: wrap ;
        

        em{
            font-style: normal ;
            font-size: .65rem;
            align-self: flex-end;
        }

        p{
            display: flex;
            flex-direction: column;
            max-width: 25rem;
            line-break: auto;
            align-self: flex-start;
            text-align: justify;
        }

        div{
            color: var(--text-black-primary) ;
        }
    }

    #spanButtons{
        display: block ;

        .icons{
            color: var(--text-white-primary);
            &:hover{
                color: var(--text-grey-secundary);
            }
        }
    }

`