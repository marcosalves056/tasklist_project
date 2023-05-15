import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import tasklist_api from '../../services/tasklist_api';
import { Attachment } from '../../lib/interfaces';
import { Modal, ModalBody, ModalTop } from '../ModalGeneric';
import { Container } from './styles';

import DocumentIcon from '../../assets/icons/documentIcon.svg'
import GenericArchiveIcon from '../../assets/icons/genericArchiveIcon.svg'
import PdfIcon from '../../assets/icons/pdfIcon.svg'
import PresentationIcon from '../../assets/icons/presentationIcon.svg'
import SheetIcon from '../../assets/icons/sheetIcon.svg'
import ZipIcon from '../../assets/icons/zipIcon.svg'

/*########################################################## 
***Version

    221029  MAM                 Initial version
    221223  MAM                 Refactoring

***Description***

    component Carousel
        Shows attachment list for the user

***Props***
    attachments                 The files which will be displayed
    index                       The first focused attachment index
    functionCarousel            The function of Carousel
                                in the attachment array  
    functionCloseOpenModal      Sets carousel visibility

##########################################################*/

interface CarouselProps{
    attachments: Array<Attachment>
    index: number
    functionCarousel: () => void
}

export function Carousel({attachments, index, functionCarousel}: CarouselProps){
    //Translation hook
    const { t } = useTranslation()
    //Component states
    const [focusedAttachment, setFocusedAttachment] = useState<number>(attachments[index]?.attachment_id)
    const [focusedPreview, setFocusedPreview] = useState<string>('')
    const [next, setNext] = useState<number>(1)

    //Get the real size base64 encoded image
    function GetRealSize(id:number){
        setFocusedAttachment(id)
        tasklist_api.post('/get_attachment',{
            attachment_id: id
        }).then(res => setFocusedPreview(res.data[0].base64))
    }

    //Verify the attachment extension
    function ChooseIcon(fileExtension: string, offset: number){
        if(['png', 'jpg', 'jpeg', 'gif','bmp'].includes(fileExtension)){
            return`data:image/${fileExtension};base64,${focusedAttachment == attachments[ index + next + offset]?.attachment_id? focusedPreview: attachments[ index + next + offset].preview}`
        }else if(fileExtension == 'pdf'){
            return PdfIcon
        }else if(['doc', 'docx', 'txt'].includes(fileExtension)){
            return DocumentIcon
        }else if(['xls', 'xlsx', 'csv'].includes(fileExtension)){
            return SheetIcon
        }else if(['ppt', 'pptx'].includes(fileExtension)){
            return PresentationIcon
        }else if(['rar', 'zip'].includes(fileExtension)){
            return ZipIcon
        }else if(fileExtension){
            return GenericArchiveIcon
        }
    }

    //Check attachment id
    function VerifyFocusedAttachment(offset: number){
        return focusedAttachment == attachments[ index + next + offset]?.attachment_id 
    }

    //Check attachment extension
    function VerifyExtensionAllowed(offset: number){
        return ['png', 'jpg', 'jpeg', 'gif','bmp'].includes(attachments[index + next + offset]?.attachment_name.split('.').reverse()[0].toLowerCase()) == false
    }

    //If in a Android browser, sends the href with the file extension, otherwise sends as 'file' and the OS chose the extension by the file name
    function ChooseHref(offset:number){
        if(navigator.userAgent.includes('Android')){
            return `data:application/${attachments[index + next + offset]?.attachment_name.split('.').reverse()[0].toLowerCase()};base64,${attachments[index + next + offset].preview}`
        }else{
            return `data:application/file;base64,${attachments[index + next + offset].preview}`
        }
    }

    //Load the attachments in the first render
    useEffect(() => {
        tasklist_api.post('/get_attachment',{
            attachment_id: focusedAttachment
        }).then(res => (setFocusedPreview(res.data[0].base64)))
    },[])

    return(
        <Container>
            <Modal functionSetModal={() => functionCarousel()}>
                <ModalTop functionSetModal={() => functionCarousel()}>{t('Attachments')}</ModalTop>
                <ModalBody>
                    {/* Shows de navigation arrow (previous) */}
                    { attachments.length > 3? <a className='arrow' onClick={() => next > 1? setNext(next - 1) : null}>{window.innerWidth > 468? '<' : '^'}</a> : null}
                    { index + next == 0 && attachments.length >= 3? //First page
                        <>
                            <div>
                                <a 
                                href={VerifyFocusedAttachment(0) && VerifyExtensionAllowed(0)?
                                    ChooseHref(0)
                                    :
                                    '#'} 
                                download={VerifyFocusedAttachment(0) && VerifyExtensionAllowed(0)? attachments[index + next]?.attachment_name : undefined}>
                                    <img
                                        id='first'
                                        className={VerifyFocusedAttachment(0)? 'focused' : undefined} 
                                        src={ChooseIcon(attachments[index + next]?.attachment_name.split('.').reverse()[0], 0)} 
                                        alt={attachments[index + next]?.attachment_name}  
                                        onClick={() => GetRealSize(attachments[ index + next]?.attachment_id)}
                                        />
                                    <label htmlFor='first'>{attachments[index + next]?.attachment_name}</label>
                                </a>
                            </div>
                            <div>
                                <a 
                                    href={VerifyFocusedAttachment(1) && VerifyExtensionAllowed(1)?
                                        ChooseHref(1)
                                        :
                                        '#'} 
                                    download={VerifyFocusedAttachment(1) && VerifyExtensionAllowed(1)? attachments[index + next + 1]?.attachment_name : undefined}>
                                    <img
                                        id='second'
                                        className={VerifyFocusedAttachment(1)? 'focused' : undefined}
                                        src={ChooseIcon(attachments[index + next + 1]?.attachment_name.split('.').reverse()[0], 1)} 
                                        alt={attachments[index + next + 1]?.attachment_name}  
                                        onClick={() => GetRealSize(attachments[ index + next + 1]?.attachment_id)}/>
                                        <label htmlFor='second'>{attachments[index + next + 1]?.attachment_name} </label>
                                </a>
                            </div>
                            <div>
                                <a 
                                    href={VerifyFocusedAttachment(2) && VerifyExtensionAllowed(2)?
                                        ChooseHref(2)
                                        :
                                        '#'} 
                                    download={VerifyFocusedAttachment(2) && VerifyExtensionAllowed(2)? attachments[index + next + 2]?.attachment_name : undefined}>
                                    <img
                                        id='third'
                                        className={VerifyFocusedAttachment(2)? 'focused' : undefined}
                                        src={ChooseIcon(attachments[index + next + 2]?.attachment_name.split('.').reverse()[0], 2)} 
                                        alt={attachments[index + next + 2]?.attachment_name} 
                                        onClick={() => (GetRealSize(attachments[ index + next + 2]?.attachment_id)/*, setNext(next + 1)*/)}/>
                                    <label htmlFor='third'>{attachments[index + next + 2]?.attachment_name} </label>
                                </a>
                            </div>
                        </>
                        : //Next pages
                        <>
                            { index + next - 1 >= 0? 
                                <div>
                                    <a 
                                        href={VerifyFocusedAttachment(-1) && VerifyExtensionAllowed(-1)?
                                            ChooseHref(-1)
                                            :
                                            '#'} 
                                        download={VerifyFocusedAttachment(-1) && VerifyExtensionAllowed(-1)?attachments[index + next - 1]?.attachment_name : undefined}>
                                        <img
                                            id='first'
                                            className={VerifyFocusedAttachment(-1)? 'focused' : undefined} 
                                            src={ChooseIcon(attachments[index + next - 1]?.attachment_name.split('.').reverse()[0], -1)} 
                                            alt={attachments[index + next - 1]?.attachment_name}  
                                            onClick={() => (GetRealSize(attachments[ index + next -1]?.attachment_id)/*, attachments.length > 3 && next != 1? setNext(next - 1) : null*/)}/> 
                                        <label htmlFor='first'>{attachments[index + next - 1]?.attachment_name} </label>
                                    </a>
                                </div>: null}
                            <div>
                                <a 
                                    href={VerifyFocusedAttachment(0) && VerifyExtensionAllowed(0)?
                                        ChooseHref(0)
                                        :
                                        '#'} 
                                    download={VerifyFocusedAttachment(0) && VerifyExtensionAllowed(0)? attachments[index + next]?.attachment_name : undefined}>
                                    <img 
                                        className={VerifyFocusedAttachment(0)? 'focused' : undefined} 
                                        src={ChooseIcon(attachments[index + next]?.attachment_name.split('.').reverse()[0], 0)} 
                                        alt={attachments[index + next]?.attachment_name} 
                                        onClick={() => GetRealSize(attachments[ index + next]?.attachment_id)}/>
                                    <label htmlFor='second'>{attachments[index + next]?.attachment_name} </label>
                                </a>
                            </div>
                            
                            { index + next +1 <= attachments.length - 1? 
                                <div>
                                        <a 
                                            href={VerifyFocusedAttachment(1) && VerifyExtensionAllowed(1)?
                                                    ChooseHref(1)
                                                    :'#'} 
                                            download={VerifyFocusedAttachment(1) && VerifyExtensionAllowed(1)?attachments[index + next + 1]?.attachment_name:undefined}>
                                            <img
                                                id='third' 
                                                className={VerifyFocusedAttachment(1)? 'focused' : undefined} 
                                                src={ChooseIcon(attachments[index + next + 1]?.attachment_name.split('.').reverse()[0], 1)} 
                                                alt={attachments[index + next + 1]?.attachment_name} 
                                                onClick={() => (GetRealSize(attachments[ index + next + 1]?.attachment_id)/*, attachments.length > 3 && (index + next + 1 <= attachments.length) ? setNext(next + 1) : null*/)}/>
                                            <label htmlFor='third'>{attachments[index + next + 1]?.attachment_name} </label>
                                        </a>
                                        
                                </div>: null}
                        </>
                    }
                    {/* Shows de navigation arrow (next) */}
                    { attachments.length > 3? <a className='arrow' onClick={() => next < attachments.length - 2? setNext(next + 1) : null}>{window.innerWidth > 468? '>' : 'v'}</a> : null}
                </ModalBody>
            </Modal>
        </Container>
    )
}