import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { addDays } from 'date-fns';
import * as locales from 'date-fns/locale'
import  { DateRange }  from 'react-date-range'
import moment from 'moment';

import { Container } from './styles';
import { AppContext } from '../../services/context';

/*#########################################################
***Version

    220817  FGF                 Initial Version
    221223  MAM                 Refactoring

***Description***

    component DateRangePicker
        Shows a calendar to pick the date

***Props***
    onChange        The function for date selection change
    dateSeters      Parent state seters
    insideModal     If the date picker is inside a modal
    defaultValue    The Date range picker's default value
    startDate       starting date
    endDate         ending date
    key             state of selection

##########################################################*/

interface DateRangePickerProps {
    onChange: () => void;
    dateSeters: Array<Dispatch<SetStateAction<string>>>
    insideModal?:boolean
    defaultValue?: Array<string>
}

interface DateRangeProps{
    startDate?: Date
    endDate?: Date
    key?: string
}


export function DateRangePicker({ onChange, dateSeters, insideModal, defaultValue }: DateRangePickerProps){
    
    const {ReloadTasksAgain} = useContext(AppContext)
    //Initialize states
    const [state, setState] = useState<DateRangeProps>({});
    const [flag, setFlag] = useState<boolean>(false)
    const [reloadCleared, setReloadCleared] = useState<boolean>(false)
    //Get user's navigator language
    const userLang = navigator.language

    //Set the parent's date states
    function SetDateFilter(data:DateRangeProps){
            dateSeters[0](moment(data.startDate).format('MM/DD/YYYY'))
            dateSeters[1](moment(data.endDate).format('MM/DD/YYYY'))
            setFlag(!flag)
            
    }

    //First time it is rendered
    useEffect(() => {
        setReloadCleared(false)
        setState(
            {
                startDate: defaultValue? moment(defaultValue[0]).toDate() : new Date(),
                endDate: defaultValue? moment(defaultValue[1]).toDate() : addDays(new Date(), 6),
                key: 'selection'
            }
        )
    }, [])

    useEffect(() => {
        reloadCleared ==true?
            (SetDateFilter(state))
        :
            null
    }, [reloadCleared])

    useEffect(() => {
        reloadCleared ==true?
            (onChange(),
            ReloadTasksAgain(),
            setReloadCleared(false))
        :
            null
    }, [flag])
    
    return(
        <>
            <Container insideModal={insideModal}>
                <DateRange
                    editableDateInputs={true}
                    onChange={(item:any) => ( setState(item.selection), setReloadCleared(true))}
                    moveRangeOnFirstSelection={false}
                    ranges={[state]}
                    locale={userLang == 'pt-BR' ? locales.ptBR : userLang.includes('es')? locales.es : locales.enUS}
                    weekdayDisplayFormat='EEEEEE'
                /> 
            </Container>
        </>
        
    )
}
