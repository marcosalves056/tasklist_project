import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import tasklist_api from '../../services/tasklist_api';
import { AppContext } from '../../services/context';
import InputText from '../../util/InputText';
import { Container } from './styles';
import { TasklistLink } from '../TasklistLink';
import { ButtonIcon } from '../../util/ButtonIcon';

/*########################################################## 
***Version

    220623  LVM                 Initial Version

***Description***

    component Tasklist Container

***Props***

    functionContainer          Sets container content

##########################################################*/

interface TasklistContainerProps {
    functionContainer: () => void
    CloseRightSideBar: () => void
}



export function TasklistContainer({ functionContainer, CloseRightSideBar }: TasklistContainerProps) {

    const { tasklistsList, setTasklistsList, setUserAccessLevel, reloadAgain } = useContext(AppContext)

    const [searchTerm, setSearchTerm] = useState('')
    
    
    const { t } = useTranslation();

    useEffect(() => {

        tasklist_api.post('/get_tasklist_lists').then(res => { setTasklistsList(res.data) })
    }, [window.location.pathname, reloadAgain])


    return (
        <Container>
            <InputText placeholder={t('Find a Tasklist')} onChange={(e) => { setSearchTerm(e.target.value) }} />
            <section id='TasklistsGroup'>
                <ul>
                    {tasklistsList ?
                        tasklistsList.filter((tasklist) => {
                            if (searchTerm == '') {
                                return tasklist
                            } else if (tasklist.tasklist_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return tasklist
                            }
                        }).map((tasklist, i) => { return Boolean(tasklist.active == '0'? false: true) == true ? <TasklistLink key={i} tasklistsDat={tasklist} functionClick={() =>{ functionContainer(); setUserAccessLevel(tasklist.role); CloseRightSideBar() }} /> : null })
                        :
                        null
                    }
                </ul>

                <div className='ArchiveGroup'>
                    <ButtonIcon IconType={'BsFillArchiveFill'}/>        
                    <h4>{t('Archived Tasklists')}</h4>      
                </div>
                <ul>
                    {tasklistsList ?
                        tasklistsList.filter((tasklist) => {
                            if (searchTerm == '') {
                                return tasklist
                            } else if (tasklist.tasklist_name.includes(searchTerm)) {
                                return tasklist
                            }
                        }).map((tasklist, i) => { return Boolean(tasklist.active == '0'? false: true) == false ? <TasklistLink key={i} tasklistsDat={tasklist} functionClick={() => {functionContainer(), CloseRightSideBar() }} /> : null })
                        :
                        null
                    }
                </ul>
            </section>
            
        </Container>
    );
}