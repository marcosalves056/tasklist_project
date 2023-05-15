import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import tasklist_api from '../../services/tasklist_api';
import { AppContext } from '../../services/context';
import { Button } from '../../util/Button';
import { ModalChangeLocation } from '../ModalChangeLocation';
import { Spin } from '../../util/Spin';
import { ButtonDropDown } from '../../util/ButtonDropDown';
import { ButtonDropDownItem } from '../../util/ButtonDropDownItem';
import { Member, Settings } from '../../lib/interfaces';
import { Container } from './styles';
import { ModalChangeAssignedTo } from '../ModalChangeAssignedTo';
import { ModalChangeLimitDate } from '../ModalChangeLimitDate';

/*##########################################################  
***Version

    220630  LVM                 Initial Version
    220815  MAM                 Apply functions and 
                                different locations
    221223  MAM                 Refactoring

***Description***

    component HeaderTasklistOptions, shows user options

***Props***
    axillarVar          Variable that storage axillar 
                        values(ex: tasks/members selected)
    usingAt             Where the HeaderTasklistOptions appears
    members             Active members data provided
    filterVisibility    If some filter is open
    dataSettings        Tasklist settings

##########################################################*/

interface HeaderTasklistOptionsProps {
    axillarVar?: any
    usingAt?: string
    members?: Array<Member>
    filterVisibility?: boolean
    dataSettings?: Settings | undefined
}

export function HeaderTasklistOptions({ usingAt, axillarVar, members, filterVisibility, dataSettings }: HeaderTasklistOptionsProps) {

    const { t } = useTranslation()
    const { tasklistid } = useParams()
    const { checkedTasksList, setCheckedTasksList, ReloadTasksAgain, userAccessLevel, reloadMembersAgain, setReloadMembersAgain, GlobalChecker } = useContext(AppContext)
    //Start child functions flags
    const [isChangingLocation, setIsChangingLocation] = useState(false)
    const [isChangingAssigned, setIsChangingAssigned] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false);
    const [isRestoring, setIsRestoring] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isClosed, setIsClosed] = useState(false);
    const [isChangeLimitDate, setIsChangeLimitDate] = useState(false);


    //Open checked tasks
    async function OpenTasks() {
        setIsOpen(true),
        tasklist_api.put('/many_tasks', {
            tasks_id: axillarVar,
            status: 1,

        })
            .then(() => ReloadTasksAgain())
            .then(() => setIsOpen(false))
            .then(() => setCheckedTasksList([]))
            GlobalChecker()
    }

    //Close checked tasks
    async function CloseTasks() {
        setIsClosed(true),
            tasklist_api.put('/many_tasks', {
                tasks_id: axillarVar,
                status: 2,

            })
                .then(() => ReloadTasksAgain())
                .then(() => setIsClosed(false))
                .then(() => setCheckedTasksList([]))
                GlobalChecker()
    }

    //Open the modal to change the location of the checked tasks
    async function ChangeLocationModalState() {
        setIsChangingLocation(!isChangingLocation)
    }
    
    //Open the modal to change the assignment of the checked tasks
    async function ChangeAssignedModalState() {
        setIsChangingAssigned(!isChangingAssigned)
    }

    //Change the modal limit date of the checked tasks
    async function ChangeLimitDateModalState() {
        setIsChangeLimitDate(!isChangeLimitDate)
    }

    //Delete checked tasks
    async function DeleteTasks() {
        setIsDeleting(true),
            //Verify if the task is checked
            tasklist_api.put('/many_tasks/', {
                tasks_id: axillarVar,
                deleted: true
            })
                    .then(() => ReloadTasksAgain())
                    .then(() => setIsDeleting(false))
                    .then(() => setCheckedTasksList([]))
                    GlobalChecker()
    }

    //Delete permanently checked tasks
    async function DeleteTaskPermanently() {
        //Verify if the task is checked
                tasklist_api.post('/delete_many_tasks/',{
                    tasks_ids: axillarVar
                }
                )
                    .then(() => {
                        setIsDeleting(false);
                        ReloadTasksAgain()
                    })
                    .then(() => setCheckedTasksList([]))
                    .catch()


            axillarVar.splice(0, axillarVar.length)               
    }

    //Restore checked tasks
    async function RestoreTask() {
        //Verify if the task is checked
                tasklist_api.put('/many_tasks/', {
                    tasklist_id: tasklistid,
                    tasks_id: axillarVar,
                    deleted: false
                })
                    .then(() => {
                        setIsRestoring(false);
                        ReloadTasksAgain()
                    })
                    .then(() => setCheckedTasksList([]))
                    .catch()

        axillarVar.splice(0, axillarVar.length)
    }

    //Disassociate checked members from the tasklist
    async function RemoveMembers() {
        setIsDeleting(true),
            //Verify if the member is checked
            tasklist_api.post('/delete_members/', {
                tasklist_id: tasklistid,
                member_id: axillarVar
            })
                .then(() => { setIsDeleting(false),setReloadMembersAgain(!reloadMembersAgain) })
                GlobalChecker()
    }

    //Change the weekly email status of checked members
    async function WeeklyEmailMembers() {
        setIsLoading(true),
            //Verify if the member is checked
            members?.map(user => axillarVar.includes(user.id) ? tasklist_api.put('/members/', {
                tasklist_id:tasklistid,
                id: axillarVar,
                access_level: user.access_level,
                weeklyEmail: !user.weekly_email
            }).then(() => { setIsLoading(false), setReloadMembersAgain(!reloadMembersAgain) }) : null)
            GlobalChecker()
        }

    //Change checked members access level
    async function RuleMembers(accessLevel: number) {
        //Verify if the member is checked
        members?.map(user => axillarVar.includes(user.id) ?
            tasklist_api.put('/members/', {
                tasklist_id:tasklistid,
                id: user.id,
                access_level: accessLevel,
                weekly_email: user.weekly_email
            }).then(() => {
                setReloadMembersAgain(!reloadMembersAgain)
            })
            :
            null,
            GlobalChecker()
        )
    }

 
    return (
        <>
            {userAccessLevel != 3 ? 
            <Container usingAt={usingAt} filterVisibility={filterVisibility}>
            {usingAt == 'members'?
            <span className='contentHeaderUserOptions'>
                <h4><b>{axillarVar.length}</b> {t('Selected')}</h4>
                <ButtonDropDown id='dropdownRole' buttonText={t('Role')}>
                    <ButtonDropDownItem id='roleAdm' label={t('Admin')} functionItem={() => RuleMembers(1)}/>
                    <ButtonDropDownItem id='roleUser' label={t('User')} functionItem={() => RuleMembers(2)}/>
                    <ButtonDropDownItem id='roleView' label={t('Viewier')} functionItem={() => RuleMembers(3)}/>
                </ButtonDropDown>
                <Button 
                    id='weeklyEmailButton'
                    functionButton={() => { WeeklyEmailMembers() }}
                >
                    {isLoading?<Spin/> : t('Weekly e-mail')}
                </Button>
                <Button 
                    id='removeButton'
                    variant='red'
                    functionButton={() => { RemoveMembers() }} 
                >
                    {isDeleting?<Spin/> : t('Remove')}
                </Button>
            </span>
            :
            usingAt == 'trash'?
            <>
            <span><b>{axillarVar.length} </b>{t('Selected')}</span>
                <Button
                    id='restoreButton'
                    variant='green'
                    functionButton={() =>  { Boolean(dataSettings?.active)?
                        (setIsRestoring(true), RestoreTask()): alert(t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task'))
                    }}
                >
                    {isRestoring?<Spin/> :  t('Restore')}
                </Button>
                <Button
                    id='deletePermanentlyButton'
                    variant='red'
                    functionButton={() => { Boolean(dataSettings?.active)?
                        (setIsDeleting(true), DeleteTaskPermanently()) : alert(t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task'))
                    }}
                >
                    {isDeleting ? <Spin/> : t('Delete Permanently')}
                </Button>
            </>
            :
            <>
                <h4><span>{checkedTasksList.length}</span>{t('Selected')}</h4>
                <Button 
                    id='openMultipleTasksButton'
                    functionButton={()=>{Boolean(dataSettings?.active || usingAt == 'AssignedToMe')? OpenTasks() : alert(t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task'))}}
                >
                    {isOpen? <Spin/> : t('Open')}
                </Button>
                <Button 
                    id='closeMultipleTasksButton'
                    functionButton={()=>{Boolean(dataSettings?.active || usingAt == 'AssignedToMe')? CloseTasks() : alert(t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task'))}} variant={'green'}
                >
                    {isClosed? <Spin/> : t('Close')}
                </Button>
                {
                    usingAt !== 'AssignedToMe'?
                        <>
                            <Button 
                                id='changeMultipleLocationsButton'
                                functionButton={()=>{Boolean(dataSettings?.active)? ChangeLocationModalState() : alert(t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task'))}}
                            >
                                {t('Change Location')}
                            </Button>
                            <Button 
                                id='changeMultipleAssignedButton'
                                functionButton={()=>{Boolean(dataSettings?.active)? ChangeAssignedModalState() : alert(t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task'))}}
                            >
                                {t('Assigned')}
                            </Button>
                            
                            {/* <Button 
                                id='changeMultipleLimitDateButton'
                                functionButton={()=>{Boolean(dataSettings?.active)? ChangeLimitDateModalState() : alert(t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task'))}}
                            >
                                {t('Limit Date')}
                            </Button> */}
                        </>
                    :
                        null
                }
                <Button 
                    id='deleteMultipleTasksButton'
                    functionButton={()=>{Boolean(dataSettings?.active || usingAt == 'AssignedToMe')? DeleteTasks() : alert(t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task'))}} variant={'red'}
                >
                    {isDeleting? <Spin/> : t('Delete')}
                </Button> 
                </> 
            }
            </Container>: <></>}
            {isChangingLocation? <ModalChangeLocation functionCloseOpenModal={() => ChangeLocationModalState()} checkedTasks={axillarVar}/>
            :isChangingAssigned? <ModalChangeAssignedTo functionCloseOpenModal={() => ChangeAssignedModalState()} checkedTasks={axillarVar}/>
            :isChangeLimitDate? <ModalChangeLimitDate functionCloseOpenModal={() => ChangeLimitDateModalState()} checkedTasks={axillarVar}/>
            :null}
        </>
    )
}
