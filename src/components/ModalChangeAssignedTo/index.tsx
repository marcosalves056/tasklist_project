import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import tasklist_api from '../../services/tasklist_api'
import { Button } from '../../util/Button'
import { LoadingSpin } from '../../util/LoadingSpin'
import { Modal, ModalBody, ModalBotton, ModalTop } from '../ModalGeneric'
import { AppContext } from '../../services/context'
import { Container } from './styles'
import { GetMembers } from '../../lib/get_functions'

/*########################################################## 
***Version

    220805  MAM                 Initial Version
        221223  MAM                 Refactoring

***Description***

    component ModalChangeAssignedTo

***Props***
    functionCloseOpenModal     sets modal visibility
    checkedTasks               store an array of selected tasks                  ...

##########################################################*/

interface ModalChangeLocationProps {
    functionCloseOpenModal: () => void
    checkedTasks: Array<number>
}

interface SelectOption {
    value: string|number,
    label: string,
}

export function ModalChangeAssignedTo({ functionCloseOpenModal, checkedTasks }: ModalChangeLocationProps) {

    const { t } = useTranslation()
    const { tasklistid } = useParams()
    const { setCheckedTasksList, ReloadTasksAgain, GlobalChecker } = useContext(AppContext)
    //Initialize the states
    const [listOfEmployees, setListOfEmployees] = useState<Array<SelectOption>>()
    const [selectedOptions, setSelectedOptions] = useState<HTMLCollectionOf<HTMLOptionElement>>()  
    const [addCleared, setAddCleared] = useState<boolean>(false)   

    //Change the checked tasks assigned to employee 
    function ChangeAssignedTo() {
        //verify if the task is included in the checked tasks group
        tasklist_api.put('/many_tasks', {
            tasklist_id: tasklistid,
            tasks_id: checkedTasks,
            assigned: selectedOptions? listOfEmployees?.map(emp => emp.value) : []
        }).then(() => (setCheckedTasksList([]), ReloadTasksAgain()))
        GlobalChecker()
    }

    //Change user assigned to a task
    function PopulateSelectedUsers(list?: HTMLCollectionOf<HTMLOptionElement>){
        const selectedUsersTemp : Array<SelectOption> = []
            if(list){
                for(let i = 0; i < list.length; i++){
                    selectedUsersTemp.push( {value: String(list.item(i)?.value), label: String(list.item(i)?.label)})
                }
                setListOfEmployees(selectedUsersTemp)
            }
        
        setAddCleared(true)
    }

    useEffect(() => {
        GetMembers(setListOfEmployees, tasklistid)
    }, [])

    useEffect(() => {
        addCleared == true? ChangeAssignedTo() : null
    }, [addCleared])

    return (
        <Container>
            <Modal functionSetModal={functionCloseOpenModal}>
                <ModalTop
                    functionSetModal={functionCloseOpenModal}>
                    {t('Change Assigned To')}
                </ModalTop>
                <ModalBody>
                    {listOfEmployees?.length == 0 ?
                        <div id='divLoading'>
                            <LoadingSpin />
                        </div>
                        :
                        <select multiple onChange={(e) => ( setSelectedOptions(e.target.selectedOptions))}>
                            {listOfEmployees?.map(emp =>
                                <option value={emp.value}  label={emp.label}/>
                            )}
                        </select>
                    }
                </ModalBody>
                <ModalBotton>
                    <Button functionButton={() => selectedOptions? PopulateSelectedUsers(selectedOptions) : PopulateSelectedUsers()}>{t('Change')}</Button>
                </ModalBotton>
            </Modal>
        </Container>
    )
}