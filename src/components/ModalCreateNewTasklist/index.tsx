import { useTranslation } from 'react-i18next';
import { useContext, useRef } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import tasklist_api from '../../services/tasklist_api'
import { AppContext } from '../../services/context';
import { Modal, ModalBody, ModalBotton, ModalTop } from '../ModalGeneric';
import InputText from '../../util/InputText';
import { Button } from '../../util/Button';
import { Spin } from '../../util/Spin';

/*########################################################## 
***Version

    220622  LVM                 Initial Version

***Description***

    component ModalCreateNewTasklist
        Shows the Create new Tasklist modal

***Props***
    functionCloseOpenModal   Sets modal visibility 
    sideBarState             Sets the sidebar visibility

##########################################################*/

interface ModalCreateNewTasklistProps {
    functionCloseOpenModal: () => void
    sideBarState: () => void
}

export function ModalCreateNewTasklist({ functionCloseOpenModal, sideBarState }: ModalCreateNewTasklistProps) {

    const { t } = useTranslation();
    const { ReloadTasksAgain } = useContext(AppContext)
    //Initialize the states
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const InputTextRef = useRef<HTMLInputElement>(null)

    let id = ''

    //Create a new Tasklist
    async function CreateNewTasklist() {
        //change the state of the button to loading
        setIsLoading(true)
        //calls the API to create a new tasklist
        await tasklist_api.post('/tasklist',
            {
                name: InputTextRef.current?.value,
            }
        ).then( res => 
            (
                setIsLoading(false),
                id = res.data.tasklist_id,
                ReloadTasksAgain(),
                functionCloseOpenModal(), 
                sideBarState(),
                navigate(`/tasklist/${id}`, {replace:true})
            )
        ).catch(() => {
            setIsLoading(false)
            alert(t('Failed to create tasklist. Possibly there is already a tasklist that uses the same name on our server. Please change the name of the tasklist and try again'))
        })
        
            
            
    }

    return (
        <Modal functionSetModal={functionCloseOpenModal}>
            <ModalTop
                functionSetModal={functionCloseOpenModal}>
                {t('Create a New TaskList')}
            </ModalTop>
            <ModalBody>
                <InputText
                    placeholder={t('Name of the new TaskList...')}
                    id='nameNewTasklist'
                    ref={InputTextRef}>
                </InputText>
            </ModalBody>
            <ModalBotton>
                <Button
                    id='createNewTLButton'
                    functionButton={() => { CreateNewTasklist() }}
                    variant='green'
                    typeOfButton='submit'>
                    {isLoading ? <Spin/> : t(`Create`)}
                </Button>
            </ModalBotton>
        </Modal>
    )
}