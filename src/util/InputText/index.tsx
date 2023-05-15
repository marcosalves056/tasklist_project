import React, {InputHTMLAttributes, forwardRef} from 'react';

import { Container } from './styles';

/*########################################################## 
***Version

    220602  LVM                 Initial Version

***Description***

    component InputText

***Props***
    id                          InputText id

##########################################################*/

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement>{
    id?:string;
}

const InputText : React.ForwardRefRenderFunction<HTMLInputElement,InputTextProps> = ({id, ...rest}, ref, ) => {
    
    return(
        <Container {...rest}
            id={id}
            ref={ref}
        >
        </Container>
    )
}

export default forwardRef(InputText)