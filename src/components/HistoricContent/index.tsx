import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import moment from 'moment';

import tasklist_api from '../../services/tasklist_api';
import { LoadingSpin } from '../../util/LoadingSpin';
import { Container } from './styles'
import { HistoryItem, taskProps } from '../../lib/interfaces';
import { Spin } from '../../util/Spin';
import { ModalEditTask } from '../ModalEditTask';

import CircleSolidIcon from '../../assets/icons/circleSolidIcon.svg'

/*########################################################## 
***Version

    230427  MAS                 Initial Version

***Description***

    component SubHeader

***Props***
    closeOrOpenSideBar         Function for verification if side bar is open
    isOpen                     Verify if side bar is open
    flag                       Check historic flag props

##########################################################*/

interface SliderHistoricProps{
    flag: boolean;
}

export function HistoricContent({flag}:SliderHistoricProps){
    const { t } = useTranslation()
    const { tasklistid } = useParams()
    const [histories, setHistories] = useState<Array<HistoryItem>>([])
    
    const [taskDataModal, setTaskDataModal]  = useState<taskProps|undefined>()
    const [loadingHistoric, setIsLoadingHistoric] = useState(false)
    // const [flag, setFlag] = useState(false)
    const [timeFlag, setTimeFlag] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [lastPageFlag, setLastPageFlag] = useState(false)
    const limit = 15
    const userLang = navigator.language
    const [showOrHideModalEditTask, setShowOrHideModalEditTask] = useState(false)
    
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

    //Enable historic task edits
    function OpenHistoryEditTask(tasklist_id:string, task_id:string ) {
        const data = {
            task_id: task_id,
            tasklist_id: tasklist_id
        }

        tasklist_api.post('/get_task', data)
            .then((res) => {
                setTaskDataModal(res.data[0])
            })
            .then(() => {
                
            })
            setShowOrHideModalEditTask(true)
    }
    useEffect(() => {
        setTimeout(() => setTimeFlag(true), 2000)
        tasklist_api.post('/get_histories',{
                _limit: limit,
                _page: 1,
                type: 1,
                tasklist_id: tasklistid
            })
            .then((res) => {
                setHistories(res.data)
            })
    }, [])

    useEffect(() => {
        var clientHeight = document.getElementById('contentSidebar')?.clientHeight
        var scrollHeight = document.getElementById('contentSidebar')?.scrollHeight
        var scrollTop  = document.getElementById('contentSidebar')?.scrollTop


        scrollTop && scrollHeight && clientHeight && Math.ceil(scrollTop)  >= (scrollHeight - clientHeight - 50) && !loadingHistoric ? 
        (
            !lastPageFlag? setIsLoadingHistoric(true):setIsLoadingHistoric(false), 
            tasklist_api.post('/get_histories',{
                _limit: limit,
                _page: pageNumber,
                type: 1,
                tasklist_id: tasklistid
            })
            .then(res => (
            histories.length >= 1 && res.data.length >= 1? 
                res.data.forEach((nt:HistoryItem) => ((histories.map(et => et.log_id).includes(nt.log_id) == false ? histories.push(nt) : null), setIsLoadingHistoric(false)), setPageNumber(pageNumber + 1)) 
            : 
            null
        ,res.data.length < limit ? setLastPageFlag(true):setLastPageFlag(false))))
        :
        null
    }, [flag])
    return(
        <>
            
                
                    <Container>
                                
                                {histories.length > 0 ? // check if there is history in the task
                                    //maps and creates the components that display the task histories
                                    histories.map((history, _) => {
                                        return (
                                            <div key={history.log_id} className='divHistoryLogs'>
                                                <div className='divHistoryLog'>
                                                    <h4>
                                                        <span>{`${t(history.log)} ${t('by')}`}</span>
                                                        {history.employee_name}
                                                    </h4>
                                                </div>
                                                <div className='divLinkToModal'>
                                                    <a onClick={() => OpenHistoryEditTask(history.tasklist_id, history.task_id)}>
                                                        <img src={CircleSolidIcon} alt='blue circle' />
                                                        <span>{history.task_id != "0" ? history.task_id + " - " + history.task_description : t('Deleted task') }</span>
                                                    </a>
                                                    <small>{moment(history.timestamp).fromNow()}</small>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <div id='divLoading'>
                                    {timeFlag == false? <LoadingSpin/> : <h3>{t('There is no historic to show')}</h3>}
                                </div>
                                }
                            {loadingHistoric? <Spin/>:<></>}
                            
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