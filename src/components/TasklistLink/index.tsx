import { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { AppContext } from '../../services/context'
import { ProgressBar } from '../../util/ProgressBar'
import { Container } from './styles'

import TasklistGreenIcon from '../../assets/icons/tasklistGreenIcon.svg'
import TasklistLaightGrayIcon from '../../assets/icons/tasklistLightGrayIcon.svg'
import ArchivedTasklistIcon from '../../assets/icons/archivedTasklistIcon.svg'

/*########################################################## 
***Version

    221223  MAM                 Recomponentize

***Description***

    component Tasklist Container

***Props***

    functionContainer          Sets container content
    tasklist_id                Selected task list ID
    active                     State of a task list
    tasklist_name              Selected task list name
    totalTasks                 Total number of tasks
    totalTasksClosed           Total number of tasks closed
    totalTasksOpen             Total number of tasks opened
    functionClick              Function of Click

##########################################################*/

interface TasklistLinkProps {
    tasklistsDat: {
        tasklist_id: string
        active: string
        tasklist_name: string
        totalTasks: number
        totalTasksClosed: number
        totalTasksOpen: number,
        display: string,
        role: number
    }
    functionClick: () => void
}

export function TasklistLink({ tasklistsDat, functionClick }: TasklistLinkProps) {

    const { tasklistid } = useParams()
    const { setAtmFlag } = useContext(AppContext)
    const [flag, setFlag] = useState(false)
    const browser = navigator.userAgent

    function ShowOpenedTasklistToUser() {
        return <img alt='' src={tasklistid == tasklistsDat.tasklist_id ? TasklistGreenIcon : Boolean(tasklistsDat.active == '0'? false: true) && flag == false ? TasklistLaightGrayIcon : Boolean(tasklistsDat.active == '0'? false: true) || flag == false? ArchivedTasklistIcon : TasklistLaightGrayIcon}/>
    }

    return (
        <Container browser={browser}>
            <Link className='tasklist_a' to={'/tasklist/' + tasklistsDat.tasklist_id} onClick={functionClick} onMouseDown={() => setAtmFlag(0)} onMouseEnter={() => setFlag(!flag)} onMouseLeave={() => setFlag(!flag)} id={tasklistsDat.tasklist_name == 'Test tasklist' ? 'testTasklist' : undefined}>
                <span className={Boolean(tasklistsDat.active == '0'? false: true) ? 'active' : 'desactive'}>
                    {ShowOpenedTasklistToUser()}
                    <div className='ProgressGroup'>
                        <h4 className='TasklistName'>{tasklistsDat.tasklist_name}</h4>
                        <ProgressBar variant={Boolean(tasklistsDat.active == '0'? false: true) ? 'active' : 'archived'} totalTasks={tasklistsDat.totalTasks} totalTasksClosed={tasklistsDat.totalTasksClosed} />

                    </div>
                    <div className='CounterGroup'>
                        <h5>{tasklistsDat.totalTasksClosed}/</h5><h4>{tasklistsDat.totalTasks}</h4>
                    </div>
                </span>
            </Link>
        </Container>
        
    )
}