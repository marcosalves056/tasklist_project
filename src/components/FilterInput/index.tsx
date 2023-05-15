import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router'

import { Container } from './styles'
import { FilterStructure } from '../FilterSturcture'
import tasklist_api from '../../services/tasklist_api'
import { Member, Ordination } from '../../lib/interfaces';
import { AppContext } from '../../services/context';

/*######################################################################################################### 
***Version

    220721 MAM                 Initial Version

***Description***

    component FilterInput

***Props***
    typeOfInput:                Set if the input is textual or numeric
    showDatalist                Specify it there is a option list to show
    nameOfFilter                The column that will be filtered
    onClick                     The function for click um filter label event
    onKeyDown                   The function that gets keyboard events
    onOptionClicked             The function that gets selected option event
    onChange                    Get the input value
    onXClicked                  Clean the filter
    generalFilterArray          The array of opened filters
    ordinationStatus            Set the ordination priority
    defaultValue                Check if there is a default value
    ordinations                 The ordinations array 
    setGeneralFilterVisibility  Function that set all filter visibility
    
##########################################################################################################*/

interface FilterInputProps {
    typeOfInput: 'text' | 'number'
    showDatalist?: boolean
    nameOfFilter: string
    onClick: (e?:any) => void //expected: event function
    onChange: (e?:any) => void //expected: event function
    onKeyDown: (e?:any) => void //expected: event function
    onOptionClicked?: (e?:any) => void //expected: event function
    onXClicked: (e?:any) => void //expected: event function
    generalFilterArray: Array<string>
    ordinationStatus: boolean|undefined
    defaultValue?: any
    ordinations: Array<Ordination>
    setGeneralFilterVisibility: Dispatch<SetStateAction<boolean>>
}

export function FilterInput({ typeOfInput, showDatalist, nameOfFilter, onClick, onChange, onKeyDown, onOptionClicked, onXClicked, generalFilterArray, ordinationStatus, defaultValue, ordinations, setGeneralFilterVisibility }: FilterInputProps) {

    const { tasklistid } = useParams()
    const { t } = useTranslation()
    const { reloadAgain, tasklistsList } = useContext(AppContext)
    const [filterVisibility, setFilterVisibility] = useState(false)
    const [enterKey, setEnterKey] = useState(true)
    const [existentOptions, setExistentOptions] = useState<Array<any>>([])

    useEffect(() => {
        showDatalist == true && nameOfFilter == 'Location'? 
                tasklistid? tasklist_api.post('/get_locations', {
                    tasklist_id: tasklistid
                })
                    .then(res => (setExistentOptions(res.data))): null
            : showDatalist == true && (nameOfFilter == 'Owner' || nameOfFilter == 'Assigned To')? 
                tasklistid? tasklist_api.post('/get_members',{
                        tasklist_id: tasklistid
                    }
                )
                    .then((res) => {
                        setExistentOptions(res.data.filter(( m : Member) => m.access_level != 3))
                    }):null
            :
                null
    },[reloadAgain, filterVisibility, tasklistid])

    useEffect(()=>{
        defaultValue?setEnterKey(true):setEnterKey(false)
    },[defaultValue, tasklistid])

    useEffect(() =>{
        generalFilterArray.length > 0? setGeneralFilterVisibility(true) : setGeneralFilterVisibility(false)
    },[filterVisibility])
    
    return (
        <Container>
            <FilterStructure 
                nameOfFilter={nameOfFilter}
                generalFilterArray={generalFilterArray}
                filterVisibility={filterVisibility}
                enterKey={enterKey} 
                onClick={onClick}
                onFilterIconClicked={() => (setFilterVisibility(!filterVisibility), setGeneralFilterVisibility(true))} 
                ordinationStatus={ordinationStatus} 
                defaultValue={defaultValue}
                ordinations={ordinations}>
                {
                filterVisibility == true ?
                    <>
                        <div className='inputFilter'>
                            <input
                                id={`${nameOfFilter.toLocaleLowerCase()}-filter-input`}
                                onChange={onChange}
                                onKeyDown={onKeyDown}
                                onKeyUp={(e) => e.key === 'Enter'? setEnterKey(true):null}
                                onSelect={onOptionClicked}
                                defaultValue={defaultValue? defaultValue:''}
                                type={typeOfInput} 
                                list={
                                    existentOptions && nameOfFilter == 'Location'? 
                                    'Locations'
                                    : existentOptions && (nameOfFilter == 'Owner' || nameOfFilter == 'Assigned To')? 
                                        'Members' 
                                    : nameOfFilter == 'Status'?
                                        'StatusOptions'
                                    : nameOfFilter == 'Tasklist' ? 
                                        'Tasklists' 
                                        :
                                        undefined}/>
                                {<a className='xButton' id={`${nameOfFilter.toLocaleLowerCase()}-x`} onClick={() => (setFilterVisibility(false), onXClicked())} >x</a>}
                                {existentOptions && showDatalist && nameOfFilter == 'Location'? 
                                    <datalist id='Locations' >
                                        {existentOptions.map((loc, key) => <option key={key} value={loc.location} />)}
                                    </datalist> 
                                :existentOptions && showDatalist && (nameOfFilter == 'Owner' || nameOfFilter == 'Assigned To')? 
                                <datalist id='Members'>
                                        {existentOptions.map((mem, key) => <option key={key} value={mem.name}/>)}
                                    </datalist> 
                                :existentOptions && showDatalist && nameOfFilter == 'Status'?
                                <datalist id='StatusOptions'>
                                        <option>{t('Opened')}</option>
                                        <option>{t('Closed')}</option>
                                    </datalist>
                                :showDatalist && nameOfFilter == 'Tasklist'?
                                <datalist id='Tasklist'><datalist id='Tasklists'>
                                        {tasklistsList.map((mem, key) => <option key={key} value={mem.tasklist_name}/>)}
                                    </datalist> </datalist>
                                :
                                null
                            }
                            
                        </div>
                    </>
                    

                    : null
                }
            </FilterStructure>
                
        </Container>
    )
}