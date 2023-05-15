import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import tasklist_api from '../../services/tasklist_api';
import { AppContext } from '../../services/context';
import { Attachment, Settings, taskProps } from '../../lib/interfaces';
import { ContainerRow } from './styles';
import { Carousel } from '../Carousel';
import { ModalEditTask } from '../ModalEditTask';

import UserIcon from '../../assets/icons/userIcon.svg'
import DocumentIcon from '../../assets/icons/documentIcon.svg'
import GenericArchiveIcon from '../../assets/icons/genericArchiveIcon.svg'
import PdfIcon from '../../assets/icons/pdfIcon.svg'
import PresentationIcon from '../../assets/icons/presentationIcon.svg'
import SheetIcon from '../../assets/icons/sheetIcon.svg'
import ZipIcon from '../../assets/icons/zipIcon.svg'

/*########################################################## 

***Version

    220625  FGF                 Initial Version
    220721  FGF                 Some changes in 'delete' mode

***Description***

    component TaskList

***Props***
    i                           The row key
    data                        The row source
    functionRow                 Fired when the row is clicked
    TasksAssignedToMe           If the component is in the 
                                tasksAssignedToMe page           

##########################################################*/

interface rowProps {
    i: number 
    data: taskProps
    settings?: Settings
    TasksAssignedToMe?:boolean
}

export function Row({ data, i, settings, TasksAssignedToMe }: rowProps) {

    const { t } = useTranslation()
    const { tasklistid } = useParams()
    const { Checker, checkedTasksList, globalCheck, tasklistsList } = useContext(AppContext)
    //initialize the states
    const [showOrHideModalEditTask, setShowOrHideModalEditTask] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [preview, setPreview] = useState<Attachment>()
    const [attachments, setAttachments] = useState<Array<Attachment>>([])
    const [carouselActive, setCarouselActive] = useState<boolean>(false)

    const userLang = navigator.language
    const format =  userLang != 'pt-BR' && userLang.includes('es') == false ? 'MM/DD/YYYY' : 'DD/MM/YYYY' 

    const status = data.due_dates && data.due_dates.length > 0 && Date.parse(data.due_dates[data.due_dates.length - 1].dueDate) < Date.now() && data.status == 1 ? 3 : data.status
    
    //Return the attached file in the task
    function GetPreview(){
        return (preview != undefined && ['png', 'jpg', 'jpeg', 'gif','bmp'].includes(preview?.attachment_name.split('.')[1])?
            <div id='preview' onClick={() => setCarouselActive(true)} >
                <img src={`data:image/${preview?.attachment_name.split('.')[1]};base64,${preview.preview}`} alt='attachment' />
                {attachments && attachments.length > 1?  <label>{`+${attachments.length - 1}`}</label>: null}
            </div>
        : preview != undefined && ['pdf'].includes(preview?.attachment_name.split('.')[1])?
            <div id='preview' onClick={() => setCarouselActive(true)} >
                <img src={PdfIcon} alt={preview.attachment_name} />
                {attachments && attachments.length > 1?  <label>{`+${attachments.length - 1}`}</label>: null}
            </div>
        : preview != undefined && ['doc', 'docx', 'txt'].includes(preview?.attachment_name.split('.')[1])?
            <div id='preview' onClick={() => setCarouselActive(true)} >
                <img src={DocumentIcon} alt={preview.attachment_name} />
                {attachments && attachments.length > 1?  <label>{`+${attachments.length - 1}`}</label>: null}
            </div>
        : preview != undefined && ['xls', 'xlsx', 'csv'].includes(preview?.attachment_name.split('.')[1])?
            <div id='preview' onClick={() => setCarouselActive(true)} >
                <img src={SheetIcon} alt={preview.attachment_name} />
                {attachments && attachments.length > 1?  <label>{`+${attachments.length - 1}`}</label>: null}
            </div>
        : preview != undefined && ['ppt', 'pptx'].includes(preview?.attachment_name.split('.')[1])?
            <div id='preview' onClick={() => setCarouselActive(true)} >
                <img src={PresentationIcon} alt={preview.attachment_name} />
                {attachments && attachments.length > 1?  <label>{`+${attachments.length - 1}`}</label>: null}
            </div>
        : preview != undefined && ['rar', 'zip'].includes(preview?.attachment_name.split('.')[1])?
            <div id='preview' onClick={() => setCarouselActive(true)} >
                <img src={ZipIcon} alt={preview.attachment_name} />
                {attachments && attachments.length > 1?  <label>{`+${attachments.length - 1}`}</label>: null}
            </div>
        : preview != undefined?
            <div id='preview' onClick={() => setCarouselActive(true)} >
                <img src={GenericArchiveIcon} alt={preview.attachment_name} />
                {attachments && attachments.length > 1?  <label>{`+${attachments.length - 1}`}</label>: null}
            </div>
        :   
            <span onClick={() => () => (!TasksAssignedToMe && Boolean(settings?.active)) || TasksAssignedToMe ?
                setShowOrHideModalEditTask(true) 
            :
                alert(t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task'))} >.</span>)
    }

    useEffect(() =>{
        tasklist_api.post('/get_attachments',{
            task_id: data.id
        }).then(res => (res.data.attachments.length > 0? (setPreview(res.data.attachments[0]), setAttachments(res.data.attachments)) : null))
    },[])
    
    useEffect(() => {
        checkedTasksList.find(e => e == data.id) !== undefined ? setIsChecked(true) : setIsChecked(false)
    }, [checkedTasksList, globalCheck])

    return (
        <>
            <ContainerRow key={i} status={status} isChecked={checkedTasksList.includes(data.id)? true:false} onClick={() => { !carouselActive && checkedTasksList.length == 0 ? setShowOrHideModalEditTask(true) : null}}>
                <td id='tdColor' ><div></div></td>
                <td id='tdId' > {data.id}</td>
                <td id='tdCheckBox' onClick={() => (setShowOrHideModalEditTask(false))}>
                    <label htmlFor='inputCheckBox' style={{display: 'none'}}>{t('Check for multitask actions')}</label>
                    <input aria-label={`checkbox for task ${data.id}`} className='inputCheckBox' type='checkbox' onChange={e => { Checker(data.id, e.target.checked), setIsChecked(!isChecked) }} checked={checkedTasksList.includes(data.id)? true:false} />
                </td>
                <td id='tdStatus' >{data.status == 1 ? t('Opened') : t('Closed')}</td>
                {TasksAssignedToMe? <td id='tdTasklist' >{data.tasklist_name}</td>:null}
                <td id='tdLocation' >{data.location_name.trim()}</td>
                <td id='tdDescription' >{data.description.trim()}</td>
                <td id='tdArchive' onClick={() => (setShowOrHideModalEditTask(false))}>{GetPreview()}</td>
                <td id='tdDateOpened' >
                    {data.date_opened ? moment(data.date_opened).format(format) : ''}
                </td>
                <td id='tdOwner' >{data.owner_name}</td>
                <td id='tdDueDates' >
                    <div >
                        {data.due_dates?.map((date, i) => {
                            return (date.dueDate ?
                                <span key={i}>{moment(date.dueDate).format(format)}</span>
                                :
                                ''
                            )
                        })}
                    </div>
                </td>
                <td id='tdAssignedTo' >
                    {data.assigned?.map((user, i) => {
                        return (
                            user?.employee_name != ' ' ? //Check if the variable isn't empty
                                <span key={i}><img alt='' className='userIcon' src={UserIcon} height={12} />{user.employee_name}</span> //If it isn't the line is rendered
                                :
                                ''
                        )
                    })
                    }
                </td>
                <td id='tdComments'  >
                    <span id={i.toString()}>
                        <span id='Comments'>
                            {data.comments?.filter(comment => comment.comment.length > 0)?.map((comment, i) => {
                                const commentStatic = '**'+comment.employee_name+'** : ' + comment.comment
                                return i <=1? (
                                    <div key={i}>
                                        <ReactMarkdown children={commentStatic}></ReactMarkdown>
                                        <h6>{moment(comment.timestamp?.toString()).format(format)}</h6>
                                    </div>
                                ):null
                            })}
                        </span>
                    </span>
                    {Number(document.getElementById(i.toString())?.clientHeight) > 100 ||(data.comments?.filter(comment => comment.comment.length > 0) && data.comments.filter(comment => comment.comment.length > 0).length > 2) ? <span id='endIndicator'>...</span> : null}
                </td>
            </ContainerRow>
            {!carouselActive && checkedTasksList.length == 0 && showOrHideModalEditTask && tasklistsList.filter(tl => tl.tasklist_id == tasklistid)[0]?.role != 3 ? <ModalEditTask functionCloseOpenModal={() => { setShowOrHideModalEditTask(false)}} dados={data} settings={settings} assignedToMe={TasksAssignedToMe}/> : '' }
            {!carouselActive? <></> : <Carousel functionCarousel={() => (setCarouselActive(!carouselActive), setShowOrHideModalEditTask(false))} attachments={attachments} index={0}/>}
        </>
    )
}