import { forwardRef, ReactNode, TextareaHTMLAttributes } from 'react';

import { Container } from './styles';

/*########################################################## 
***Version

    220622  FGF                 Initial Version

***Description***

    component InputTextArea

***Props***
    children                    Content of the comment
    placeholder                 Text tip of component 
    id                          InputTextArea id

##########################################################*/

interface InputTextAreaProps  extends TextareaHTMLAttributes< HTMLTextAreaElement> {
    children? : ReactNode
    placeholder?: string
    id?:string 
}

const InputTextArea : React.ForwardRefRenderFunction< HTMLTextAreaElement,InputTextAreaProps> = ({id, children, placeholder,...rest}, ref) => {
    
    return(
        <Container 
            placeholder={placeholder} 
            id={id}
            rows={5} cols={33}
            {...rest}
            ref={ref} >
            {children}
        </Container>
    )
}

export default forwardRef(InputTextArea)