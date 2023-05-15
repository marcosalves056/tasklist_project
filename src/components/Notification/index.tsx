import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import { Container } from './styles';
import { NotificationsProps } from '../../lib/interfaces';

import ListCheckIcon from '../../assets/icons/listCheckIcon.svg'
import CircleSolidIcon from '../../assets/icons/circleSolidIcon.svg'

/*############################################################### 
***Version

    220823 MAM                 Initial Version
    220829 LVM                 Adjusts to Work 

***Description***

    component Notifications, shows the notifications to the user

***Props***
    data                        The notification source
    clickFunction               Fired when the notification is clicked
    linkFunction                Fired when the tasklist link is clicked
    functionCloseModal          Sets the modal visibility

#################################################################*/

interface NotificationChildProps {
    data: NotificationsProps
    clickFunction?: () => void
    linkFunction: () => void
    functionCloseModal?: () => void
}

export function Notification({ data, clickFunction, linkFunction, functionCloseModal }: NotificationChildProps) {

    const { t } = useTranslation()
    let navigate = useNavigate()
    let date = moment(new Date(data.timestamp)).toISOString()
    const [state, setState] = useState(false)

    const userLang = navigator.language
    const relativeTimeTranslation = userLang.includes('pt')?{
        relativeTime : {
            future : 'daqui %s',
            past : '%s atrás',
            s : 'segundos',
            m : 'um minuto',
            mm : '%d minutos',
            h : 'uma hora',
            hh : '%d horas',
            d : 'um dia',
            dd : '%d dias',
            M : 'um mês',
            MM : '%d meses',
            y : 'um ano',
            yy : '%d anos'
        }
    } :userLang.includes('es') ?{
        future : 'en %s',
        past : 'hace %s',
        s : 'segundos',
        m : 'un minuto',
        mm : '%d minutos',
        h : 'una hora',
        hh : '%d horas',
        d : 'un día',
        dd : '%d días',
        M : 'um mes',
        MM : '%d meses',
        y : 'um año',
        yy : '%d año'
    }: {}
    moment.locale(userLang, relativeTimeTranslation)

    //Goes to notification task
    function navigateTo() {
        // functionCloseModal()
        navigate(`tasklist/${data.tasklist_id}`)
    }

    useEffect(() => {
        data.read? setState(true):null
    }, [])

    return (
        <Container onClick={clickFunction} onMouseDown={() => setState(true)}>
            {!data.read && !state ?
                <div id='colorIndicator'/>
                :
                null
            }
            <div id='content'>

                <div id='notificationText'>

                    <h4 className='userName'>{data.name}</h4>
                    <span>{t(data.message)}</span>

                </div>

                <div id='notificationLocation'>

                    <span id='spanLinks'>
                        <a id='a_tasklist' onClick={() => { navigateTo() }}>
                            <h4>
                                <img src={ListCheckIcon} alt='tasklist icon' />{data.tasklist_name}
                            </h4>
                        </a>

                        <a id='a_taskModal' onClick={() => linkFunction()}>
                            <span>
                                <img src={CircleSolidIcon} alt='blue circle' />
                                <p>{`${data.task_id} - ${data.task_name}`}</p>
                            </span>
                        </a>
                    </span>

                    <span id='span_date'>{moment(date).fromNow()}</span>

                </div>

            </div>
        </Container>
    )
}