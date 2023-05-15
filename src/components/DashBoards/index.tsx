import { useTranslation } from 'react-i18next'

import { GraphicBarChartsStacked } from '../GraphicBarChartsStacked'
import { GraphicLine } from '../GraphicLine'
import { Container } from './styles'
import { Ranking } from '../Ranking'

/*########################################################## 
***Version

    220602  LVM                 Initial Version
    220913  MAM                 Update Ranking Dashboard
***Description***

    component DashBoards
        Show the DashBoards in home screen

***Props***
    flagSideBar                 Side bar state

##########################################################*/
interface DashBoardProps{
    flagSideBar: boolean
}


export function DashBoards({flagSideBar}:DashBoardProps) {

    const { t } = useTranslation()

    return (
        <>
            <Container style={{width: flagSideBar ? "75%" : ''}}>
                <h2>{t("DashBoards")}</h2>
                <div>
                    <GraphicLine/>

                    <div id='divGraphicBottom'>
                        <GraphicBarChartsStacked />
                        <Ranking />
                    </div>
                    
                </div>
            </Container>
        </>
    )
}

// export default DashBoards