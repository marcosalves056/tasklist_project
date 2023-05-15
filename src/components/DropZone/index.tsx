import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

import tasklist_api from '../../services/tasklist_api'
import { Button } from '../../util/Button'
import { Container } from './styles'
import { Attachment } from '../../lib/interfaces'
import { Carousel } from '../Carousel'

import DocumentIcon from '../../assets/icons/documentIcon.svg'
import GenericArchiveIcon from '../../assets/icons/genericArchiveIcon.svg'
import PdfIcon from '../../assets/icons/pdfIcon.svg'
import PresentationIcon from '../../assets/icons/presentationIcon.svg'
import SheetIcon from '../../assets/icons/sheetIcon.svg'
import ZipIcon from '../../assets/icons/zipIcon.svg'

/*########################################################## 
***Version

    220704  LVM                 Initial Version
    221223  MAM                 Add copy and paste feature
    221223  MAM                 Refactoring

***Description***

    component DropZone
        Receives attachments to the task

***Props***
    saving                       If the change is being saved
    taskId                       Task id selected
    active                       Task state
    files                        File provided by the user
    pastedFiles                  Attached task files

##########################################################*/

interface DropZoneProps{
    saving?: boolean;
    taskId?: number;
    active?: boolean;
}

interface PreviewAttachmentsProps {
    files: File[],
    pastedFiles?: FileList
}

export function DropZone({saving, taskId, active}:DropZoneProps) {
    //Functionality variables and hooks
    const onDrop = useCallback(() => {}, [])
    const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({ onDrop, maxFiles:255, maxSize:10485760, multiple:true, noClick:true})
    const { t } = useTranslation();
    //Initialize states
    const [existentAttachments, setExistentAttachments] = useState<Array<Attachment>>([])
    const [pastedFlies, setPastedFlies] = useState<FileList>()
    const [reloadAttachments, setReloadAttachments] = useState<boolean>()
    const [carouselActive, setCarouselActive] = useState<boolean>(false)

    //Choose the displayed icon
    function PreviewIcon(fileExtension: string, preview_base64?: string, file?:File|null){
        if(['png', 'jpg', 'jpeg', 'gif','bmp'].includes(fileExtension) && preview_base64){
            return`data:image/${fileExtension};base64,${preview_base64}`
        }else if(['png', 'jpg', 'jpeg', 'gif','bmp'].includes(fileExtension) && !preview_base64 && file){
            return URL.createObjectURL(file)
        }
        else if(fileExtension == 'pdf'){
            return PdfIcon
        }else if(['doc', 'docx', 'txt'].includes(fileExtension)){
            return DocumentIcon
        }else if(['xls', 'xlsx', 'csv'].includes(fileExtension)){
            return SheetIcon
        }else if(['ppt', 'pptx'].includes(fileExtension)){
            return PresentationIcon
        }else if(['rar', 'zip'].includes(fileExtension)){
            return ZipIcon
        }else{
            return GenericArchiveIcon
        }
    }
    
    //Display pasted and accepted files
    function PreviewAttachments({ files, pastedFiles }: PreviewAttachmentsProps) {
        const { t } = useTranslation()
        function List() {
            //Gets preview images
            var listTemp: JSX.Element[] = []
    
            if(pastedFiles){
                for(let c = 0; c < pastedFiles?.length; c++){
                    pastedFiles.item(c)? listTemp.push(
                        <div key={c}>
                            <img src={PreviewIcon(String(pastedFiles?.item(c)?.name.split('.')[1]), undefined, pastedFiles.item(c))} alt=''/>
                            <label>{String(pastedFiles?.item(c)?.name)}</label>
                            <a>{t('New!')}</a>
                        </div>
                    ) : null
                }
            }
            
    
            files.map((file) => {
                listTemp.push(
                    <div key={file.lastModified}>
                        <img src={PreviewIcon(file.name.split('.')[1], undefined, file)} alt=''/>
                        <label>{file.name}</label>
                        <a>{t('New!')}</a>
                    </div>
                )
            })
    
            return listTemp
        }
    
        return (
            <div id='newAttachments'>{List()}</div>
        )
    }

    //Delete existent attachments
    function DeleteAttachments(attachment_id: number){
        const confirmation = confirm(t('Are you sure you want to delete this attachment? This action IS NOT REVERSIBLE'))
        confirmation == true?
            tasklist_api.post('/delete_attachments', {
                attachment_id: attachment_id
            }).then(() => setReloadAttachments(!reloadAttachments))
        :
            null
    }

    //Get the existent attachments
    useEffect(() =>{
        
            tasklist_api.post('/get_attachments',{
                task_id: taskId,
            }).then(res => setExistentAttachments(res.data.attachments))
        
    },[reloadAttachments])

    //Post new attachments when saving
    useEffect(() =>{
        taskId != undefined && saving == true?
            (
                acceptedFiles.length > 0? 
                    tasklist_api.post('/attachments',{
                        task_id: taskId,
                        'files[]': acceptedFiles
                    },{
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }})
                :
                    null,

                Number(pastedFlies?.length) > 0? 
                tasklist_api.post('/attachments',{
                        task_id: taskId,
                        'files[]': pastedFlies
                    },{
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }})
                :
                    null
            )
        :
        null
        
    },[saving])

    return (
        <>
            <Container>
                {/* Button section */}
                <div>
                    <label htmlFor='attachmentButton'>{t('Attachments')}:</label>
                    <Button id='attachmentButton' functionButton={open} disabled={ active? false:true}>{t('Choose Files')}</Button>
                    {acceptedFiles.length + Number(pastedFlies?.length) > 0 ?
                            <p>{acceptedFiles.length + Number(pastedFlies?.length)} {t('attachment(s)')}</p>
                        :
                            <p>{t('No file selected')}</p>
                    }
                </div>
                
                <span  {...getRootProps()} onPaste={(e) => (active? setPastedFlies(e.clipboardData.files):null)}>
                    <input {...getInputProps()} disabled={ active? false:true}/>
                    {/* Existent attachments section */}
                    {existentAttachments && existentAttachments?.length > 0?
                        <div id='existentAttachments'>
                            {existentAttachments?.map((ea, i) => 
                                <div>
                                    <img src={PreviewIcon(ea.attachment_name.split('.')[1], ea.preview)} alt='attachment' onClick={() => (setCarouselActive(!carouselActive))}/>
                                    <label onClick={() => (setCarouselActive(!carouselActive))}>{`${ea.attachment_name}`}</label>
                                    <a onClick={() => (setCarouselActive(false),DeleteAttachments(ea?.attachment_id))}>X</a>
                                </div>)}
                        </div> 
                    : 
                        null}
                    {//New attachments section
                        (acceptedFiles.length > 0 || Number(pastedFlies?.length) > 0) && active ?
                            <PreviewAttachments files={acceptedFiles} pastedFiles={pastedFlies}/> 
                            :
                            <p id='div_Paste' >{active ? t('Drop or paste the files here'): null}</p> 
                            
                            
                    }
                </span>
            </Container>
            {!carouselActive? <></> : <Carousel functionCarousel={() => setCarouselActive(!carouselActive)} attachments={existentAttachments} index={0}/>}
        </>
        
    )
}