
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import tasklist_api from '../../services/tasklist_api';
import { AppContext } from '../../services/context';
import { Notification } from '../Notification';
import  {ModalEditTask}  from '../ModalEditTask';
import { Container } from './styles';
import { NotificationsProps, taskProps } from '../../lib/interfaces';
import { Spin } from '../../util/Spin';
// import { ModalBody, ModalTop, Modal } from '../ModalGeneric';

/*############################################################### 
***Version

    220823  MAM                 Initial Version

***Description***

    component ModalNotifications, contain the users notifications

***Props***
    functionCloseOpenModal      Set the modal visibility
    flag                        If there is any notification

#################################################################*/

interface NotificationsContentProps{
    flag: boolean;
}

export function NotificationsContent({flag}:NotificationsContentProps) {
    const { t } = useTranslation()
    const { userId } = useContext(AppContext)
    //Initialize the states
    const [taskDataModal, setTaskDataModal]  = useState<taskProps|undefined>()
    const [notifications, setNotifications] = useState<Array<NotificationsProps>>([])
    const [loadingNotifications, setIsLoadingNotifications] = useState(false)
    const [showOrHideModalEditTask, setShowOrHideModalEditTask] = useState(false)
    // const [flag, setFlag] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [lastPageFlag, setLastPageFlag] = useState(false) 
    const limit = 20

    //Read the selected notification
    function ToReadNotification(notification: NotificationsProps) {
        tasklist_api.put(`/notifications`, {
            id: notification.id,
        })
    }

    // Uncomment for when notifications_all_read function is created
    //Mark all notifications as read
    // function ToReadAllNotifications(){
    //     tasklist_api.post('/notifications_all_read',{
    //         user_id: userId
    //     })
    // }
    
    
    //Open the correct task for the notification in Modal Edit Task
    function OpenNotifEditTask(tasklist_id:string, task_id:string ) {
        const data = {
            task_id: task_id,
            tasklist_id: tasklist_id
        }

        tasklist_api.post('/get_task', data)
            .then((res) => {
                setTaskDataModal(res.data[0])
            })
            .then(() => {
                setShowOrHideModalEditTask(!showOrHideModalEditTask)
            })
    }

    useEffect(() => {
        var clientHeight = document.getElementById('contentSidebar')?.clientHeight
        var scrollHeight = document.getElementById('contentSidebar')?.scrollHeight
        var scrollTop  = document.getElementById('contentSidebar')?.scrollTop
        
        scrollTop && scrollHeight && clientHeight && Math.ceil(scrollTop)  >= (scrollHeight - clientHeight - 50) && !loadingNotifications ? 
        (
            !lastPageFlag? setIsLoadingNotifications(true):setIsLoadingNotifications(false), 
            tasklist_api.post('/get_notifications',{
                _limit: limit,
                _page: pageNumber,
                gen_employee_id: userId
            })
            .then(res => (
            notifications.length >= 1 && res.data.length >= 1? 
                res.data.forEach((nt:NotificationsProps) => ((notifications.map(et => et.id).includes(nt.id) == false ? notifications.push(nt) : null), setIsLoadingNotifications(false)), setPageNumber(pageNumber + 1)) 
            : 
            null
        ,res.data.length < limit ? setLastPageFlag(true):setLastPageFlag(false))))
        :
        null
    }, [flag])

    useEffect(() => {
        const data = {
            _limit: 20,
            _page: 1,
            gen_employee_id: userId
        }
        tasklist_api.post('/get_notifications', data)
            .then((res) => {
                setNotifications(res.data)
            })

    }, [])

    return (
        <>
            <Container>
                    {/*  Uncomment for when notifications_all_read function is created
                        <Button id='buttonMarkWhithRead' functionButton={ToReadAllNotifications}>{t('Mark all as read')}</Button> */}
                        {notifications?.map((notification, i) =>
                            <Notification
                                key={i}
                                data={notification}
                                clickFunction={() => ToReadNotification(notification)}
                                linkFunction={() => OpenNotifEditTask(notification.tasklist_id, notification.task_id)}
                                />
                        )}
                        {loadingNotifications? <Spin/>:<></>}
                    
            </Container>
            <>
                {showOrHideModalEditTask ?
                    taskDataModal?
                        //null
                        <ModalEditTask functionCloseOpenModal={() => setShowOrHideModalEditTask(!showOrHideModalEditTask)} dados={taskDataModal}/>
                        :
                        null
                    :
                    null
                }
            </>
        </>
    )
}