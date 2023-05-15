import { Container } from './styles';
import { BsXCircle } from 'react-icons/bs';

/*########################################################## 
***Version

    220606  LVM                 Initial Version

***Description***

    component ButtonClose
        X-button to close the modals

***Props***
    functionButtonClose       Function of the Button when clicked

##########################################################*/

interface ButtonCloseProps{
    functionButtonClose : () => void
}

export function ButtonClose({functionButtonClose}:ButtonCloseProps){
    
    return(
        <Container onClick={functionButtonClose}>
            <BsXCircle className='icons'></BsXCircle>
        </Container>
    )
}