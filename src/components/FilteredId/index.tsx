import { useTranslation } from 'react-i18next'

import { Filter } from '../../lib/interfaces'
import { Spin } from '../../util/Spin'
import { Container } from './styles'

/*############################################################ 
***Version

    220815  MAM                 Initial Version
    221221  MAM                 Refactoring

***Description***

    component FilteredId
        Shows how many tasks are being displayed  
        in relation to the total number of tasks

***Props***
    
    filteredData        How many tasks passed the user filter
    paginatedData       How many tasks are being displayed
    filters             The users filter
    assignedToMe        if the task is assigned to the user or not
    onClick             Event when the user clicks the filter 
                        label indicator

############################################################*/

interface FilteredIdProps{
    filteredData?: number
    paginatedData?: number
    filters: Array<Filter>
    assignedToMe?: boolean
    onClick: () => void
}

export function FilteredId({filteredData, paginatedData, filters, assignedToMe,onClick}:FilteredIdProps){

    const { t } = useTranslation()

    return(
        <Container>
            {
                filteredData != undefined && paginatedData != undefined?
                    <>
                        <label htmlFor='indicator'>{paginatedData} {t('of')} {filteredData} {filters.length > (assignedToMe? 2 : 1) ? <p onClick={onClick}>{t('(filtered)')}</p> : null}</label>
                        <progress id='indicator' max={filteredData} value={paginatedData} />
                    </>
                :
                    <Spin/>
            }
        </Container>
    )
}