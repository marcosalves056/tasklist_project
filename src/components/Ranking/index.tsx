import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import tasklist_api from '../../services/tasklist_api'

import { Container } from './styles'
import { AppContext } from '../../services/context'

import firstPlaceMedal from '../../assets/icons/1stplacemedal.svg'
import secondPlaceMedal from '../../assets/icons/2ndplacemedal.svg'
import thirdPlaceMedal from '../../assets/icons/3rdplacemedal.svg'

/*########################################################## 
***Version

    220916  MAM                 Initial Version

***Description***

    component Ranking
        Rank the users by tasks closed in the last 30 days

***Props***
    position                     User position rank
    name                         User name
    id                           User ID
    tasks_done                   Total of tasks done

##########################################################*/
interface RankedUser{
    position: number,
    name: string,
    id: number,
    tasks_done: number
}

export function Ranking() {

    const { t } = useTranslation()
    const { userName } = useContext(AppContext)
    const [rankedUsers, setRankedUsers] = useState(Array<RankedUser>)

    useEffect(() => {

        tasklist_api.post('/get_ranking_30_days')
            .then((res) => {
                setRankedUsers(res.data)
            })
        }, [])

    return (
        <>
            <Container>
                    <h3>{t('Ranking last 30 days')}</h3>
                    <table>
                        <tbody>
                            <tr id='columnTitle'>
                                <td className='fit'>{t('Position')}</td>
                                <td className='fit'>{t('Name')}</td>
                                <td>{t('Tasks done')}</td>
                            </tr>
                            {rankedUsers.map((user, i) => user.position < 5?
                            <tr id={user.name == userName ? 'bold':undefined} key={i}>
                                <td className='fit'>{(user.position) < 4? <img className='medal' alt='' src={(user.position) == 1? firstPlaceMedal: (user.position) == 2? secondPlaceMedal:thirdPlaceMedal}/> : user.position}</td>
                                <td className='fit'>{user.name}</td>
                                <td><progress value={Number(user.tasks_done)} max={Number(rankedUsers[0].tasks_done)}/> {user.tasks_done}</td>
                            </tr>
                            :
                            <>
                                <tr key={4}>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                </tr>
                                <tr id={user.name == userName ? 'bold':undefined} key={5}>
                                    <td className='fit'>{user.position}</td>
                                    <td className='fit'>{user.name}</td>
                                    <td><progress  value={Number(user.tasks_done)} max={Number(rankedUsers[0].tasks_done)}/> {user.tasks_done}</td>
                                </tr>
                            </>
                            )}
                        </tbody>
                    </table>
            </Container>
        </>
    )
}
