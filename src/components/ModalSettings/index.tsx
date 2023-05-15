import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';

import { AppContext } from '../../services/context';
import { Settings, taskProps } from '../../lib/interfaces';
import { Modal, ModalBody, ModalTop } from '../ModalGeneric';
import { Container, ContainerOptions, ContainerMembers, ContainerAddUser, ContainerRow, ContainerTrash, HeaderContainer } from './styles';
import { Button } from '../../util/Button';
import { LoadingSpin } from '../../util/LoadingSpin';
import { Spin } from '../../util/Spin';
import { ButtonSwitch } from '../../util/ButtonSwitch';
import { History } from '../History'
import { HeaderTasklistOptions } from '../HeaderTasklistOptions';
import userIcon from '../../assets/icons/userIcon.svg'

import tasklist_api from '../../services/tasklist_api';
import { Member } from '../../lib/interfaces';
import { MembersRow } from '../MembersRow';
import { ButtonIcon } from '../../util/ButtonIcon';

/*########################################################## 
***Version

    2207018  MAM                 Initial Version
    2207219  FGF                 Implemented trash and tasks containers

***Description***

    component ModalCreateNewTask

***Props***
    refreshSettingsFunction    Refresh the modal content
    functionCloseOpenModal     Sets modal visibility   
    dataSettings               The modal source

##########################################################*/

interface ModalSettingsProps {
    refreshSettingsFunction?: Dispatch<SetStateAction<boolean>>
    functionCloseOpenModal: () => void
    dataSettings: Settings | undefined
}

interface ProjectProps {
    project_id: number
    project_name: string
}

interface SubProjectProps {
    id: number
    project_id: number
    subproject_name: string
}


interface SelectOptionsProps {
    value: number
    label: string
}

interface SettingOptionsProps {
    defaultData: Settings;
    refreshSettingsFunction?: any //expected: setStateAction
}

interface UserProps {
    id?: number,
    name?: string,
}

interface SettingAddUserProps {
    functionReturn: () => void
    data: Array<Member>
}

interface SettingsTrashProps {
    dataSettings: Settings;
}

interface rowProps {
    i: any | null | undefined
    data: taskProps
    selectedTasks: Array<number>
    setSelectedTasks: (o: Array<number>) => void
}

export function ModalSettings({ functionCloseOpenModal, dataSettings, refreshSettingsFunction }: ModalSettingsProps) {
    const { t } = useTranslation();
    const { tasklistid } = useParams()
    //initialize the states
    const { userAccessLevel, setUserAccessLevel, tasklistsList } = useContext(AppContext)
    const [option, setOption] = useState(0)

    useEffect(() =>{
        userAccessLevel != 1?
            setUserAccessLevel(tasklistsList.filter(t => t.tasklist_id == tasklistid)[0]?.role)
        :
            null
    },[])

    return (
        <Container>
            <Modal functionSetModal={functionCloseOpenModal}>
                <HeaderContainer>
                    <ModalTop
                        functionSetModal={functionCloseOpenModal}>
                        {t('Settings')}
                    </ModalTop>
                    <nav className='settingsChoice'>
                        {userAccessLevel == 1 ?
                            <>
                                <Button functionButton={() => { setOption(0) }}>{t('Options')}</Button>
                                <Button functionButton={() => { setOption(1) }}>{t('Members')}</Button>
                                <Button functionButton={() => { setOption(2) }}>{t('Trash')}</Button>                             
                            </>
                            :
                            <>
                            <Button functionButton={() => { setOption(1) }}>{t('Members')}</Button>
                            <Button functionButton={() => { setOption(3) }}>{t('Notifications')}</Button>
                            </>
                        }


                    </nav>
                </HeaderContainer>
                <ModalBody>
                    {dataSettings?
                        option == 0 ?
                            <SettingsOptions defaultData={dataSettings} refreshSettingsFunction={refreshSettingsFunction}/>
                            :
                            option == 1 || userAccessLevel != 1?
                                <SettingsMembers />
                            :
                            option == 2 && userAccessLevel == 1?
                                <SettingsTrash dataSettings={dataSettings}/>
                            :
                            null
                        :
                        null
                    }
                </ModalBody>
            </Modal>
        </Container>
    )
}




// =============================================================================================================





function SettingsAddUser({ functionReturn, data }: SettingAddUserProps){
    const { t } = useTranslation();
    const { tasklistid } = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<Array<UserProps>>([])
    const [selectedOptions, setSelectedOptions] = useState<HTMLCollectionOf<HTMLOptionElement>>()  
    const [selectedUsers, setSelectedUsers] = useState<Array<UserProps>>([])
    const [addCleared, setAddCleared] = useState<boolean>(false)    

    async function AddNewUsers() {

        setIsLoading(true)
        
            await tasklist_api.post('/members', {
                tasklist_id: tasklistid,
                user_id: selectedUsers.map(u => u.id),
            });
        
        setIsLoading(false)
        functionReturn()
    }

    function PopulateSelectedUsers(list: HTMLCollectionOf<HTMLOptionElement>){
        const selectedUsersTemp : Array<UserProps> = []
            for(let i = 0; i < list.length; i++){
                selectedUsersTemp.push({id: Number(list?.item(i)?.value), name: list?.item(i)?.label})
            }
        setSelectedUsers(selectedUsersTemp)
        
        setAddCleared(true)
    }

    useEffect(() => {
        var participatingUsers: Array<number> = []

        data?.map((user: Member) => { participatingUsers.push(user.id) })

        tasklist_api.post('/get_all_members',{
            tasklist_id: tasklistid
        }).then( res => setUsers(res.data))

    }, [])

    useEffect(() => {
        addCleared == true? AddNewUsers() : null
    }, [addCleared])

    return (
        <ContainerAddUser>
            {!isLoading ?
                <>
                    <span>{t('Adding New Users')} <ButtonIcon functionButtonIcon={() =>setAddCleared(true)} IconType='BsArrowLeftCircle' /></span>
                    <select id='selectNewUsers' onChange={(e) => (setSelectedOptions(e.target.selectedOptions))} multiple>
                        {users?.map((user) => {
                            return (
                                <option key={user.id} value={user.id} label={user.name}>{user.name}</option>
                            )
                        })}
                    </select>
                </>
                :
                <div>
                    <LoadingSpin />
                </div>
            }
            <Button id='saveButton' variant='green' functionButton={() => {selectedOptions? PopulateSelectedUsers(selectedOptions) :null}}>{isLoading ? <Spin /> : t('Save')}</Button>
        </ContainerAddUser >
    )  
}




// =============================================================================================================





function SettingsMembers(){
    const { t } = useTranslation();
    const { tasklistid } = useParams()
    const { userAccessLevel, reloadMembersAgain } = useContext(AppContext)
    //Initialize the states
    const [isClicked, setIsClicked] = useState(false)
    const [showAddUser, setShowAddUser] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<Array<Member>>([])
    const [selectedUsers, setSelectedUsers] = useState<Array<number>>([])
    const [isHistoryVisible, setHistoryVisible] = useState(false)
    
    function CreateUserList(id: number, value: boolean) {
    
        var selectedUsersTemp: Array<number> = selectedUsers
        var idIsTheArrayUsers = false
    
        selectedUsers.find(element => element == id) == undefined ? idIsTheArrayUsers = false : idIsTheArrayUsers = true
    
        if (value == true && !idIsTheArrayUsers) {
            selectedUsersTemp = [...selectedUsers, id]
            setSelectedUsers(selectedUsersTemp)
            return
        }
    
        if (value == false && idIsTheArrayUsers) {
            selectedUsersTemp = selectedUsers.filter((element) => element !== id)
            setSelectedUsers(selectedUsersTemp)
            return
        }
    }
    
    function SelectMembers() {
    
        let selectedUsersTemp: Array<number> = []
    
        if (selectedUsers.length != users.length) {
            users?.map(user => { selectedUsersTemp.push(user?.id) })
            setSelectedUsers(selectedUsersTemp)
        } else {
            setSelectedUsers([])
        }
    }
    
    useEffect(() => {
    
        setIsLoading(true)
        tasklistid? 
            tasklist_api.post('/get_members',{
                    tasklist_id: tasklistid
                }
            )
            .then((res) => {
                setUsers(res.data)
                setSelectedUsers([])
                setIsLoading(false)
            })
        :
            null
    
    }, [showAddUser])
    
    useEffect(() => {
    
        tasklist_api.post(`/get_members`,{
            tasklist_id: tasklistid
        })
            .then((res) => {
                setUsers(res.data)
                setSelectedUsers([])
            })
    
    }, [reloadMembersAgain])
    
    useEffect(() => {
        if (users?.length > 0 && selectedUsers.length === users?.length) {
            setIsClicked(true)
        } else {
            setIsClicked(false)
        }
    }, [selectedUsers])
    
    return (
        <>
            {!isLoading ?
                userAccessLevel == 1 ?
                    showAddUser ?
                        <SettingsAddUser data={users} functionReturn={() => { setShowAddUser(!showAddUser); }} />
                        :
                        <ContainerMembers>
                            <div>
                                <Button className='addMemberButton' disabled={users.length > 0 ? false : true} functionButton={() => { setShowAddUser(true) }}>{t('Add member')}</Button>
                            </div>
                            <table className='tableMembers'>
                                <thead>
                                    <tr>
                                        <th>
                                            <input type='checkbox' onChange={() => { SelectMembers(), setIsClicked(!isClicked) }} checked={Boolean(isClicked)} />
                                        </th>
                                        <th>{t('Name')}</th>
                                        <th>E-mail</th>
                                        <th>{t('Role')}</th>
                                        <th>{t('Weekly e-mail')}</th>
                                    </tr>
                                
                                {selectedUsers.length !== 0 ?
                                        <th colSpan={5} className='thOptionsUser'>
                                            <HeaderTasklistOptions usingAt='members' axillarVar={selectedUsers} members={users} />
                                        </th> : null
                                    }
                                    </thead>
                                    <tbody className='tableMembersBody'>
                                        {users?.map((user, i) => {
                                            var idIsTheArrayUsers = false
                                            selectedUsers.find(element => element == user?.id) == undefined ? idIsTheArrayUsers = false : idIsTheArrayUsers = true
                                            return <MembersRow key={i} data={user} checked={Boolean(idIsTheArrayUsers)} functionAddUsersToArray={(a, value) => { CreateUserList(a, value) }} />
                                        })
                                        }
                                    </tbody>
                                </table>
                            <div
                                className='divHistory'
                            >
                                {isHistoryVisible ? <History type='3' setVisibilityFunction={setHistoryVisible}/> :
                                    <h5 onClick={() => setHistoryVisible(true)}>{t('Show History')}</h5>}
                            </div>
                        </ContainerMembers>
                    :
                    <ContainerMembers>
                        {users?.map((user, i) => {
                            var idIsTheArrayUsers = false
    
                            selectedUsers.find(element => element == user?.id) == undefined ?
                                idIsTheArrayUsers = false
                                :
                                idIsTheArrayUsers = true
    
                            return <MembersRow key={i} data={user} checked={Boolean(idIsTheArrayUsers)} functionAddUsersToArray={(a, value) => { CreateUserList(a, value) }} />
                        })
                        }
                    </ContainerMembers>
                :
                <Container>
                    <LoadingSpin />
                </Container>
            }
        </>
    )
}




// =============================================================================================================





function SettingsOptions({defaultData, refreshSettingsFunction}:SettingOptionsProps) {

    const { t } = useTranslation();
    const navigate = useNavigate()
    const { tasklistid } = useParams()
    const { setClickOutside, setTasklistsList, ReloadTasksAgain, clickOutside } = useContext(AppContext)
    //Initialize the states
    const [isLoading, setIsLoading, ] = useState(false)
    const [isWeeklyEmailed, setIsWeeklyEmailed] = useState(Boolean(defaultData.weekly_email))
    const [isArchived, setIsArchived] = useState(defaultData.active == ''? false: true)
    const [isHistoryVisible, setHistoryVisible] = useState(false);
    const [tasklistName, setTasklistName] = useState(defaultData.tasklist_name)
    const [tasklistProject, setTasklistProject] = useState<SelectOptionsProps>({ value: defaultData.project_id, label: defaultData.project_name })
    const [tasklistSubProject, setTasklistSubProject] = useState<SelectOptionsProps>({ value: defaultData.subproject_id, label: defaultData.subproject_name })
    const [tasklistNotification, setTasklistNotification] = useState<SelectOptionsProps>({ value: defaultData.notification_id, label: defaultData.notification_name })
    const [projectOptions, setProjectOptions] = useState<Array<SelectOptionsProps>>([{value: defaultData.project_id, label: defaultData.project_name}])
    const [subProjectOptions, setSubProjectOptions] = useState<Array<SelectOptionsProps>>([{value: defaultData.subproject_id, label: defaultData.subproject_name}])
    const [flag, setFlag] = useState(false)
    const [isInteractAndMentions, setIsInteractAndMentions] = useState(false)
    const [isNotifyAll, setIsNotifyAll] = useState(false)
    const [isDisableNotify, setIsDisableNotify] = useState(false)
    const notificationOptions = [
        { value: 1, label: t('Intercation and @mentions') },
        { value: 2, label: t('All Activity') },
        { value: 3, label: t('Disable All') },
    ];
    const { userAccessLevel, setUserAccessLevel, tasklistsList } = useContext(AppContext)

    useEffect(() =>{
        userAccessLevel != 1?
            setUserAccessLevel(tasklistsList.filter(t => t.tasklist_id == tasklistid)[0]?.role)
        :
            null
    },[])

    loadNotificationSettings()

    function loadNotificationSettings() {
        
    }

    useEffect(() => {
        tasklist_api.post('/get_user_data')
                .then(resp => {
                    setSettings(resp.data[0].notification_config)
                })
    }, []);

    function resetSubProject(){
        // setTasklistSubProject({value: 0, label: ""})
        tasklistSubProject.value = 0
        tasklistSubProject.label = "" 
        }
    
    function ChangeUserNotifyCfg(optionChanged: any){
        tasklist_api.put('/cfg_user_notification',{
        notification_config: optionChanged
        })
    }

    function setSettings(optionSelection: any){
        if (optionSelection==1) setInteract()
        else if (optionSelection==2) setIsNotify()
        else if (optionSelection==3) setIsDisable()
    }

    function setInteract(){
        setIsInteractAndMentions(true)
        setIsNotifyAll(false)
        setIsDisableNotify(false)
        // ChangeUserNotifyCfg(1)
    }

    function setIsNotify(){
        setIsInteractAndMentions(false)
        setIsNotifyAll(true)
        setIsDisableNotify(false)
        // ChangeUserNotifyCfg(2)
    }

    function setIsDisable(){
        setIsInteractAndMentions(false)
        setIsNotifyAll(false)
        setIsDisableNotify(true)
        // ChangeUserNotifyCfg(3)
        }

    async function EditTasklist() {
        setIsLoading(true)

        const data = {
            tasklist_id: tasklistid,
            name: tasklistName != defaultData.tasklist_name? tasklistName : defaultData.tasklist_name,
            project_id: tasklistProject.value != defaultData.project_id? tasklistProject.value : defaultData.project_id,
            subproject_id: tasklistSubProject.value != defaultData.subproject_id? tasklistSubProject.value : defaultData.subproject_id,
            notification_id: tasklistNotification.value != defaultData.notification_id? tasklistNotification.value : defaultData.notification_id,
            weekly_email: isWeeklyEmailed != Boolean(defaultData.weekly_email)? isWeeklyEmailed: Boolean(defaultData.weekly_email),
            active: isArchived != Boolean(defaultData.active)? isArchived: Boolean(defaultData.active)
        }

        tasklist_api.put('/tasklist', data)
            .then(() => {
                setFlag(!flag)
                setIsLoading(false)
            })
    }

    async function DeleteTasklist() {
        var response = confirm(`${t('Are you sure that you want to delete the tasklist')} ${defaultData.tasklist_name}?`)

        if (response == true) {

            await tasklist_api.post('/delete_tasklist',{
                tasklist_id: tasklistid
            })
                .then(() => {
                    navigate('/', { replace: true })
                }).catch(() => {
                    navigate('/', { replace: true })
                })
        }
    }

    function SaveModifications() {
        EditTasklist(),
        setClickOutside(false)
        ReloadTasksAgain()
        refreshSettingsFunction(Math.random())
    }

    useEffect(() => {
        tasklist_api.post('/get_projects')
            .then((res) => {
                var projectOptionsTemp: Array<SelectOptionsProps> = []
                res.data.map((po: ProjectProps) => projectOptionsTemp.push({ value: po.project_id, label: po.project_name }))
                setProjectOptions(projectOptionsTemp)
            })
    }, []);

    useEffect(() => {
        tasklist_api.post('/get_subprojects',{
            project_id: tasklistProject.value,
        }).then((res) => {
            var subProjectOptionsTemp: Array<SelectOptionsProps> = []
            res.data.map((spo: SubProjectProps) => subProjectOptionsTemp.push({ value: spo.id, label: spo.subproject_name }))
            setSubProjectOptions(subProjectOptionsTemp)
        })
    }, [tasklistProject]);

    // useEffect(() => {
    //     tasklist_api.post('/get_notifications',{
    //         project_id: tasklistProject.value,
    //     }).then((res) => {
    //         var subProjectOptionsTemp: Array<SelectOptionsProps> = []
    //         res.data.map((spo: SubProjectProps) => subProjectOptionsTemp.push({ value: spo.id, label: spo.subproject_name }))
    //         setSubProjectOptions(subProjectOptionsTemp)
    //     })
    // }, [tasklistProject]);

    useEffect(() => {
        tasklist_api.post('/get_tasklist_lists').then(res => { setTasklistsList(res.data) })
    }, [flag])

    return (
        <ContainerOptions>
            {userAccessLevel == 1 ?
                <>
                    <div className='SettingsOptions'>
                        <h1>{t('General')}</h1>
                        <div className='ListNameRow'>
                            <div>
                                <label htmlFor='tasklistNameInput'>{t('List Name')}:   </label>
                            </div>
                            <span className='spanSelect'>
                                <input className='tasklistNameInput' type='text' onChange={e => setTasklistName(e.target.value)} defaultValue={defaultData.tasklist_name}></input>
                            </span>
                        </div>
                        <h2>{t('Project Association')}</h2>
                        <div className='AssociationTopic'>
                            <div>
                                <label htmlFor='projectSelect'>{t('Project')}:</label>
                            </div>
                            <span className='spanSelect'>
                                <Select
                                    id='projectSelect'
                                    options={projectOptions}
                                    defaultValue={tasklistProject}
                                    placeholder={t('Select') + '...'}
                                    isMulti={false}
                                    isSearchable
                                    onChange={(e: any) => (setTasklistProject(e), resetSubProject())}                                        
                                />
                            </span>
                        </div>
                        <div className='AssociationTopic'>
                            <div>
                                <label htmlFor='subprojectSelect'>{t('Sub-Project')}: </label>
                            </div>
                            <span className='spanSelect'>
                                <Select
                                    id='subprojectSelect'
                                    options={subProjectOptions}
                                    placeholder={t('Select') + '...'}
                                    defaultValue={tasklistSubProject}
                                    isMulti={false}
                                    isSearchable
                                    onChange={(e: any) => setTasklistSubProject(e)}                                   
                                />
                            </span>
                        </div>
                    </div>

                    <div id='Email'>
                        <h2>Email</h2>
                        <div>
                            <label htmlFor='weeklyEmailSwitch'>{t('Weekly Email')}: {<ButtonSwitch id='weeklyEmailSwitch' checked={isWeeklyEmailed} functionButtonSwitch={() => clickOutside == true ? setIsWeeklyEmailed(!isWeeklyEmailed) : null} />}</label>
                        </div>
                    </div>
                </>
                :
                null             
            }
            
            <div className='containerEmailWeekly'>
                <h2>Email</h2>
                <div>
                    <label htmlFor='weeklyEmailSwitch'>{t('Weekly Email')}: {<ButtonSwitch id='weeklyEmailSwitch' checked={isWeeklyEmailed} functionButtonSwitch={() => clickOutside == true ? setIsWeeklyEmailed(!isWeeklyEmailed) : null} />}</label>
                </div>
            </div>
            <div id='Notification'>
                <h2>{t('Notification')}</h2>
                <div className='AssociationTopic'>
                    <div>
                        <label htmlFor='notificationSelect'>{t('Coverage')}: </label>
                    </div>
                    <span className='spanSelect'>
                        <Select
                            id='notificationSelect'
                            options={notificationOptions}
                            placeholder={t('Select') + '...'}
                            defaultValue={{ label: defaultData?.notification_name, value: defaultData?.notification_id }}
                            isMulti={false}
                            isSearchable
                            onChange={(e: any) => {setSettings(e.value)}}
                        />
                    </span>                   
                </div>
            </div>

            {userAccessLevel == 1 ?
            <>
                <div className='Critical'>
                <h1>{t('Critical')}</h1>
                <div className='taskListArchive'>{t('Archive List (Be careful, the list will be read only while it is archived) ')}
                    <ButtonSwitch checked={!isArchived} functionButtonSwitch={() => (setIsArchived(!isArchived))} />
                </div>
                <p>{t('Delete List (Be careful, this action cannot be undone)')}
                </p>
                    <div>
                        <Button variant='red' functionButton={() => DeleteTasklist()}>{t('Delete')}</Button>
                        <Button functionButton={() => (SaveModifications())} variant={'green'}>{isLoading == true ? <Spin /> : t('Save')}</Button>
                    </div>
            </div>
                <div id='ModalBottom'>
                    <div
                        className='divHistory'    
                    >
                        {isHistoryVisible ? <History type='2' setVisibilityFunction={setHistoryVisible} /> :
                            <h5 onClick={() => setHistoryVisible(true)}>{t('Show History')}</h5>}
                    </div>
                </div>
            </>
            :
            null
            }    
            
        </ContainerOptions>
    )
}




// =============================================================================================================





function TrashRow({ data, i, selectedTasks, setSelectedTasks }: rowProps) {
    const { t } = useTranslation();

    function AddOrRemoveToList(id: number, value: boolean) {
        var selectedUsersTemp = selectedTasks
        var idIsTheArrayTasks = false
        selectedTasks.find(element => element == id) == undefined ? idIsTheArrayTasks = false : idIsTheArrayTasks = true
        if (value == true && !idIsTheArrayTasks) {
            selectedUsersTemp = [...selectedTasks, id]
            setSelectedTasks(selectedUsersTemp)
            return
        }
        if (value == false && idIsTheArrayTasks) {
            selectedUsersTemp = selectedTasks.filter((element) => element !== id)
            setSelectedTasks(selectedUsersTemp)
            return
        }
    }

    return (
        <ContainerRow key={i} status={data.status} isChecked={selectedTasks?.includes(data.id) ? true : false}>
            <td className='tdColor' onClick={() => { }}><div></div></td>
            <td className='tdId' onClick={() => { }}> {data.id.toString()}</td>
            <td className='tdCheckBox' ><input id='inputCheckBox' type='checkbox' onChange={e => { AddOrRemoveToList(data.id, e.target.checked) }} checked={selectedTasks.includes(data.id) ? true : false} /></td>
            <td className='tdStatus' onClick={() => { }}>{data.status == 1 ? t('Opened') : t('Closed')}</td>
            <td className='tdDateDeleted' onClick={() => { }}>
                {data.date_deleted ? moment(data.date_deleted.toString()).format('DD/MM/YYYY') : ''}
            </td>
            <td className='tdLocation' onClick={() => { }}> {data.location_name}</td>
            <td className='tdDescription' onClick={() => { }}>{data.description}</td>
            <td className='tdArchive'><span></span></td>
            <td className='tdDateOpened' onClick={() => { }}>
                {data.date_opened ? moment(data.date_opened.toString()).format('DD/MM/YYYY') : ''}
            </td>
            <td className='tdOwner' onClick={() => { }}>{data.owner_name}</td>
            <td className='tdDueDates' onClick={() => { }}>
                <div >
                    {data.due_dates?.map((date, i) => {
                        return (date.dueDate ?
                            <span key={i}>{moment(date.dueDate.toString()).format('DD/MM/YYYY')}</span>
                            :
                            ''
                        )
                    })}
                </div>
            </td>
            <td className='tdAssignedTo' onClick={() => { }}>
                {data.assigned?.map((user, i) => {
                    return (
                        user?.employee_name != ' ' ? //Check if the variable isn't empty
                            <span key={i}><img src={userIcon} height={12} alt=''/>{user.employee_name}</span> //If it isn't the line is rendered
                            :
                            ''
                    )
                })
                }
            </td>
            <td className='tdComments' onClick={() => { }}>{data.comments?.map((comment, i) => {
                const commentStatic = '**' + comment.employee_name + '** : ' + comment.comment
                return (
                    <div key={i}>

                        <ReactMarkdown children={commentStatic}></ReactMarkdown>
                        <h6>{moment(comment.timestamp?.toString()).format('l')}</h6>
                    </div>
                )
            })}</td>
        </ContainerRow>
    )
}




// =============================================================================================================




function SettingsTrash({dataSettings}:SettingsTrashProps){
    //get the URL parameter
    const { tasklistid } = useParams()
    const { reloadAgain } = useContext(AppContext)
    //this is for translations
    const { t } = useTranslation();
    const [tasksDeleted, setTasksDeleted] = useState<Array<taskProps>>([])
    const [newTaskLoading, setNewTasksLoading] = useState<boolean>(false) 
    const [selectedTasks, setSelectedTasks] = useState<Array<number>>([])
    const [lastPageFlag, setLastPageFlag] = useState(false)
    const [flag, setFlag] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isHistoryVisible, setIsHistoryVisible] = useState(false)
    const [pageNumber, setPageNumber] = useState(2)
    const limit = 25

    let selectedUsersTemp: Array<number> = []

    function SelectDeletedTasks() {
        if (selectedTasks.length != tasksDeleted.length) {
            tasksDeleted?.map(data => { data && data.deleted == 'true'? selectedUsersTemp.push( data.id):null })
            setSelectedTasks(selectedUsersTemp)
        } else {
            setSelectedTasks([])
        }
        return selectedUsersTemp
    }

    useEffect(() => {

        setIsLoading(true)

        tasklist_api.post('/get_tasklist',{
                tasklist_id: tasklistid,
                _limit: limit,
                _page: 1,
                filters: [{
                    field: 'deleted',
                    value: ['true']
            }],
                ordinations: [{field: '.', value: 0}, {field: '.', value: 0}]
            }

        )
            .then((res) => {
                setTasksDeleted(res.data.tasks)
                setIsLoading(false)
            })
    }, [])

    useEffect(() => {
        var scrollTop  = document.getElementById('divBody')?.scrollTop //get scroll position
        var scrollHeight = document.getElementById('divBody')?.scrollHeight //get scroll size
        var clientHeight = document.getElementById('divBody')?.clientHeight //get scroll offset

        scrollTop && scrollHeight && clientHeight && Math.floor(scrollTop)  >= (scrollHeight - clientHeight - 20) && !newTaskLoading? 
        (
            !lastPageFlag? setNewTasksLoading(true) : setNewTasksLoading(false),
            tasklist_api.post('/get_load_tasks',{
                _limit: limit,
                _page: pageNumber,
                tasklist_id: tasklistid,
                filters: [{
                    field: 'deleted',
                    value: ['true']
            }],
            ordinations: [{field: '.', value: 0}, {field: '.', value: 0}]
            })
            .then(res => (
                tasksDeleted.length >= 1 && res.data.tasks.length >= 1 ? 
                res.data.tasks.forEach((nt:taskProps) => ((tasksDeleted.map(et => et.id).includes(nt.id) == false ? tasksDeleted.push(nt) : null)), setPageNumber(pageNumber + 1)) 
                :  
                setNewTasksLoading(false), res.data.tasks.length < limit? setLastPageFlag(true):setLastPageFlag(false)
            ))
            .then(() => setNewTasksLoading(false)))
        :
        null
    }, [flag])//load new tasks after scroll end

    useEffect(() => {
        setIsLoading(true)
        tasklist_api.post('/get_tasklist',{
            tasklist_id: tasklistid,
            _limit: limit,
            _page: 1,
            filters: [{
                field: 'deleted',
                value: ['true']
        }],
            ordinations: []
        }
    )
        .then((res) => {
            setTasksDeleted(res.data.tasks)
            setIsLoading(false)
        })
    }, [tasklistid, reloadAgain])

    return (
        <ContainerTrash>
            {!isLoading ?
                <>
                    <div className='containerTableTrash' onScroll={() => setFlag(!flag)}>
                        {tasksDeleted.length > 0 ?
                            <table className='tableTrash'>
                                <thead>
                                    <tr>
                                        <th style={{paddingRight: 0, visibility:'hidden'}} >.</th>
                                        <th>{t('Id')}</th>
                                        <th><input type='checkbox' onChange={() => { SelectDeletedTasks() }} checked={selectedTasks.length == tasksDeleted.length ? true : false}></input></th>
                                        <th>{t('Status')}</th>
                                        <th>{t('Date Deleted')}</th>
                                        <th>{t('Location')}</th>
                                        <th>{t('Description')}</th>
                                        <th>{t('Archive')}</th>
                                        <th>{t('Date Opened')}</th>
                                        <th>{t('Owner')}</th>
                                        <th>{t('Due Date')}</th>
                                        <th>{t('Assigned To')}</th>
                                        <th>{t('Comments')}</th>
                                    </tr>
                                    {selectedTasks.length > 0 ?
                                        <tr >
                                            <th colSpan={13} className='thOptionsTrash'>
                                                <HeaderTasklistOptions usingAt='trash' axillarVar={selectedTasks} dataSettings={dataSettings} />
                                            </th>
                                        </tr>
                                        : null}
                                </thead>
                                <tbody>
                                    {
                                        tasksDeleted.map((data, i) => {
                                            return (Boolean(data.deleted) == true? <TrashRow i={i} data={data} setSelectedTasks={(o) => { setSelectedTasks(o) }} selectedTasks={selectedTasks} /> : null)
                                        })
                                    }
                                </tbody>
                            </table>
                            :
                            <p>{t('There are no tasks deleted')}</p>
                        }
                    </div>
                </>
                :
                <div className='divLoadingSpin'>
                    <LoadingSpin/>
                </div>

            }
            <div
                className='divHistory'
            >
                {isHistoryVisible ? <History setVisibilityFunction={setIsHistoryVisible}/> :
                    <h5 onClick={() => setIsHistoryVisible(true)}>{t('Show History')}</h5>}
            </div>
        </ContainerTrash>
    )
}

