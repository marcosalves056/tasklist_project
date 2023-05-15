import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import tasklist_api from '../../services/tasklist_api'
import { AppContext } from '../../services/context'
import { Button } from '../../util/Button'
import InputDatePicker from '../../util/InputDatePicker';
import { Modal, ModalBody, ModalBotton, ModalTop } from '../ModalGeneric'
import { Container } from './styles'
import { Spin } from '../../util/Spin'
import { ButtonIcon } from '../../util/ButtonIcon';

/*########################################################## 
***Version

    220805  MAM                 Initial Version

***Description***

    component ModalChangeDateLimit

***Props***
    functionCloseOpenModal     sets modal visibility
    checkedTasks               store an array of selected tasks                    ...

##########################################################*/

interface ModalChangeLimitDateProps {
    functionCloseOpenModal: () => void
    checkedTasks: Array<number>
}

export function ModalChangeLimitDate({ functionCloseOpenModal, checkedTasks }: ModalChangeLimitDateProps) {

    //translations
    const { t } = useTranslation();
    //Get the checked tasks
    const { setCheckedTasksList, ReloadTasksAgain, GlobalChecker } = useContext(AppContext)
    //Get the tasklistid
    const { tasklistid } = useParams()
    //Store the new date
    const [limitDate, setLimitDate] = useState('')
    //Set the changing status
    const [isChanging, setIsChanging] = useState(false);
    const [isInputDateVisible, setIsInputDateVisible] = useState(false);


    //Define the new date
    async function ChangeLimitDate() {
        setIsChanging(true)
        const data = {
            tasklist_id: tasklistid,
            tasks_id: checkedTasks,
            due_date: limitDate.trim(),
        }
            tasklist_api.put('/many_tasks/', data)
                .then(() => {
                    setIsChanging(false)
                })
                .then(() => (setCheckedTasksList([]), ReloadTasksAgain()))
                GlobalChecker()
    }

    useEffect(() => {
    }, [])


    return (
        <Container>
            <Modal functionSetModal={functionCloseOpenModal}>
                <ModalTop
                    functionSetModal={functionCloseOpenModal}>
                    {t('Change limit Date')}
                </ModalTop>
                <ModalBody>
                    <div className='divDueDate'>
                        <label htmlFor='openDueDate'>{t('Due Date')}:</label>
                        <span>
                            
                        </span>
                        <div >
                        <ButtonIcon IconType='BsPlus' functionButtonIcon={() => {setIsInputDateVisible(!isInputDateVisible)}}/>
                            {isInputDateVisible ? (
                            <InputDatePicker
                                id='inputDueDate'
                                onChange={(e) => {
                                    setLimitDate(e.target.value);
                                }}
                            />
                            ) : null}
                        </div>
                    </div>
                </ModalBody>
                <ModalBotton>
                    <Button
                        functionButton={() => ChangeLimitDate()}
                    >
                        {isChanging ? <Spin /> : t('Change')}
                    </Button>
                </ModalBotton>
            </Modal>
        </Container>
    )
}