import { ReactNode, useState } from 'react';

import { Container } from './styles';

import DownArrowWhiteIcon from '../../assets/icons/downArrowWhiteIcon.svg';

/*########################################################## 
***Version

    220620  LVM                 Initial Version
    221223  MAM                 Refactoring

***Description***

    component ButtonDropDown
        Parent component for dropdown actions

***Props***
    children                    Received the ButtonDropDownItem
    buttonText                  The name of button
    id                          Button id
    
##########################################################*/

interface ButtonDropDownProps {
    children: ReactNode
    buttonText: string
    id?:string
}

export function ButtonDropDown({id, children, buttonText }: ButtonDropDownProps) {

    const [dropActive, setDropActive] = useState(false)

    //Set Drop status
    function HandleSetDropDown() {
        setDropActive(!dropActive)
    }

    return (
        <Container id={id} className='ButtonDropDown' isExpanded={dropActive} onClick={() => HandleSetDropDown()}   buttonText={buttonText}>
            <div className='div_invisible' onClick={() => HandleSetDropDown()}></div>
            <a>
                {buttonText}<img src={DownArrowWhiteIcon}></img>
            </a>
            <ul className={'dropdown_ul_'+buttonText}>
                {children}
            </ul>
        </Container>
    )
}