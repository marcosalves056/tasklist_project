import { ButtonHTMLAttributes, ReactNode } from 'react'

import { Container } from './styles';

/*########################################################## 
***Version

    220606  LVM                 Initial Version
    221223  MAM                 Refactoring

***Description***

    component Button
        Generic customizable Button for modals and user 
        contact components

***Props***
    children                    The content of Button
    disabled                    If the button is disabled
    functionButton              The function of the Button when clicked
    nameOfButton                The name received by the button
    typeOfButton                The type of button which will be displayed
    variant                     The color of the button
    id                          Button ID

##########################################################*/

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children : ReactNode
    disabled? : boolean
    functionButton? : (e : any) => void
    nameOfButton? : string | undefined
    typeOfButton?: 'button' | 'submit' | 'reset' | undefined
    variant? :'red' | 'green'
    id?:string
}

export function Button ({id, children, functionButton, variant, typeOfButton, nameOfButton, disabled}: ButtonProps){

    return(
        <Container 
            color={variant}
            disabled = {disabled? true : false}
            name={nameOfButton}
            onClick={functionButton} 
            type={typeOfButton}
            id={id}
            className='buttonPrimary'
            >       
            {children}
        </Container>
    )
}