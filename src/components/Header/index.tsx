import { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { destroyCookie, parseCookies } from 'nookies';

import Select from 'react-select';

import tasklist_api from '../../services/tasklist_api';
import { AppContext } from '../../services/context';
import { Button } from '../../util/Button'
import { ButtonIcon } from '../../util/ButtonIcon';
import { TasklistContainer } from '../TasklistContainer'
import { ModalCreateNewTasklist } from '../ModalCreateNewTasklist';
import { Container } from './style'
import { SideBarRight } from '../SideBarRight';
import { SideBarLeft } from '../SideBarLeft';
import { Spin } from "../../util/Spin"


/*########################################################## 
***Version

    220602  LVM                 Initial Version
    221223  MAM                 Refactoring
    230505  BFG                 Include ButtonIcon component

***Description***

    component Header, 
        Contain the header with LeftSideBar and RightSideBar calls
        
***Props***
    HandleNotificationsSideBar  The function of the Notification Side Bar
    isOpen                      If the task is open or not

##########################################################*/

interface HeaderProps{
    HandleNotificationsSideBar: () => void;
    HandleDarkMode: () => void;
    CloseRightSideBar: () => void;
    isOpen: boolean;
} 

export function Header({HandleNotificationsSideBar, CloseRightSideBar, HandleDarkMode, isOpen}:HeaderProps) {

    const { t } = useTranslation();
    const navigate = useNavigate()
    const { tasklistid } = useParams()
    const {userName, setCheckedTasksList, userPortalLogo, setUserPortalLogo, tasklistsList, setAtmFlag} = useContext(AppContext)
    // Initialize the states
    const [isSlideBarActive, setIsSlideBarActive] = useState(false)
    const [portalsLoading, setPortalsLoading] = useState<boolean>(true)
    const {setClientId, clients, setClients, userPhoto } = useContext(AppContext)
    const [isModalActive, setIsModalActive] = useState(false)
    const [userMenuFlag, setUserMenuFlag] = useState(false)

    const [notificationsNumber, setNotificationsNumber] = useState(0)
    const [isDarkMode, setDarkMode] = useState<boolean>(false)
        
    const { 'tasklist.portal': portal } = parseCookies();

    //Sets sidebar active
    function SideBarActive() {
        setIsSlideBarActive(true)
    }

    //Sets sidebar not active
    function SideBarNotActive() {
        setIsSlideBarActive(false)
    }

    //Resets modal activity
    function HandleSetResetModalActive() {
        setIsModalActive(!isModalActive)
    }

    //Log out the user
    function LogOut() {
        destroyCookie(null, 'tasklist.token')
        destroyCookie(null, 'tasklist.portal')
        setUserPortalLogo('')
        navigate('/login', {replace: true})
    }

    //Closes the side bar
    function closeSideBar(){
        if(isOpen === true){
            HandleNotificationsSideBar
        }
    }

    useEffect(() => {
        setCheckedTasksList([])
        window.location.pathname.includes('/login')? 
            destroyCookie(null, 'tasklist.token') 
            :
            tasklist_api.post('/get_notifications_number')
                .then(res => (setNotificationsNumber(res.data[0].numberOfNotifications)))
            SideBarNotActive()

    }, [window.location.pathname, isOpen])

    
    return (
        <>
            <Container onClick={closeSideBar}>
                <div className='SideBarLeft'>
                    <ButtonIcon functionButtonIcon={SideBarActive} IconType={'BsList'}/>
                    <SideBarLeft OpenSideBar={SideBarNotActive} 
                    isOpen={isSlideBarActive} 
                    HandleSetResetModalActive={HandleSetResetModalActive}
                    CloseRightSideBar={CloseRightSideBar}/>
                </div>
                <div className='appTitle' onClick={() => (setAtmFlag(0), CloseRightSideBar())}>
                    <Link to={'/'}>        
                        <ButtonIcon IconType={'portalLogoIcon'}/> 
                        <div>   
                            {portal == 'info'? 'Informi' : `${portal.charAt(0).toUpperCase()}${portal.slice(1, portal.length)}`}
                        </div>
                    </Link>
                    <h4>
                        {
                            tasklistsList?.filter(tl => tl.tasklist_id == tasklistid).length > 0 ? 
                                `-> ${tasklistsList.filter(tl => tl.tasklist_id == tasklistid)[0].tasklist_name}`
                            : window.location.pathname.includes('tasksAssignedToMe')?
                                `-> ${t('Tasks Assigned To Me')}`  
                            : 
                                ''
                        }
                    </h4>
                </div>
                <div className='infoUserButtonIcon'>
                <span id="portal">
                    <label className='LabelChangePortal'>Portal: </label>
                    {/* If the user has access to more than one portal shows a select 
                        box with the portal options,otherwise shows the portal name */}
                    {
                        portalsLoading?
                            clients.length == 1?
                                
                                <select disabled className="PortalName">                                   
                                    <option key={clients[0].client_id} value={clients[0].client_name}>
                                        {clients[0].client_name}
                                    </option>
                                </select>
                            :
                            <select className="PortalName" onChange={e => (setClientId(Number(e.target.value)))} >
                                {clients.map(client => 
                                        <option key={client.client_id} value={client.client_id}>
                                            {client.client_name}
                                        </option>
                                    )
                                }
                            </select>
                        :
                            <Spin/>
                    }
                        
                </span>
                <div>
                    <ButtonIcon functionButtonIcon={HandleNotificationsSideBar} IconType={'BsInfoCircle'}/>
                    <ButtonIcon functionButtonIcon={() => setUserMenuFlag(!userMenuFlag)} IconType={'BsPersonCircle'}/> 
                </div>
                                                
                    {
                        userMenuFlag? 
                        
                            <div className='UserMenu'>
                                
                                <h5><b>{t('Signed as')}:</b></h5>
                                <p>{userName}</p>

                                {/* <SwitchButton
                                id='DarkMode'
                                checked={isDarkMode}
                                functionSwitchButton={() => {
                                    HandleDarkMode();
                                    setDarkMode(!isDarkMode)
                                    }
                                } /> */}

                                <a id='logoutButton' href='#' onClick={() => LogOut()}>{t('Logout')}</a>
                            </div>
                        :
                            <></>
                    }
                </div>
                
            </Container>
            <SideBarRight HandleNotificationsSideBar={HandleNotificationsSideBar} isOpen={isOpen} />
            {isModalActive ?
                <ModalCreateNewTasklist functionCloseOpenModal={() => HandleSetResetModalActive()} sideBarState={() => SideBarNotActive()} />
                :
                null
            }
            {/*Render child router components*/}
            <Outlet />
        </>
    )
}

