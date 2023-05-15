import styled from 'styled-components';

interface ProgressBarProps{
    color: string
}

export const Container = styled.div<ProgressBarProps>`

    progress[value]{
        appearance: none;
        width: 50%;
        height: 0.5rem;
        border-radius: 16px;
        position: absolute;
    }
    progress[value]::-webkit-progress-bar{
        border-radius: 5px;
        background: ${props => props.color == 'active'? 'var(--color-grey-primary)' : ''};
        background: ${props => props.color == 'archived' ? 'var(--color-grey-alternative)' : ''};
    }
    progress[value]::-webkit-progress-value{
        border-radius: 5px;
        background: ${props => props.color == 'active'? 'var(--color-green-dark-primary)' : ''};
        background: ${props => props.color == 'archived' ? 'var(--color-black-secundary)' : ''};
        :hover{
            background: ${props => props.color == 'archived' ? 'var(--color-grey-secundary)' : ''};
        }
    }
    progress[value]::-moz-progress-bar{
        padding: 0;
        margin: 0;
        border: 0;
        background: ${props => props.color == 'active'? 'var(--color-green-dark-primary)' : ''};
        background: ${props => props.color == 'archived' ? 'var(--color-grey-alternative)' : ''};
    }
`