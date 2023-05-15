import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

import tasklist_api from '../../services/tasklist_api';
import { AppContext } from '../../services/context';
import { Row } from '../Row';
import { HeaderTasklistOptions } from '../HeaderTasklistOptions';
import { Filter, Ordination, Settings, taskProps } from '../../lib/interfaces';
import { Container } from './styles';
import { Spin } from '../../util/Spin';
import { FilterInput } from '../FilterInput';
import { TaskDateFilter } from '../FilterDate';
import PdfTemplate from '../PdfTemplate';
import { HeaderTasklist } from '../HeaderTasklist';
// import  { ModalEditTask }  from '../ModalEditTask';
// import { FilteredTasksNumberIndicator } from '../FilteredTasksNumberIndicator';

/*############################################################### 
***Version

    220722  FGF                 Initial Version
    220725  MAM                 Implement filtering and ordering

***Description***

    component TasklistContent

***Props***
    assignedToMe                If the task is in 'Assigned To Me' list
    dataSettings                Store task data settings
    flagSideBar                 Side bar state

###############################################################*/

interface TasklistContentProps {
    assignedToMe?: true
    flagSideBar?: boolean
}

export function TasklistContent({ assignedToMe, flagSideBar}: TasklistContentProps) {

    //for translation
    const { t } = useTranslation()
    
    //get the URL parameter
    const { tasklistid } = useParams()
    
    //get in the contextApp 
    const { globalCheck, GlobalChecker, checkedTasksList, setCheckedTasksList, reloadAgain, userName, atmFlag, setAtmFlag, tasklistsList, userId, printFilteredFlag, setPrintFilteredFlag, userPortalLogo, ReloadTasksAgain, setUserAccessLevel } = useContext(AppContext)
    
    //initialize the memories
    const [tasks, setTasks] = useState<Array<taskProps>>([])

    //program flux variables
    const [isLoading, setIsLoading] = useState(false)
    const [renderCleared, setRenderCleared] = useState(false)

    //infinity scroll variables
    const [pageNumber, setPageNumber] = useState(2)
    const [flag, setFlag] = useState(false)
    const [scrollLFlag, setScrollLFlag] = useState(false)
    const [enterClicked, setEnterClicked] = useState(false)
    const [lastPageFlag, setLastPageFlag] = useState(false)
    const [newTaskLoading, setNewTasksLoading] = useState<boolean>(false) 
    const limit = 50

    //filter and ordination variables
    const [generalFilterVisibility, setGeneralFilterVisibility] = useState(false)
    const [generalFilterArray, setGeneralFilterArray] = useState<Array<string>>([])
    const [filteredTasksNumber, setFilteredTasksNumber] = useState<number>()
    const [paginatedTasksNumber, setPaginatedTasksNumber] = useState<number>()
    const [idFilter, setIdFilter] = useState<string>('')
    const [tasklistFilter, setTasklistFilter] = useState<string>('')
    const [statusFilter, setStatusFilter] = useState<number>(0)
    const [locationFilter, setLocationFilter] = useState<string>('')
    const [descriptionFilter, setDescriptionFilter] = useState<string>('')
    const [dateOpenedFilterBegin, setDateOpenedFilterBegin] = useState<string>('')
    const [dateOpenedFilterEnd, setDateOpenedFilterEnd] = useState<string>('')
    const [ownerFilter, setOwnerFilter] = useState<string>('')
    const [dueDateFilterBegin, setDueDateFilterBegin] = useState<string>('')
    const [dueDateFilterEnd, setDueDateFilterEnd] = useState<string>('')
    const [assignedFilter, setAssignedFilter] = useState<string>('')
    const [commentFilter, setCommentFilter] = useState<string>('')
    const [filters, setFilters] = useState<Array<Filter>>()
    const [ordinations, setOrdinations] = useState<Array<Ordination>>([{field: '.', value: 0}, {field: '.', value: 0}])

    //return historic state
    const [isOpenHistoric, setIsOpenHistoric] = useState(false)
    const [data, setData] = useState<Settings|undefined>()
    const [refreshFlag, setRefreshFlag] = useState<number>(0)

    //set the filters default values
    function SetupFiltersStates(){

        filters?.map(df =>{
            df.field == 'id'?
                setIdFilter(df.value[0])
            :df.field == 'tasklist_name'?
                setTasklistFilter(df.value[0])
            :df.field == 'status'?
                setStatusFilter(Number(df.value[0]))
            :df.field == 'location_name'?
                setLocationFilter(df.value[0])
            :df.field == 'description'?
                setDescriptionFilter(df.value[0])
            :df.field == 'date_opened'?
                (setDateOpenedFilterBegin(df.value[0]), setDateOpenedFilterEnd(df.value[1]))
            :df.field == 'owner_name'?
                setOwnerFilter(df.value[0])
            :df.field == 'due_dates'?
                (setDueDateFilterBegin(df.value[0]), df.value[1])
            :df.field == 'assigned'?
                (setAssignedFilter(df.value[0]))
            :df.field == 'comments'?
                setCommentFilter(df.value[0])
            :
                null
        })
    }

    //set a user name filter
    function GetAssignedToMeFilters(){
        atmFlag== 0 && filters?.map(f => f.field).includes('assigned') == false  ? 
            setFilters([{field: 'deleted', value: ['false']}, {field: 'assigned', value: [userName]}]) 
        :atmFlag == 1?
            setFilters([{field: 'deleted', value: ['false']}, {field: 'assigned', value: [userName]}, {field: 'status', value:['2']},{field: 'active', value:['1']}]) 
        :atmFlag == 2?
            setFilters([{field: 'deleted', value: ['false']}, {field: 'assigned', value: [userName]}, {field: 'status', value:['1']}, {field: 'active', value:['1']}]) 
        :atmFlag == 3?
            setFilters([{field: 'deleted', value: ['false']}, {field: 'assigned', value: [userName]}, {field: 'status', value:['1']}, {field: 'due_dates', value: ['', moment().subtract(1, 'day').format('MM/DD/YYYY')]}, {field: 'active', value:['1']}]) 
        :
            null
    }

    //Set a input filter
    function OnEnter(field: string, filter:string){
        filters && filters.filter(f => f.field == field).length >= 0 && filter? 
            ((
                filters.splice(
                    filters.indexOf(filters.filter(f => f.field == field)[0]), 
                    filters.lastIndexOf(filters.filter(f => f.field == field)[0])), 
                setFilters([...filters, {field: field, value: [filter]}])
            ), setEnterClicked(!enterClicked)) 
        : 
        (filters?.splice(
            filters.indexOf(filters.filter(f => f.field == field)[0]), 
            filters.lastIndexOf(filters.filter(f => f.field == field)[0])), setEnterClicked(!enterClicked))

    }
    //Set the current ordination
    function SetOrdination(column: string){
        /*The default object is [{field: '.', value: 0}, {field: '.', value: 0}].*/
        ordinations[1]?.field == column? //Check the second position of the array
            ordinations[1].value == 0? // If it field matches the current column, check if it is ordained by increasing case
                (setOrdinations([{field: column, value : 1}, ordinations[0]])) //If true, set decreasing case
            :
                (setOrdinations([ordinations[0], {field: '.', value : 0}])) //Else, clean ordination
            
        :
        ordinations[0]?.field == column? //Check the first position of the array
            ordinations[0].value == 0? // If it field matches the current column, check if it is ordained by increasing case
                (setOrdinations([{field: column, value : 1}, ordinations[1]])) //If true, set decreasing case
            : ordinations[0].value == 1?
                (setOrdinations([ordinations[1], {field: '.', value : 0}])) //Else, if it is already decreasing, cleans the second position of the array
            :
                (setOrdinations([{field: column, value : 0}, ordinations[1]])) //Else, set increasing case
        :
        (setOrdinations([{field: column, value : 0}, ordinations[0]])) //If the queue is empty, insert the current column into it ordained by increasing case
    }

    //Set the values of a date filter
    function SetDateFilter(column: string, column_variables: Array<string>){
        filters?
        filters.filter(f => f.field == column).length > 0? 
            (filters.splice(filters.indexOf(filters.filter(f => f.field == column)[0])), setFilters([...filters, {field: column, value: column_variables}]))
        :
            setFilters([...filters, {field: column, value: column_variables}]) : null
    } 

    //Clean the value of a filter
    function CleanFilter(column: string){
        filters?.filter(f => f.field == column)[0]?.value?
            filters?.splice(filters.indexOf(filters.filter(f => f.field == column)[0])): setGeneralFilterArray([]) ,setGeneralFilterVisibility(false) ,setEnterClicked(!enterClicked)
    } 

    //return the default filter
    function DefaultFilter(name:string){
        let filter = ['']
        filters?.filter(f => f.field == name)[0]?.value?
            filter = filters.filter(f => f.field == name)[0]?.value
        :
        null
        return filter[0] != ''? filter:''
    }

    //Set historic open
    function setOpenHistoric(){
        setIsOpenHistoric(!isOpenHistoric)
    }

    //set task filter state to null
    async function CleanStates () {
        setLastPageFlag(false)
        setPaginatedTasksNumber(undefined)
        setFilteredTasksNumber(undefined)
        setPageNumber(2)
        assignedToMe ? GetAssignedToMeFilters() : setFilters(undefined)
        setOrdinations([{field: '.', value: 0}, {field: '.', value: 0}])
    }

    //Load the correct tasks for the tasklist
    useEffect( () => {
        setIsLoading(true)
        CleanStates()
            .then(() => {
                tasklist_api.post('/get_filters_ordinations',{
                    tasklist_id: !assignedToMe? tasklistid : 0,
                    })
                    .then((res) => {
                        res.data.filters[0].length >=1 && !assignedToMe? setFilters(res.data.filters[0].map((filter:Filter) => ({field: filter.field, value: Array(String(filter.value).replace('[','').replace(']','').replaceAll('"', ""))}))) : setFilters([{field:'deleted', value:['false']}])
                        setOrdinations(res.data.ordinations[0].reverse())
                    }).then(() => (
                        !assignedToMe? SetupFiltersStates() : GetAssignedToMeFilters() , setRenderCleared(true), ReloadTasksAgain()    
                    ))
            })
        
        setUserAccessLevel(tasklistsList.filter(t => t.tasklist_id == tasklistid)[0]?.role)

    }, [tasklistid]) 

    //Reload tasklist after filter, ordination or modification events
    useEffect(() => {
        setIsLoading(true)
        setLastPageFlag(false)
        setPageNumber(2)
        renderCleared == true && filters != undefined?
            tasklist_api.post('/get_tasklist',{
                tasklist_id: !assignedToMe? tasklistid : 0,
                _limit: limit,
                _page: 1,
                filters: filters,
                ordinations: ordinations,
                }).then(resp => (
                    setTasks(resp.data.tasks),
                    setPaginatedTasksNumber(resp.data.tasks.length),
                    setIsLoading(false)
                ))
            :
                    null
        
    },[enterClicked, ordinations, reloadAgain]) 
    
    //Feed checked tasks list array
    useEffect(() => {
        if (globalCheck) {
            var buffer: Array<number> = []
            tasks.forEach(o => {
                buffer.push(o.id)
            })
            setCheckedTasksList(buffer)
        } else {
            setCheckedTasksList([])
        }
    }, [globalCheck])

    //Print the current filter tasks
    useEffect(() => {
        if (tasklistsList.filter( t => t.tasklist_id == tasklistid)[0]?.totalTasks == 0 && printFilteredFlag == true){
            alert(t('There are no tasks to print'))
            setPrintFilteredFlag(false)
            return
        }
        assignedToMe ? GetAssignedToMeFilters() : null
        setLastPageFlag(false)
        setPageNumber(2)
        printFilteredFlag == true?
            tasklist_api.post(`/get_tasklist`,{
                tasklist_id: !assignedToMe? tasklistid : 0,
                    _limit: !assignedToMe? tasklistsList.filter( t => t.tasklist_id == tasklistid)[0].totalTasks : 2147483647,
                    _page: 1,
                    filters: filters,
                    ordinations: ordinations
            })
                .then((res) => {
                    (PdfTemplate(res.data, res.data.tasks, userName, userPortalLogo, true, assignedToMe), setPrintFilteredFlag(false))
                })
        :
            null
    },[printFilteredFlag]) 

    //Load new tasks after vertical scroll end
    useEffect(() => {
        var scrollTop  = document.getElementById('allTable')?.scrollTop //get scroll position
        var scrollHeight = document.getElementById('allTable')?.scrollHeight //get scroll size
        var clientHeight = document.getElementById('allTable')?.clientHeight //get scroll offset

        scrollTop && scrollHeight && clientHeight && Math.floor(scrollTop)  >= (scrollHeight - clientHeight - 20) && !newTaskLoading? 
        (
            !lastPageFlag? setNewTasksLoading(true) : setNewTasksLoading(false),
            tasklist_api.post('/get_load_tasks',{
                _limit: limit,
                _page: pageNumber,
                tasklist_id: tasklistid,
                filters: filters,
                ordinations: ordinations
            })
            .then(res => (
            tasks.length >= 1 && res.data.tasks.length >= 1? !assignedToMe ? 
                res.data.tasks.forEach((nt:taskProps) => ((tasks.map(et => et.id).includes(nt.id) == false ? tasks.push(nt) : null)), setPageNumber(pageNumber + 1)) 
                : 
                res.data.tasks.forEach((nt:taskProps) => ((tasks.map(et => et.id).includes(nt.id) == false && nt?.assigned?.map(a => a.employee_id).includes(userId)? tasks.push(nt) : null)), setPageNumber(pageNumber + 1))
                : 
                setNewTasksLoading(false), res.data.tasks.length < limit? setLastPageFlag(true):setLastPageFlag(false),
                setPaginatedTasksNumber(paginatedTasksNumber + res.data.tasks.length)
                
            ))
            .then(() => setNewTasksLoading(false))
        )
        :
        null
    }, [flag])

    //Sync header and body horizontal scroll 
    useEffect(()=>{
        setScrollLFlag(true)
        const xcord =  document.querySelector('#allTable')?.scrollLeft //get scroll position
        var scrollWidth = document.getElementById('#allTable')?.scrollWidth //get scroll size
        var clientLeft  = document.getElementById('#allTable')?.clientLeft //get scroll offset
        const dif = scrollWidth && clientLeft ? scrollWidth - clientLeft : 0
        xcord && (xcord == 0 || Math.floor(xcord) - 50 <= 0) ? document.querySelector('#TaskFilterHeaderThead')?.scroll(0, 0) 
        : 
        xcord && (xcord <= dif / 2 || xcord > dif/2)? document.querySelector('#TaskFilterHeaderThead')?.scroll(xcord, 0)
        :
        xcord && xcord == dif-20? document.querySelector('#TaskFilterHeaderThead')?.scroll(dif, 0)
        :
        null
    },[document.querySelector('#allTable')?.scrollLeft])
    
    useEffect(() => {
        generalFilterArray.length > 0  ? setGeneralFilterVisibility(true) : setGeneralFilterVisibility(false)
    },[generalFilterArray])

    useEffect(() => {
        setLastPageFlag(false)
    },[reloadAgain, ordinations, filters])//update tasklist table header

    useEffect(() =>{
        if(!assignedToMe){
            tasklist_api.post('/get_settings',{
                        tasklist_id: tasklistid
                }).then(res => (setData(res.data[0])))
        }
    }, [refreshFlag])

    useEffect(() =>{
        if(!assignedToMe){
            tasklist_api.post('/get_settings',{
                        tasklist_id: tasklistid
                }).then(res => (setData(res.data[0])))
        }
    }, [tasklistid])

    /*useEffect(() => { //Disabled while the backend is not sending the correct data for the number of filtered tasks, uncomment when this bug is fixed
        tasks?
            tasklist_api.post('/get_tasklist',{
                tasklist_id: !assignedToMe? tasklistid : 0,
                _limit: 2147483647,
                _page: 1,
                filters: filters,
                ordinations: ordinations
                }).then(resp => (
                    paginatedTasksNumber != undefined? setFilteredTasksNumber(resp.data.count) : null))
                :null
    },[paginatedTasksNumber, enterClicked])*/

    return (
        <>{ assignedToMe? 
                <HeaderTasklist assignedToMe dataSettings={data} refreshSettingsFunction={setRefreshFlag} /> 
                : 
                <HeaderTasklist dataSettings={data} refreshSettingsFunction={setRefreshFlag} />}

            {/* <Container id='allTable' style={{width: flagSideBar ? '74.5%' : '99.3vw'}} onScroll={() => setFlag(!flag)} filterVisibility={generalFilterVisibility}> */}
            <Container id='allTable' className={flagSideBar ? 'sidebarOn' : ''} onScroll={() => setFlag(!flag)} filterVisibility={generalFilterVisibility}>
                    <table>
                        <thead  id="TaskFilterHeaderThead" 
                                className={scrollLFlag == false ?
                                                flagSideBar ?
                                                'disableScroll sidebarOn'
                                                : 'disableScroll'
                                                : flagSideBar ?
                                                'enableScroll sidebarOn'
                                                : 'enableScroll'} 
                                onMouseMove={() => setScrollLFlag(false)} 
                                onMouseEnter={() => setScrollLFlag(false)} 
                                onTouchStart={() => setScrollLFlag(false)} 
                                key={1}>

                            <tr>

                                <th id='Indicator' style={{visibility:'hidden'}}>.</th>

                                <th id='Id'>
                                    <FilterInput 
                                        typeOfInput='number' 
                                        nameOfFilter='Id' 
                                        defaultValue={DefaultFilter('id')}
                                        onChange={(e:any) => setIdFilter(e.target.value)} 
                                        onClick={() => (SetOrdination('id'))}
                                        onKeyDown={(e: any) => e.key == 'Enter'? OnEnter('id', idFilter) : ((e.key == 'Backspace' || e.key == 'Delete') && e.target.value == '') ? CleanFilter('id') : null}
                                        onXClicked={() => (CleanFilter('id'), setIdFilter(''))}
                                        generalFilterArray={generalFilterArray}
                                        ordinationStatus={ ordinations[1]?.field == 'id'? true : ordinations[0]?.field == 'id'? false : undefined}
                                        ordinations={ordinations}
                                        setGeneralFilterVisibility={setGeneralFilterVisibility}/>
                                </th>

                                <th id='CheckBox'>
                                    <label htmlFor='inputCheckBox' style={{display: 'none'}}>{t('Check all tasks for multitask actions')}</label>
                                    <input id='inputCheckBox' type='checkbox' onChange={() => { GlobalChecker() }} checked={globalCheck} />
                                </th>

                                <th id='Status'>
                                    <FilterInput 
                                        typeOfInput='text' 
                                        nameOfFilter='Status' 
                                        defaultValue={DefaultFilter('status')[0] == '1'? t('Opened'): DefaultFilter('status')[0] == '2'? t('Closed') : ''}
                                        onChange={(e:any) => e.target.value != ''? setStatusFilter(t('Opened').includes(e.target.value.trim())? 1 : 2): null} 
                                        onClick={() => (SetOrdination('status'))}
                                        onKeyDown={(e: any) => e.key == 'Enter' && statusFilter != 0? OnEnter('status', statusFilter.toString()) : ((e.key == 'Backspace' || e.key == 'Delete') && e.target.value == '') ? CleanFilter('status') : null}
                                        onXClicked={() => (CleanFilter('status'), setStatusFilter(0))}
                                        onOptionClicked={() => (statusFilter != 0? OnEnter('status', statusFilter.toString()):null)}
                                        generalFilterArray={generalFilterArray}
                                        ordinationStatus={ ordinations[1]?.field == 'status'? true : ordinations[0]?.field == 'status'? false : undefined}
                                        ordinations={ordinations}
                                        showDatalist={true}
                                        setGeneralFilterVisibility={setGeneralFilterVisibility}/>
                                
                                </th>

                                {assignedToMe ?
                                    <th id='Tasklist'>
                                            <FilterInput 
                                                typeOfInput='text' 
                                                nameOfFilter='Tasklist' 
                                                defaultValue={DefaultFilter('tasklist_name')}
                                                onChange={(e:any) => setTasklistFilter(e.target.value.trim())} 
                                                onClick={() => (SetOrdination('tasklist_name'))}
                                                onKeyDown={(e: any) => e.key == 'Enter'? OnEnter('tasklist_name', tasklistFilter) : ((e.key == 'Backspace' || e.key == 'Delete') && e.target.value == '') ? CleanFilter('tasklist_name') : null}
                                                onXClicked={() => (CleanFilter('tasklist_name'), setTasklistFilter(''))}
                                                onOptionClicked={() => (OnEnter('tasklist_name', tasklistFilter))}
                                                generalFilterArray={generalFilterArray}
                                                ordinationStatus={ ordinations[1]?.field == 'tasklist_name'? true : ordinations[0]?.field == 'tasklist_name'? false : undefined}
                                                ordinations={ordinations}
                                                showDatalist={true}
                                                setGeneralFilterVisibility={setGeneralFilterVisibility}/>
                                    </th>
                                    :
                                    null
                                }

                                <th id='Location'>
                                    <FilterInput 
                                        typeOfInput='text' 
                                        nameOfFilter='Location' 
                                        defaultValue={DefaultFilter('location_name')}
                                        onChange={(e:any) => setLocationFilter(e.target.value.trim())} 
                                        onClick={() => (SetOrdination('location_name'))}
                                        onKeyDown={(e: any) => e.key == 'Enter'? OnEnter('location_name', locationFilter) : ((e.key == 'Backspace' || e.key == 'Delete') && e.target.value == '') ? CleanFilter('location_name') : null}
                                        onXClicked={() => (CleanFilter('location_name'), setLocationFilter(''))}
                                        onOptionClicked={() => (OnEnter('location_name', locationFilter))}
                                        generalFilterArray={generalFilterArray}
                                        ordinationStatus={ ordinations[1]?.field == 'location_name'? true : ordinations[0]?.field == 'location_name'? false : undefined}
                                        ordinations={ordinations}
                                        showDatalist={true}
                                        setGeneralFilterVisibility={setGeneralFilterVisibility}/>
                                </th>

                                <th id='Description'>
                                <FilterInput 
                                        typeOfInput='text' 
                                        nameOfFilter='Description' 
                                        defaultValue={DefaultFilter('description')}
                                        onChange={(e:any) => setDescriptionFilter(e.target.value.trim())} 
                                        onClick={() => (SetOrdination('description'))}
                                        onKeyDown={(e: any) => e.key == 'Enter'? OnEnter('description', descriptionFilter): ((e.key == 'Backspace' || e.key == 'Delete') && e.target.value == '') ? CleanFilter('description') : null}
                                        onXClicked={() => (CleanFilter('description'), setDescriptionFilter(''))}
                                        generalFilterArray={generalFilterArray}
                                        ordinationStatus={ ordinations[1]?.field == 'description'? true : ordinations[0]?.field == 'description'? false : undefined}
                                        ordinations={ordinations}
                                        showDatalist={false}
                                        setGeneralFilterVisibility={setGeneralFilterVisibility}/>
                                </th>

                                <th id='Attachments'>
                                    <p>{t('Attach.')}</p>
                                </th>

                                <th id='DateOpened'>
                                    <TaskDateFilter 
                                        nameOfFilter={'D. Opened'} 
                                        defaultValue={DefaultFilter('date_opened')}
                                        onClick={() => (SetOrdination('date_opened',))} 
                                        onChange={(e: any) => SetDateFilter('date_opened', [dateOpenedFilterBegin, dateOpenedFilterEnd])}
                                        onXClick={() => 
                                            (filters?.splice(filters.indexOf(filters.filter(f => f.field == 'date_opened')[0])), 
                                            setEnterClicked(!enterClicked))} 
                                        generalFilterArray={generalFilterArray} 
                                        ordinationStatus={ordinations[1]?.field == 'date_opened'? true : ordinations[0]?.field == 'date_opened'? false : undefined}
                                        dateSeters={[setDateOpenedFilterBegin, setDateOpenedFilterEnd]}
                                        ordinations={ordinations}/>
                                </th>

                                <th id='Owner'>
                                    <FilterInput 
                                        typeOfInput='text' 
                                        nameOfFilter='Owner' 
                                        defaultValue={DefaultFilter('owner_name')}
                                        onChange={(e:any) => setOwnerFilter(e.target.value.trim())} 
                                        onClick={() => (SetOrdination('owner_name'))}
                                        onKeyDown={(e: any) => e.key == 'Enter'? OnEnter('owner_name', ownerFilter) : ((e.key == 'Backspace' || e.key == 'Delete') && e.target.value == '') ? CleanFilter('owner_name') : null}
                                        onXClicked={() =>(setOwnerFilter(''), CleanFilter('owner_name'))}
                                        onOptionClicked={() => (OnEnter('owner_name', ownerFilter))}
                                        generalFilterArray={generalFilterArray}
                                        ordinationStatus={ ordinations[1]?.field == 'owner_name'? true : ordinations[0]?.field == 'owner_name'? false : undefined}
                                        ordinations={ordinations}
                                        showDatalist={true}
                                        setGeneralFilterVisibility={setGeneralFilterVisibility}/>
                                </th>

                                <th id='DueDate'>
                                    <TaskDateFilter 
                                        nameOfFilter={'Due Date'} 
                                        defaultValue={DefaultFilter('due_dates')}
                                        onClick={() => (SetOrdination('due_dates'))} 
                                        onChange={(e: any) => SetDateFilter('due_dates', [dueDateFilterBegin, dueDateFilterEnd])}
                                        // onXClick={() => (CleanFilter('due_dates'), (SetDateFilter('due_dates',['',''])))}
                                        onXClick={() => (CleanFilter('due_dates'))}
                                        generalFilterArray={generalFilterArray} 
                                        ordinationStatus={ordinations[1]?.field == 'due_dates'? true : ordinations[0]?.field == 'due_dates'? false : undefined}
                                        dateSeters={[setDueDateFilterBegin, setDueDateFilterEnd]}
                                        ordinations={ordinations}/>
                                </th>

                                <th id='AssignedTo'>
                                    <FilterInput 
                                        typeOfInput='text' 
                                        nameOfFilter='Assigned To' 
                                        defaultValue={assignedToMe? userName : DefaultFilter('assigned')}
                                        onChange={(e:any) => assignedToMe? alert(t('You cannot clean the assigned filter in assigned to me page')): setAssignedFilter(e.target.value.trim())} 
                                        onClick={() => (SetOrdination('assigned'))}
                                        onKeyDown={(e: any) => e.key == 'Enter'? OnEnter('assigned', ownerFilter) : ((e.key == 'Backspace' || e.key == 'Delete') && e.target.value == '') ? CleanFilter('assigned') : null}
                                        onXClicked={() => (assignedToMe? alert(t('You cannot clean the assigned filter in assigned to me page')): CleanFilter('assigned'), setAssignedFilter(''))}
                                        onOptionClicked={() => (OnEnter('assigned', assignedFilter))}
                                        generalFilterArray={generalFilterArray}
                                        ordinationStatus={ ordinations[1]?.field == 'assigned'? true : ordinations[0]?.field == 'assigned'? false : undefined}
                                        ordinations={ordinations}
                                        showDatalist={true}
                                        setGeneralFilterVisibility={setGeneralFilterVisibility}/>
                                </th>

                                <th id='Comments'>
                                <FilterInput 
                                    typeOfInput='text' 
                                    nameOfFilter='Comments' 
                                    defaultValue={DefaultFilter('comments')}
                                    onChange={(e:any) => setCommentFilter(e.target.value.trim())} 
                                    onClick={() => (SetOrdination('comments'))}
                                    onKeyDown={(e: any) => e.key == 'Enter' ? OnEnter('comments', commentFilter): ((e.key == 'Backspace' || e.key == 'Delete') && e.target.value == '') ? CleanFilter('comments') :null}
                                    onXClicked={() => (CleanFilter('comments'), setCommentFilter(''))}
                                    generalFilterArray={generalFilterArray}
                                    ordinationStatus={ ordinations[1]?.field == 'comments'? true : ordinations[0]?.field == 'comments'? false : undefined}
                                    ordinations={ordinations}
                                    setGeneralFilterVisibility={setGeneralFilterVisibility}/>
                                </th>

                            </tr>

                        </thead>

                        <tbody>
                        {checkedTasksList.length > 0 ? assignedToMe ?
                                <tr>
                                    <td colSpan={13} className="tdOptions">
                                        <HeaderTasklistOptions usingAt="AssignedToMe" filterVisibility={generalFilterVisibility} axillarVar={checkedTasksList} dataSettings={data}/>
                                    </td>
                                </tr>
                                :
                                <tr>
                                    <td colSpan={12} className="tdOptions">
                                        <HeaderTasklistOptions filterVisibility={generalFilterVisibility} axillarVar={checkedTasksList} dataSettings={data}/>
                                    </td>
                                </tr>
                                
                                :
                                null
                            }
                            {!isLoading ? 
                                tasks? 
                                    tasks.map((t, i) =>  {
                                        return Boolean(t.deleted) == false? 
                                            <Row key={i}
                                                i={i} 
                                                data={t} 
                                                settings={data}
                                                TasksAssignedToMe={assignedToMe? true : false} /> 
                                            : null}) 
                                        : null 
                                    :
                                        <tr>
                                            <td><Spin/></td>
                                        </tr>}
                            {newTaskLoading? <tr>
                                                <td></td>
                                                <td><Spin/></td>
                                            </tr>:null}
                        </tbody>

                    </table>
            </Container>
            {/* Disabled while the backend is not sending the correct data for the number of filtered tasks, uncomment when this bug is fixed
                <FilteredTasksNumberIndicator filteredData={filteredTasksNumber} paginatedData={paginatedTasksNumber} filters={filters} assignedToMe={assignedToMe} onClick={() => (assignedToMe? (setFilters([{field:'assigned', value:[userName]}, {field:'deleted', value:['false']}]), setAtmFlag(0)) : setFilters([{field:'deleted', value:['false']}]), setFilteredTasksNumber(undefined) ,setGeneralFilterArray([]) ,setGeneralFilterVisibility(false), setEnterClicked(!enterClicked))}/>
            */}
            
        </>
    )
}