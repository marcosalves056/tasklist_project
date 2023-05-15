import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Select from 'react-select';

import tasklist_api from '../../services/tasklist_api';
import { AppContext } from '../../services/context';
import { Modal, ModalBody, ModalBotton, ModalTop } from '../ModalGeneric';
import { Button } from '../../util/Button';
import InputText from '../../util/InputText';
import InputTextArea from '../../util/InputTextArea';
import { Spin } from '../../util/Spin';
import InputDatePicker from '../../util/InputDatePicker';
import { Location, Member, SelectOption, SimpleTask } from '../../lib/interfaces';
import { Container } from './styles';
import { ButtonSwitch } from '../../util/ButtonSwitch';
import { GetLocations, GetMembers } from '../../lib/get_functions';
import { ButtonIcon } from '../../util/ButtonIcon';
import TooltipIcon from '../../assets/icons/tooltipIcon.svg'

/*########################################################## 
***Version

    220626  LVM                 Initial Version
    220627  MAM                 Update Assign to
    220707  MAM                 Implement react-select 
    230425  BFG                 Implement insert image

***Description***

    component ModalCreateNewTask

***Props***
    functionCloseOpenModal     sets modal visibility                    ...

##########################################################*/

export interface ModalCreateNewTasklistProps {
    functionCloseOpenModal: () => void
}

export function ModalCreateNewTask({ functionCloseOpenModal }: ModalCreateNewTasklistProps) {

    //translations
    const { t } = useTranslation();
    //Get global variables from context
    const { ReloadTasksAgain, setClickOutside, tasklistsList } = useContext(AppContext)
    //Get the tasklist name
    const { tasklistid } = useParams()
    //Set the loading status
    const [isLoading, setIsLoading] = useState(false)
    //Get the date opened
    const [selectedDate, setSelectDate] = useState<string>('')
    //Get the task description
    const [inputTextAreaDescription, setInputTextAreaDescription] = useState('')
    //Get the task location
    const [inputTextLocation, setInputTextLocation] = useState('')
    //Get the task location
    const [inputTextAreaComment, setInputTextAreaComment] = useState('')
    //Set the assigned employee
    const [selectedEmployee, setSelectedEmployee] = useState<Array<SelectOption>>([])
    //Set the assignation select visibility
    const [isSpanSelectVisible, setIsSpanSelectVisible] = useState(false)
    //Set the due date input visibility
    const [isInputDateVisible, setIsInputDateVisible] = useState(false)
    const [existentLocations, setExistentLocations] = useState<Array<Location>>()
    const [listOfEmployees, setListOfEmployees] = useState<Array<SelectOption>>()
    const [multipleTooltipFlag, setMultipleTooltipFlag] = useState<boolean>(false)
    const [createMultiple, setCreateMultiple] = useState<boolean>(false)
    //const [taskId, setTaskId] = useState<number>()


    //Create a new task
    async function CreateNewTask() {
        setIsLoading(true)
        //Verify if location and description fields aren't empty or field by blank spaces
        if (inputTextLocation.trim() !== '' && inputTextAreaDescription.trim() !== '') {

            const data = {
                tasklist_id: tasklistid,
                location: inputTextLocation.trim(),
                description: inputTextAreaDescription.trim(),
                assigned: selectedEmployee.map(se => Number(se.value)),
                due_date: selectedDate? moment(selectedDate).format('MM/DD/YYYY') : '',
                comment: inputTextAreaComment.trim()
            }

            tasklist_api.post('/task',data)
            .then((res) => {
                setClickOutside(false)
                functionCloseOpenModal()
                ReloadTasksAgain()
                setInputTextAreaDescription('')
                setInputTextLocation('')
            }).catch(() => (setIsLoading(false), functionCloseOpenModal(),ReloadTasksAgain(),setInputTextAreaDescription(''),setInputTextLocation('')))

        } else { //if location and description fields are empty or field by blank spaces, alert user
            alert(t('Required field not already filled! Please fill them before create a task.'))
            setIsLoading(false)
        }
    }

    //Create a multiple tasks at the same time
    async function CreateMultipleTasks(){
        const tasks :Array<SimpleTask> = []
        const descriptions : Array<string> = inputTextAreaDescription.trim().split(/\r?\n/)
        descriptions.map(description => {
            tasks.push({location: inputTextLocation, description: description})
        })
        tasklist_api.post('/many_tasks',{
            tasklist_id: tasklistid,
            tasks: tasks
        }).then(()=>{
            setIsLoading(false)
            ReloadTasksAgain()
            functionCloseOpenModal()
        })
    }

    useEffect(() => {
        GetLocations(setExistentLocations, tasklistid)
    },[])

    useEffect(() => {
        GetMembers(setListOfEmployees, tasklistid)
    }, [isSpanSelectVisible])

    return (
        <>

            <Modal functionSetModal={functionCloseOpenModal}>
                <ModalTop
                    functionSetModal={functionCloseOpenModal}>
                    {t('Create a New Task')}
                </ModalTop>
                <ModalBody>
                    <Container>
                        <div id='divLocation'>
                            <label htmlFor='inputLocation'>*{t('Location')}:</label>
                            <InputText id='inputLocation' list='Locations' onChange={(e) => e.target.value !== '' ? (setClickOutside(true), setInputTextLocation(e.target.value)) : setClickOutside(false)} />
                            <datalist id='Locations'>
                                {existentLocations?.map((loc, key) => <option key={key} value={loc.location} /> )}
                            </datalist>
                        </div>
                        <div id='divDescription'>
                            <label htmlFor='inputDescription'>*{t('Description')}:</label>
                            <InputTextArea id='inputDescription' placeholder={t('Type the description here...')} onChange={(e) => e.target.value !== '' ? (setClickOutside(true), setInputTextAreaDescription(e.target.value)) : setClickOutside(false)} />
                        </div>
                        {/* <div id='divAttachment'>
                            <DropZone saving={isLoading} taskId={taskId} active={true}/>
                        </div> */}
                        <div id='divMultiTask'>
                            <label htmlFor='createMultipleTasks'>{t('Create multiple tasks')}:</label>
                            <div className='tooltip' onMouseEnter={() => setMultipleTooltipFlag(true)} onMouseLeave={() => setMultipleTooltipFlag(false)}>
                                <img  src={TooltipIcon} alt='tooltip icon' />
                                {multipleTooltipFlag ? <span>{t('If checked, each line of the description will be one task.')}</span> : null}
                            </div>
                            <ButtonSwitch
                                id='createMultipleTasks'
                                checked={createMultiple}
                                functionButtonSwitch={() => {
                                    setCreateMultiple(!createMultiple);
                                }
                                } />
                        </div>
                        {
                            createMultiple?
                                null
                            :
                                <>
                                    <div id='divAssignedTo'>
                                        <label htmlFor='openAssignedTo'>{t('Assigned To')}:</label>
                                        <ButtonIcon IconType="BsPlus" functionButtonIcon={() => { setIsSpanSelectVisible(!isSpanSelectVisible) }}/>
                                        {isSpanSelectVisible ? <span id='spanSelect'>
                                            <Select id='selectAssignedTo' options={listOfEmployees} isClearable isMulti isSearchable onChange={(e: any) => { setClickOutside(true), setSelectedEmployee(e) }} />
                                        </span> : null}
                                    </div>
                                    <div id='divDueDate'>
                                        <label htmlFor='openDueDate'>{t('Due Date')}:</label>
                                        <ButtonIcon IconType="BsPlus" functionButtonIcon={() => { setIsInputDateVisible(!isInputDateVisible) }}/>
                                        
                                        {isInputDateVisible ? <InputDatePicker id='inputDueDate' onChange={(e) => { setClickOutside(true), setSelectDate(e.target.value) }} value={selectedDate} /> : null}
                                    </div>
                                    <div id='divComments'>
                                        <label htmlFor='inputComment'>{t('Comment')}:</label>
                                        <InputTextArea id='inputComment' placeholder={t('Insert a comment here...')} onChange={(e) => e.target.value !== '' ? setInputTextAreaComment(e.target.value) : null} />
                                    </div>
                                </>
                        }
                    </Container>
                </ModalBody>
                <ModalBotton>
                    <Button
                        id='newTaskButton'
                        functionButton={() => {createMultiple? CreateMultipleTasks(): CreateNewTask()}}
                        variant='green'
                        typeOfButton='submit'>
                        {isLoading ? <Spin /> : t(`Create`)}
                    </Button>
                </ModalBotton>
            </Modal>
        </>
    )
}