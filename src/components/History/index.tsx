import { Dispatch, Key, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import tasklist_api from '../../services/tasklist_api';
import { Spin } from '../../util/Spin';
import { Container } from './styles';
import { HistoryItem } from '../../lib/interfaces';

/*########################################################## 
***Version

    220626  FGF                 Initial Version
    220711  LVM                 Make Adjusts
    220712  MAM                 Spelling corrections
    220729  FGF                 Adding params

***Description***

    component History
    
***Props***
    taskId                     Parent task id
    type                       Type of log
    setVisibilityFunction      Set the visibility of the historic

##########################################################*/

interface HistoryProps {
    taskId?: number | Key,
    type?: string
    setVisibilityFunction: Dispatch<SetStateAction<boolean>>
}

export function History({ taskId, type, setVisibilityFunction }: HistoryProps) {
    
    const { t } = useTranslation();
    const {tasklistid} = useParams()
    //Initialize the states
    const [isLoading, setIsLoading] = useState(true)
    const [histories, setHistories] = useState<Array<HistoryItem>>([])

    //starts the states
    useEffect(() => {

        const data = taskId? {
            _limit: 10,
            _page: 1,
            type: 1,
            tasklist_id: tasklistid,
            task_id: taskId
        } 
        : {
            _limit: 10,
            _page: 1,
            type: type,
            tasklist_id: tasklistid
        }

        setIsLoading(true)
        tasklist_api.post('/get_histories', data)
            .then((res) => {
                setIsLoading(false)
                setHistories(res.data)
            })
    }, [])
    
    return (
        <>
            {isLoading ?
                <h5><Spin /></h5>
                :
                <Container>
                    <header onClick={() => setVisibilityFunction(false)}>
                        {t('Histories')}:
                    </header>
                    {histories.length > 0 ? // check if there is history in the task
                        //maps and creates the components that display the task histories
                        histories.map((history, i) => {
                            return (
                                <div key={i}>
                                    <p>{`${t(history.log)} ${t('by')}`}  <span>{history.employee_name}</span> </p>
                                    <small>{moment(history.timestamp.toString()).fromNow()}</small>
                                </div>
                            )
                        })
                        :
                        ''
                    }
                </Container>
            }
        </>
    )
}