import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import tasklist_api from '../../services/tasklist_api';
import { AppContext } from '../../services/context';
import { RowContainer } from './styles';

import AdminIcon from '../../assets/icons/adminIcon.svg'
import UserIcon from '../../assets/icons/userIcon.svg'

/*########################################################## 

***Version

    221223  MAM                 Recomponentize

***Description***

    component SettingsMembers

***Props***
    id                          User's id
    name                        User name
    email                       User's email
    access_level                User acces level
    weekly_email                Set weekly email state
    
##########################################################*/

interface MembersRowProps {
    data: {
        id: number,
        name: string,
        email: string,
        access_level: number,
        weekly_email: boolean
    },
    checked: boolean | undefined
    functionAddUsersToArray: (a: number, value: boolean) => void,
}

export function MembersRow({ data, checked, functionAddUsersToArray }: MembersRowProps) {

    const { t } = useTranslation();
    const { tasklistid } = useParams()
    const { userAccessLevel } = useContext(AppContext)
    const [localCheck, setLocalCheck] = useState(checked)
    const [weeklyEmail, setWeeklyEmail] = useState(data.weekly_email)

    var role = ''
    if (data?.access_level == 1) { role = t('Admin') }
    if (data?.access_level == 2) { role = t('User') }
    if (data?.access_level == 3) { role = t('Viewier') }

    //Set state of weekly email
    function ChangeWeeklyEmail(id: number, value: boolean) {
        tasklist_api.put(`/members`, {
            tasklist_id:tasklistid,
            id: id,
            access_level: data.access_level,
            weekly_email: value
        }).then(() => {
            setWeeklyEmail(!weeklyEmail)
        })
    }

    useEffect(() => { setLocalCheck(checked) }, [checked])

    return (
        userAccessLevel == 1 ?
            <RowContainer>
                <td><input type='checkbox' onChange={(e) => { functionAddUsersToArray(data.id, e.target.checked), setLocalCheck(!localCheck) }} checked={localCheck} /></td>
                <td id='tdName'>{data.name}</td>
                <td id='tdEmail'>{data.email}</td>
                <td id='tdRule'>{role}</td>
                <td id='tdWeekly'><input type='checkbox' checked={Boolean(weeklyEmail)} onChange={(e) => { ChangeWeeklyEmail(data.id, !weeklyEmail) }} /></td>
            </RowContainer>
            :
            <RowContainer color={data.access_level == 1 ? 'AdminRow' : 'UserRow'}>
                <td id='tdIcon'>
                    <img src={data.access_level == 1 ? AdminIcon : UserIcon}
                    alt={data.access_level == 1 ? 'Admin Icon' : 'User Icon'}/>
                </td>
                <td id='tdName'>{data.name}</td>
            </RowContainer>
    )
}