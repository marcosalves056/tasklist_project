import { Link } from "react-router-dom";
import { useContext, useState } from 'react'
import { useTranslation } from "react-i18next";

import { Button } from '../../util/Button'
import { TasklistContainer } from '../TasklistContainer'
import { SideBar } from './style'
import { AppContext } from '../../services/context';
import { ButtonIcon } from "../../util/ButtonIcon";

/*########################################################## 
***Version

    230505  CCN                 Initial Version

***Description***

    component SideBarLeft, 
        contain the LeftSideBar with the list of tasklists

***Props***
    OpenSideBarLeft 
    HandleSetResetModalActive   
    isOpen                      If the task is open or not

##########################################################*/

interface SideBarLeftProps{
    OpenSideBar: () => void ; 
    HandleSetResetModalActive: () => void;
    CloseRightSideBar: () => void;
    isOpen: boolean;
}

export function SideBarLeft({OpenSideBar, isOpen, CloseRightSideBar, HandleSetResetModalActive}: SideBarLeftProps){

    const { t } = useTranslation();
    const {setAtmFlag} = useContext(AppContext)

    return(
        <>
            <SideBar className={'state_' + isOpen} >
                    <nav className={'sideBar_' + isOpen}>
                        <div> 
                            <h4>{t('Tasklists')}</h4>
                            <div className='buttonCloseSlideBar'> <ButtonIcon functionButtonIcon={OpenSideBar} IconType={'BsXCircle'}/>
                            </div>
                        </div>
                        <Button id='newTasklistButton' className='Button' 
                            functionButton={() => HandleSetResetModalActive()}>+{t('New Tasklist')}
                        </Button>
                        <div className='divAssignedToMe' onClick={() => (OpenSideBar(), setAtmFlag(0), CloseRightSideBar())}>
                            <ButtonIcon IconType={'BsPersonLinesFill'}/>
                            <Link to={'/tasksAssignedToMe/'}>        
                                <h5>{t('Tasks Assigned To Me')}</h5>
                            </Link>
                        </div>
                        <TasklistContainer functionContainer={OpenSideBar} CloseRightSideBar={CloseRightSideBar}/>
                    </nav>
                    <div className='div_invisible' onClick={OpenSideBar} />
                </SideBar>
        </>
        
    )
}

