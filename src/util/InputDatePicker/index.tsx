import { forwardRef, InputHTMLAttributes } from 'react';

import { Container } from './styles';

/*########################################################## 
***Version

    220629  FGF                 Initial Version

***Description***

    componentInputDatePicker

***Props***

##########################################################*/

interface InputDatePickerProps extends InputHTMLAttributes<HTMLDataElement>{
}

const InputDatePicker : React.ForwardRefRenderFunction<HTMLDataElement,InputDatePickerProps> =({...rest}, ref) => {
    
    return (
        <Container type='date'{...rest} >
        </Container>
    )
}

export default forwardRef(InputDatePicker)