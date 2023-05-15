import { useTranslation } from 'react-i18next';

import { Spin } from '../Spin';
import { Container } from './styles';

/*########################################################## 
***Version

    220811  FGF                 Initial Version

***Description***

    component LoadingSpin

***Props***          

##########################################################*/

export function LoadingSpin() {
    const { t } = useTranslation()
    return (
        <Container>
            <Spin />
            <div id='Loading'>
                <h1>{t('Loading...')}</h1>
            </div>
        </Container>
    )
}
