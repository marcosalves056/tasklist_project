import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

import { Container } from './styles'
import { FilterStructure } from '../FilterSturcture'
import { Ordination } from '../../lib/interfaces';
import { DateRangePicker } from '../../util/DateRangePicker';
import { Modal, ModalBody, ModalBotton, ModalTop } from '../ModalGeneric';
import { Button } from '../../util/Button';

/*######################################################################################################### 
***Version

    220721 MAM                 Initial Version

***Description***

    component TaskDateFilter

***Props***

    nameOfFilter              The column that will be filtered
    numberOfTasks             Total number of tasks
    filterVisibility          Store selected filter visibility
    onClick                   The function for click um filter label event
    onChange                  Get the date value
    onXClick                  Clean the filter
    dateSeters                Date filter Seters
    filterVisibility          Verify if there is other filters visible
    generalFilterArray        The array of opened filters
    ordinationStatus          Set the ordination priority
    defaultValue              Check if there is a default value
    ordinations               The ordinations array 

##########################################################################################################*/

interface TaskDateFilterProps {
    nameOfFilter: string
    onClick: (e?:any) => void //expected: event function
    onChange: (e?:any) => void //expected: event function
    onXClick: (e?:any) => void //expected: event function
    generalFilterArray: Array<string>
    ordinationStatus: boolean|undefined
    dateSeters: Array<Dispatch<SetStateAction<string>>>
    defaultValue?: any
    ordinations: Array<Ordination>
}

export function TaskDateFilter({nameOfFilter, onClick, onChange, onXClick, generalFilterArray, ordinationStatus, dateSeters ,defaultValue, ordinations }: TaskDateFilterProps) {
    
    const { t } = useTranslation()
    //Initialize the states
    const [filterVisibility, setFilterVisibility] = useState(false)
    const [modalActive, setModalActive] = useState(false)
    const [enterKey, setEnterKey] = useState(false)

    useEffect(() => {
        generalFilterArray.includes(('Date Opened'||'Due Date')) ? setEnterKey(true) : setEnterKey(false)
    },[])

    useEffect(() => {
        setModalActive(filterVisibility)
    },[filterVisibility])

    return (
        <Container>
            <FilterStructure 
                nameOfFilter={nameOfFilter}
                generalFilterArray={generalFilterArray}
                filterVisibility={filterVisibility}
                enterKey={true}
                onClick={onClick}
                onFilterIconClicked={() => setFilterVisibility(!filterVisibility)} 
                ordinationStatus={ordinationStatus} 
                defaultValue={defaultValue}
                ordinations={ordinations}>
                {
                    <></>
                }
            </FilterStructure>
            {modalActive? 
                <Modal functionSetModal={() => (setFilterVisibility(false)) }>
                        <ModalTop functionSetModal={ () => (setFilterVisibility(false))}>
                            {t(nameOfFilter)}
                        </ModalTop>
                        <ModalBody>
                            <DateRangePicker onChange={onChange} dateSeters={dateSeters} insideModal/>
                        </ModalBody>
                        <ModalBotton>
                            <Button functionButton={onXClick}>{t('Clean')}</Button>
                        </ModalBotton>
                    </Modal>
                :
                    null}
        </Container>
    )
}

