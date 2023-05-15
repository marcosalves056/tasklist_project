import { Dispatch, SetStateAction } from 'react'

import tasklist_api from '../services/tasklist_api'

import { Member, SelectOption, Location } from './interfaces'

export function GetMembers(member_list_set: Dispatch<SetStateAction<Array<SelectOption>|undefined>>, tasklist_id?:string|number) {

    const params = {
        tasklist_id: tasklist_id
    }

    const listOfEmpoleiesTemp: Array<SelectOption> = []
    let tasklistMembers: Array<Member> = []

    tasklist_id? tasklist_api.post('/get_members', params)
        .then((res) => (tasklistMembers = (res.data)))
        .then(() => tasklistMembers.filter(( m : Member) => m.access_level != 3).map(tm => listOfEmpoleiesTemp.push({ value: tm.id, label: tm.name })))
        .then(() => member_list_set(listOfEmpoleiesTemp)):null
}


  //Get the tasklist locations
export function GetLocations(location_list_set: Dispatch<SetStateAction<Array<Location>|undefined>>, tasklist_id?:string|number) {

    const params = {
      tasklist_id: tasklist_id
    }

    tasklist_api.post('/get_locations', params)
      .then((res) => {
        location_list_set(res.data)
      })
  }