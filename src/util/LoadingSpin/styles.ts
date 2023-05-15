import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column ;
    min-width: 10vw;
    min-height: 15vh;
    display: flex;
    align-items: center ;
    justify-content: center ;

    #Loading{
        display: flex;
        height: 0.625rem;
        padding-top: 0.5rem;

        h1 {
            display: flex;
            font-size: 1.25rem;
            color: var(--text-grey-primary);

        }
    }

`