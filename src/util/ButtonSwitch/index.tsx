import { useContext } from 'react';
import Switch from 'react-switch';

import { AppContext } from '../../services/context';

/*########################################################## 
***Version

    220609  LVM                 Initial Version

***Description***

    component ButtonSwitch

***Props***
    checked                     The state of ButtonSwitch
    functionButtonSwitch        The function of the ButtonSwitch when the state is changed
    id                          Button id

##########################################################*/

interface ButtonSwitchProps {
    checked: boolean
    functionButtonSwitch: () => void
    id?: string
}

export function ButtonSwitch({id, checked, functionButtonSwitch }: ButtonSwitchProps) {

    const { setClickOutside } = useContext(AppContext)
    
    return (
        <Switch
        checked={checked}
        id={id}
        onChange={()=>{functionButtonSwitch(), setClickOutside(true)}}
            onColor={'#10FF10'}
            offColor={'#ff0000'}
            offHandleColor={'#D1D1D1'}
            checkedIcon={false}
            uncheckedIcon={false}
            height={12}
            width={24} 
            className={'Switch_Circ'}
            handleDiameter={16}
        />
    )
}