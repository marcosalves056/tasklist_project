import { ReactNode } from 'react'
import styled from 'styled-components'

interface ButtonProps{
    children? : ReactNode
    functionButton? : () => void
    color?: string
}

export const Container = styled.button<ButtonProps>`
    //background-color: {props => (!props.variant_gree & !props.variant_red) ? var(--primary-color)};
    height: 1.9rem;
    background: ${props => !props.color ? 'var(--primary-color)' : ''};
    background: ${props => props.color =='red' ? 'var(--color-red-primary)' : ''};
    background: ${props => props.color == 'green' ? 'var(--color-green-dark-primary)' : ''};
    font-size: 1rem;
    color : var(--text-white-primary);
    border-radius: 4px ;
    padding: .35rem 1rem;
    border:none ;
    margin:  0 .25rem;
    text-align: center;
    font-weight: 400;
    white-space: nowrap;
    &:hover{
        //background: var(--primary-color-hover) ;
        background: ${props => !props.color ? 'var(--primary-color-hover)' : ''};
        background: ${props => props.color == 'red' ? 'var(--color-red-primary-hover)' : ''};
        background: ${props => props.color == 'green' ? 'var(--color-green-light-primary)' : ''};
        color: ${props => props.color == 'green' ? 'var(--color---text-black-primary)' : ''}
    }     
    &:disabled{
        background-color: var(--color-blue-secundary);
    }
`