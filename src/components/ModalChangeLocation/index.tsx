import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import tasklist_api from '../../services/tasklist_api'
import { AppContext } from '../../services/context'
import { Button } from '../../util/Button'
import InputText from '../../util/InputText'
import { Modal, ModalBody, ModalBotton, ModalTop } from '../ModalGeneric'
import { Location } from '../../lib/interfaces';
import { Container } from './styles'
import { Spin } from '../../util/Spin'
import { GetLocations } from '../../lib/get_functions'

/*########################################################## 
***Version

    220805  MAM                 Initial Version

***Description***

    component ModalCreateNewTask

***Props***
    functionCloseOpenModal     sets modal visibility
    checkedTasks               store an array of selected tasks                    ...

##########################################################*/

interface ModalChangeLocationProps {
    functionCloseOpenModal: () => void
    checkedTasks: Array<number>
}

export function ModalChangeLocation({ functionCloseOpenModal, checkedTasks }: ModalChangeLocationProps) {

    //translations
    const { t } = useTranslation();
    //Get the checked tasks
    const { setCheckedTasksList, ReloadTasksAgain, GlobalChecker } = useContext(AppContext)
    //Get the tasklistid
    const { tasklistid } = useParams()
    //Store the new location name
    const [newLocation, setNewLocation] = useState('')
    //Set the changing status
    const [isChanging, setIsChanging] = useState(false);
    const [existentLocations, setExistentLocations] = useState<Array<Location>>()

    //Define the new location
    async function ChangeLocation() {
        setIsChanging(true),
            tasklist_api.put('/many_tasks/', {
                tasklist_id: tasklistid,
                tasks_id: checkedTasks,
                location: newLocation.trim(),
            })
                .then(() => setIsChanging(false))
                .then(() => (setCheckedTasksList([]), ReloadTasksAgain()))
                GlobalChecker()
    }


    useEffect(() => {
        GetLocations(setExistentLocations, tasklistid)
    }, [])

    return (
        <Container>
            <Modal functionSetModal={functionCloseOpenModal}>
                <ModalTop
                    functionSetModal={functionCloseOpenModal}>
                    {t('Change Location')}
                </ModalTop>
                <ModalBody>
                    <InputText id='changeLocationInput' list='Locations' placeholder={t('Enter a new location or select an existing one')} onChange={(e: any) => setNewLocation(e.target.value)} />
                    <datalist id='Locations'>
                        {existentLocations?.map((loc, key) => <option key={key} value={loc.location} />)}
                    </datalist>
                </ModalBody>
                <ModalBotton>
                    <Button
                        functionButton={() => ChangeLocation()}
                    >
                        {isChanging ? <Spin /> : t('Change')}
                    </Button>
                </ModalBotton>
            </Modal>
        </Container>
    )
}