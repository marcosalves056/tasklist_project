import { createContext, useState, Dispatch, SetStateAction, useEffect } from 'react'

import tasklist_api from './tasklist_api';
import { AppContextProviderProps, taskListsProps, Client } from '../lib/interfaces';
import { parseCookies, setCookie } from 'nookies';

interface AppContextProps {
    reloadAgain: boolean
    reloadMembersAgain: boolean
    clickOutside: boolean
    globalCheck: boolean
    printFilteredFlag: boolean
    atmFlag: 0|1|2|3
    userAccessLevel: number
    checkedTasksList: Array<number>
    userName: string,
    userPhoto : string
    userPortalLogo: string
    userId:string
    tasklistsList: Array<taskListsProps>
    clientId: number
    clients: Array<Client>
    setReloadMembersAgain: Dispatch<SetStateAction<boolean>>
    setClickOutside: Dispatch<SetStateAction<boolean>>
    setPrintFilteredFlag : Dispatch<SetStateAction<boolean>>
    setAtmFlag: Dispatch<SetStateAction<0|1|2|3>>
    setUserAccessLevel: Dispatch<SetStateAction<number>>
    setCheckedTasksList: Dispatch<SetStateAction<Array<number>>>
    setUserPortalLogo: Dispatch<SetStateAction<string>>
    setTasklistsList: Dispatch<SetStateAction<taskListsProps[]>>
    setClientId : Dispatch<SetStateAction<number>>
    setClients: Dispatch<SetStateAction<Array<Client>>>
    setUserPhoto: Dispatch<SetStateAction<string>>
    ReloadTasksAgain: () => void
    GlobalChecker: () => void
    Checker: (id: number, value: Boolean) => void
}

export const AppContext = createContext({} as AppContextProps);

export function AppContextProvider({ children }: AppContextProviderProps) {

    const [clickOutside, setClickOutside] = useState(false)
    const [reloadAgain, setReloadAgain] = useState(false)
    const [reloadMembersAgain, setReloadMembersAgain] = useState(false)
    const [tasklistsList, setTasklistsList] = useState<Array<taskListsProps>>([])
    const [checkedTasksList, setCheckedTasksList] = useState<Array<number>>([])
    const [globalCheck, setGlobalCheck] = useState(false)
    const [userName, setUserName] = useState<string>('')
    const [userPortalLogo, setUserPortalLogo] = useState<string>('')
    const [userId, setUserId] = useState('')
    const [userAccessLevel, setUserAccessLevel] = useState(3)
    const [atmFlag, setAtmFlag] = useState<0|1|2|3>(0)
    const [printFilteredFlag, setPrintFilteredFlag] = useState<boolean>(false) 
    const [userPhoto, setUserPhoto] = useState<string>("")  
    const [clients, setClients] = useState<Array<Client>>([{client_id:1, client_name:"Tasklist"}]) // Delete initial state
    const [clientId, setClientId] = useState<number>(9)

    const { 'tasklist.token': token } = parseCookies();
    const { 'tasklist.portal': portal } = parseCookies();


    function ReloadTasksAgain() {
        setReloadAgain(!reloadAgain)
    }

    // Update checkedTasksList
    function Checker(id: number, value: Boolean) {
        var checkedTasksListTemp = checkedTasksList
        var idIsTheArrayTask = false
        checkedTasksListTemp.find(element => element == id) == undefined ? idIsTheArrayTask = false : idIsTheArrayTask = true
        if (value === true) {
            if (!idIsTheArrayTask) {
                checkedTasksListTemp = [...checkedTasksListTemp, id]
                setCheckedTasksList(checkedTasksListTemp)
                return
            }
        } else {
            if (idIsTheArrayTask) {
                checkedTasksListTemp = checkedTasksListTemp.filter((element) => element !== id)
                setCheckedTasksList(checkedTasksListTemp)
                return
            }
        }
    }

    function GlobalChecker() {
        setGlobalCheck(!globalCheck)
    }



    useEffect(() => {
        ['dev', 'localhost'].includes(window.location.hostname.split('.')[0]) ?
        null
        :
        setCookie(undefined, 'tasklist.portal', window.location.hostname.split('.')[0] , {
            maxAge: 60 * 60 * 24 * 30 //30 days
        })
    },[])

    
    useEffect(() => {
        if(token && portal){
            tasklist_api.post('/get_user_data')
                .then(resp => {
                    setUserName(resp.data[0].user_name)
                    setUserId(resp.data[0].employee_id)
                    setUserPortalLogo(`${resp.data[0].logo_Base64}`)
                })
        }
    },[portal, token])
    

    return (
        <AppContext.Provider value={{
            reloadAgain,
            reloadMembersAgain,
            clickOutside,
            globalCheck,
            printFilteredFlag,
            atmFlag,
            userAccessLevel,
            checkedTasksList,
            userName,
            userPortalLogo,
            userId,
            tasklistsList,
            clientId,
            clients,
            userPhoto,
            setReloadMembersAgain,
            setClickOutside,
            setPrintFilteredFlag,
            setAtmFlag,
            setUserAccessLevel,
            setCheckedTasksList,
            setUserPortalLogo,
            setTasklistsList,
            GlobalChecker,
            ReloadTasksAgain,
            Checker,
            setClientId,
            setClients,
            setUserPhoto
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider