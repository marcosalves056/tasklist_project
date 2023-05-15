import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import tasklist_api from '../../services/tasklist_api';
import { AppContext } from '../../services/context';
import { Button } from '../../util/Button';
import { ButtonDropDown } from '../../util/ButtonDropDown';
import { ButtonDropDownItem } from '../../util/ButtonDropDownItem/index';
import { ModalCreateNewTask } from '../ModalCreateNewTask';
import { ModalImportTasks } from '../ModalImportTasks';
import { ModalSettings } from '../ModalSettings';
import { Settings } from '../../lib/interfaces';
import  PdfTemplate  from '../PdfTemplate';
import { Container } from './styles';

/*########################################################## 
***Version

    220620  LVM                 Initial Version
    220722  FGF                 Changes in styles.ts
    230426  BFG                 Remove Notifications
    230427  MAS                 Remove Modal Historic

***Description***

    component HeaderTasklist

***Props***
    assignedToMe               Verify if the user is in 'Tasks assigned to me' page
    refreshSettingsFunction    Refresh settings data
    dataSettings               Settings data
    closeOrOpenSideBar         Verify if side bar is open

##########################################################*/

interface HeaderTasklistProps {
    assignedToMe?: boolean
    refreshSettingsFunction?: any //expected: setStateAction
    dataSettings: Settings | undefined
}

export function HeaderTasklist({ assignedToMe, dataSettings, refreshSettingsFunction}: HeaderTasklistProps) {

    const { t } = useTranslation()
    const { tasklistid } = useParams()
    const { userAccessLevel, tasklistsList, userName, userPortalLogo, setPrintFilteredFlag } = useContext(AppContext)
    //Initialize the states
    const [isModalActive, setIsModalActive] = useState(false)
    const [isSettingsActive, setIsSettingsActive] = useState(false)
    const [isImportTasksActive, setIsImportTasksActive] = useState(false)
    const [isOpenSlider, setIsHistoricSliderActive] = useState(false)
    
    //Sets modal activity
    function HandleToggleShowModal() {
        setIsModalActive(!isModalActive)
    }

    //Sets settings activity
    function HandleToggleShowImportTasks() {
        setIsImportTasksActive(!isImportTasksActive)
    }

    //Sets settings activity
    function HandleToggleShowSettings() {
        setIsSettingsActive(!isSettingsActive)
    }


    //Sets print activity
    function PrintCurrentFilter() {
        setPrintFilteredFlag(true)
        //Logic in component 'Tasklist Content'
    }

    //Print all existing tasks
    function PrintAllTasks() {
        if (tasklistsList.filter( t => t.tasklist_id == tasklistid)[0]?.totalTasks == 0){
            alert(t('There are no tasks to print'))
            return
        }
        tasklist_api.post(`/get_tasklist`,{
            tasklist_id: !assignedToMe ? tasklistid : 0,
                _limit: !assignedToMe ? tasklistsList.filter( t => t.tasklist_id == tasklistid)[0].totalTasks : 2147483647,
                _page: 1,
                filters: [{field: 'deleted', value:['false']}],
                ordinations: [{field: '.', value: 0}, {field: '.', value: 0}]
        })
            .then((res) => {
                PdfTemplate(res.data, res.data.tasks, userName, userPortalLogo)
            }).catch(() => alert(t('There are no tasks to print')))
    }
    
    return (
        <>
            <Container>
                {assignedToMe != true ?
                    <>
                        <div>
                            {userAccessLevel != 3 ?
                                <ButtonDropDown id='newButton' buttonText={t('New')}>
                                    <ButtonDropDownItem id='newTask' functionItem={() => { Boolean(dataSettings?.active)? HandleToggleShowModal() : alert(t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task'))}} label={t('Task')} />
                                    <ButtonDropDownItem id='importTasks' functionItem={() => { Boolean(dataSettings?.active)? HandleToggleShowImportTasks() : alert(t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task'))}} label={t('Import Tasks')} />
                                </ButtonDropDown>
                                :
                                null
                            }
                            <ButtonDropDown id='printButton' buttonText={t('Print')}>
                                <ButtonDropDownItem id='printCurrent' functionItem={() => { PrintCurrentFilter() }} label={t('Current filter')} />
                                <ButtonDropDownItem id='printAll' functionItem={() => { PrintAllTasks() }} label={t('All tasks')} />
                            </ButtonDropDown>
                        </div>
                        
                        <div>
                            
                            <Button id='settingsButton' functionButton={() => { HandleToggleShowSettings() }}>{t('Settings')}</Button>
                        </div>
                    </>
                    :
                    <ButtonDropDown id='printButton' buttonText={t('Print')}>
                        <ButtonDropDownItem id='printCurrent' functionItem={() => { PrintCurrentFilter() }} label={t('Current filter')} />
                        <ButtonDropDownItem id='importTasks' functionItem={() => { PrintAllTasks() }} label={t('All tasks')} />
                    </ButtonDropDown>
                }
            </Container>
            {isModalActive ?
                <ModalCreateNewTask functionCloseOpenModal={HandleToggleShowModal} />
                : isSettingsActive ? <ModalSettings dataSettings={dataSettings} functionCloseOpenModal={HandleToggleShowSettings} refreshSettingsFunction={refreshSettingsFunction}/>
                : isImportTasksActive ? <ModalImportTasks functionCloseOpenModal={HandleToggleShowImportTasks} />
                : null
            }
        </>
    )
}