import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Container } from './styles'
import { Ordination } from '../../lib/interfaces'
import { useParams } from 'react-router'
import { ButtonIcon } from '../../util/ButtonIcon'

import DownArrowIcon from '../../assets/icons/downArrowIcon.svg'
import UpArrowIcon from '../../assets/icons/upArrowIcon.svg'
import DownArrowGreyOutIcon from '../../assets/icons/downArrowGreyOutIcon.svg'
import UpArrowGreyOutIcon from '../../assets/icons/upArrowGreyOutIcon.svg'

/*######################################################################################################### 
***Version

    220721 MAM                 Initial Version

***Description***

    component FilterStructure

***Props***

    nameOfFilter              The column that will be filtered
    numberOfTasks             Total number of tasks
    filterVisibility          Store selected filter visibility
    onClick                   The function for click um filter label event
    filterVisibility          Verify if there is other filters visible
    generalFilterArray        The array of opened filters
    ordinationStatus          Set the ordination priority
    defaultValue              Check if there is a default value
    ordinations               The ordinations array

##########################################################################################################*/

interface FilterStructureProps {
    nameOfFilter: string
    filterVisibility:boolean
    onClick: () => void //expected: event function
    onFilterIconClicked: () => void //expected: event function
    ordinationStatus: boolean|undefined
    generalFilterArray: Array<string>
    defaultValue: any
    enterKey?: boolean
    ordinations: Array<Ordination>
    children: ReactNode
}

interface OrdinationType{
    ordination: boolean|undefined
}

export function FilterStructure({ nameOfFilter, filterVisibility, onClick, onFilterIconClicked, ordinationStatus, generalFilterArray, defaultValue, enterKey, children, ordinations }: FilterStructureProps) {
    const { tasklistid } = useParams()
    const [ordinationCase, setOrdinationCase] = useState<OrdinationType['ordination']>(undefined) //ordinationCase == true means increased ordering
    const [areaFlag, setAreaFlag] = useState(false)
    const { t } = useTranslation()

    function AddOrCleanGenFilterArray(){
        //Inverted logic, seems to work with no explanation
        filterVisibility == false && !generalFilterArray.includes(nameOfFilter)? 
            generalFilterArray.push(nameOfFilter)
        :
            generalFilterArray.pop()
    }

    useEffect(()=>{
            ordinations?.map(o => o?.field?.includes(nameOfFilter.replace('_', ' ').toLowerCase())? 
                    o.value == 0? 
                        setOrdinationCase(true)
                    : o.value == 1? 
                        setOrdinationCase(false) 
                    : 
                        null
                :
                    null
        )

    },[ordinations, tasklistid])

    useEffect(()=>{
        ordinations.map(o => o?.field).includes(nameOfFilter) ? 
            Number(ordinations.filter(o => o?.field == nameOfFilter)[0].value) == 0? setOrdinationCase(true) : setOrdinationCase(false)
        :
            null
    },[ordinations])

    useEffect(()=>{
        ordinationStatus == undefined? setOrdinationCase(undefined) : null
    },[ordinationStatus])

    return (
        <Container>
            <div className='labelGroup'>
                {ordinationCase == true ?
                    <a onMouseDown={() => setOrdinationCase(false)}>{ordinationStatus != undefined? <img onClick={onClick} src={ordinationStatus == false? DownArrowIcon:DownArrowGreyOutIcon} alt='down-arrow' className='down-arrow' /> : null}</a>
                :
                ordinationCase == false ? 
                    <a onMouseDown={() => setOrdinationCase(true)}>{ordinationStatus != undefined?<img onClick={onClick} src={ordinationStatus == false? UpArrowIcon: UpArrowGreyOutIcon} alt='up-arrow' className='up-arrow' /> : null}</a>
                :
                    null
                }
                <label 
                    className='filter-name'
                    id={`${nameOfFilter.replace(' ', '-').replace('.','').toLocaleLowerCase()}-label`}
                    onMouseDown={() => setOrdinationCase( 
                        ordinationCase == true ? false 
                        : 
                        ordinationCase == false ? undefined 
                        :
                        true )}
                    onClick={() => ['due date', 'assigned to', 'comments'].includes(nameOfFilter.toLocaleLowerCase()) == false?  onClick() : alert(t('Feature under development, sorry for the inconvenience'))}
                    >
                    {t(nameOfFilter)}
                </label>
                    <a className='filterInput' onClick={() => (AddOrCleanGenFilterArray(), onFilterIconClicked(), setAreaFlag(!areaFlag))}>
                    {defaultValue && enterKey?
                    <ButtonIcon IconType='BsFunnelFill'/>
                    :
                    <ButtonIcon IconType='BsFunnel' />}
                    </a>
            </div>
            <div>
                {children}
                
            </div>
        </Container>
    )
}