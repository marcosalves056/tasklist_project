import { useContext, useEffect, useState } from 'react'
import { ButtonClose } from '../../util/ButtonClose'
import { useTranslation } from 'react-i18next';
import { BsInfoCircle } from 'react-icons/bs';

import tasklist_api from '../../services/tasklist_api';
import { Container, SideBar } from './styles'
import { HistoricContent } from '../HistoricContent';
import { NotificationsContent } from '../NotificationsContent';
import { AppContext } from '../../services/context';

/*########################################################## 
***Version

    230427  MAS                 Initial Version

***Description***

    component SubHeader

***Props***
    closeOrOpenSideBar         Function for notification bar visibility
    isOpen                     Verify if side bar is open

##########################################################*/

interface SideBarRightProps{
    HandleNotificationsSideBar: () => void ; 
    isOpen: boolean;
}

export function SideBarRight({HandleNotificationsSideBar, isOpen}:SideBarRightProps){
    const { t } = useTranslation()
    const { userId } = useContext(AppContext)

    const [isHistoric, setIsHistoric] = useState(false)
    const [isNotification, setIsNotification] = useState(true)
    const [numberOfNotifications, setNotificationsNumber] = useState('')
    const [flagNotifications, setFlagNotfications] = useState(false)
    const [flagHistoric, setFlagHistoric] = useState(false)
    const [pathInvocation, setPathInvocation] = useState(false)


    //Set notifications and historic in NotificationBar
    function handleNav(opt:string){
            setIsHistoric(!isHistoric)
            setIsNotification(!isNotification)
    }

    //Set historic flag and notification
    function setFlagReload(){
        if(isHistoric){
            setFlagHistoric(!flagHistoric)
            setFlagNotfications(false)
        }else{
            setFlagHistoric(false)
            setFlagNotfications(!flagNotifications)
        }
    }

    useEffect(() => {
        tasklist_api.post('/get_notifications_number')
                .then(res => (setNotificationsNumber(res.data[0].numberOfNotifications)))

    }, [])

    useEffect(() => {
        const pathModify = (window.location.pathname).split('/')
        setPathInvocation((pathModify[1] == 'tasklist') || (pathModify[2] == 'tasklist'))

    }, [isOpen])

    return(
        <>
            <Container className={isOpen ? 'isOpen' :  ''}>
                    <SideBar>
                        <div className='headerSideBar'>
                            <div className='titleSideBar'>
                                <BsInfoCircle className='icons'/><h3>Informações</h3>
                            </div>
                            <div className='buttonCloseRightSidebar'>
                                <ButtonClose functionButtonClose={HandleNotificationsSideBar}/>
                            </div>
                        </div>
                        
                            {pathInvocation ?
                            <nav className=''>
                                <div onClick={() => {handleNav('h')}} className={isHistoric ? 'selectedNav headerSideBar': 'navNotSelected headerSideBar'}>
                                    <h4>{t('Historic')}</h4>
                                </div>
                                <div onClick={() => {handleNav('n')}} className={isNotification ? 'selectedNav headerSideBar' : 'navNotSelected headerSideBar'}>
                                    <div className='notificationButton'><h4>{t('Notification')}</h4><div className='containerBadge'><span className='badge'>{numberOfNotifications}</span></div></div>
                                </div>
                            </nav>
                            :
                            <nav className='oneOption'>
                                <div onClick={() => {handleNav('n')}} className={isNotification ? 'selectedNav headerSideBar' : 'navNotSelected headerSideBar'}>
                                    <div className='notificationButton'><h4>{t('Notification')}</h4><div className='containerBadge'><span className='badge'>{numberOfNotifications}</span></div></div>
                                </div>
                            </nav>
                            }
                        <div id='contentSidebar' onScroll={()=>setFlagReload()}>
                            {isNotification ?
                                <NotificationsContent flag={flagNotifications}/>
                                :<HistoricContent flag={flagHistoric} />
                            }
                        </div>
                    </SideBar>
            </Container>
        </>
    )
}