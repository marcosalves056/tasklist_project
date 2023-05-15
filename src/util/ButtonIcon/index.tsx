import { useContext } from 'react';

import { AppContext } from '../../services/context';
import { Container } from './styles';
import { 
    BsPersonCircle, 
    BsInfoCircle, 
    BsList, 
    BsPersonLinesFill, 
    BsXCircle, 
    BsFillArchiveFill, 
    BsPencilSquare, 
    BsPlus,
    BsFunnelFill,
    BsFunnel,
    BsArrowLeftCircle,
} from 'react-icons/bs';

/*########################################################## 
***Version

    230505  BFG                 Initial Version

***Description***

    component ButtonIcon
        Buttons based in library icons
        https://react-icons.github.io/react-icons/icons?name=bs

***Props***
    functionButtonIcon       Function of the Button when clicked
    IconType                 Type of icon

##########################################################*/

interface ButtonIconProps{
    functionButtonIcon? : () => void
    IconType : string
}

export function ButtonIcon({functionButtonIcon, IconType}:ButtonIconProps){
    const {userPortalLogo, } = useContext(AppContext)

    return(
        <Container onClick={functionButtonIcon}>
            {IconType == 'portalLogoIcon'?
            <img src={`data:image/png;base64,${userPortalLogo}`} className='icons'/> 
            :
            IconType == 'BsFillArchiveFill'?
            <BsFillArchiveFill className='icons'/>//ArchivedIcon
            :
            IconType == 'BsPersonCircle'?
            <BsPersonCircle className='icons'/>//UserIcon
            :
            IconType == 'BsInfoCircle'?
            <BsInfoCircle className='icons'/>//InfoIcon
            :           
            IconType == 'BsList'?
            <BsList className='icons'/>//ListIcon
            :
            IconType == 'BsPersonLinesFill'?
            <BsPersonLinesFill className='icons'/>//UserCheckIcon
            :
            IconType == 'BsXCircle'?
            <BsXCircle className='icons'/>//XIcon
            :
            IconType == 'BsPencilSquare'?
            <BsPencilSquare className="icons" />//EditIcon
            :
            IconType == 'BsPlus'?
            <BsPlus className='icons' />//PlusIcon
            :
            IconType == 'BsFunnelFill'?
            <BsFunnelFill className='icons' />//FunnelFullIcon
            :
            IconType == 'BsFunnel'?
            <BsFunnel className='icons' />//FunnelEmptyIcon
            :
            IconType == 'BsArrowLeftCircle'?
            <BsArrowLeftCircle className='icons' />//BackIcon
            :
            null
        }
        </Container>
    )
}



