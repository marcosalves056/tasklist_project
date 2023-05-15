import { ReactNode } from 'react';

import { Container } from './styles';

/*########################################################## 
***Version

    220620  LVM                 Initial Version
    221223  MAM                 Refactoring

***Description***

    component ButtonDropDownItem
        Child component for dropdown actions

***Props***
    label                       Name of item
    functionItem                The function of Item
    id                          Item id
    
##########################################################*/

interface ButtonDropDownItemProps {
    label: ReactNode
    functionItem: () => void
    id?: string
}

export function ButtonDropDownItem({id, label, functionItem }: ButtonDropDownItemProps) {
    return (
        <Container id={id} onClick={functionItem}>{label}</Container>
    )
}
