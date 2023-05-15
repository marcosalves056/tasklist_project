import SpinnerIcon from '../../assets/icons/spinnerIcon.svg'

import { Container } from './styles';

/*############################################################################### 
***Version

    220627  MAM                 Initial Version
    220711  LVM                 Adjusts

***Description***

    component Spin

***Props***

##########################################################*/

export function Spin (){
    
    return(
        <Container id='spin'>
            <img src={SpinnerIcon} alt=''/>
        </Container>
    )
}
