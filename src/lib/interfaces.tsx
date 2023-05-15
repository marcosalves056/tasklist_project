import { ReactNode } from 'react';

export interface AppContextProviderProps {
    children: ReactNode;
}
export interface LoginResponse {
    token: string
    portals: Array<Portal>
}
export interface Portal{
    id: number,
    name: string
}
export interface Filter {
    field: string,
    value: Array<string>
}
export interface Ordination {
    field: string,
    value: 0|1
    /*
    0 == increasing
    1 == decreasing
    */
}
export interface taskListsProps {
    length: number;
    active: string
    tasklist_name: string
    totalTasks: number
    totalTasksClosed: number
    totalTasksOpen: number
    display: string
    project?: string
    project_id?: number
    tasklist_id: string
    role: number
    sub_project?: string
    filters: Array<Filter>
    ordinations: Array<Ordination>
}

export interface taskProps {
    assigned?: [
        {
            employee_name: string
            employee_id: string
        },
    ],
    attachments?: [
        {
            ext: string,
            filePath: string,
            id: number
        }
    ],
    date_closed?: number | null,
    date_deleted?: number | null,
    date_opened: string,
    deleted?: string,
    description: string,
    due_dates?: [
        {
            dueDate: string
        }
    ],
    comments?: [
        {
            comment: string,
            id: number,
            employee_name: string,
            timestamp: string | null
        }
    ],
    id: number,
    location_name: string,
    owner_name: string,
    listen: boolean,
    status: number,
    tasklist_id: number,
    tasklist_name: string
}

export interface Location {
    id: number,
    location: string,
    tasklist: number
}

export interface EventObject{
    target:{
        value:string
    }
}

export interface Settings{
    tasklist_name: string
    project_id: number
    project_name: string
    subproject_id: number
    subproject_name: string
    notification_id: number
    notification_name: string
    weekly_email: string
    active: string
}

export interface Member{
    id: number,
    name: string,
    email: string,
    access_level: number,
    weekly_email: boolean
}

export interface SelectOption {
    value: string | number
    label: string
}

export interface Attachment{
    preview: string
    attachment_id: number
    attachment_name: string
}

export interface SimpleTask{
    location: string
    description: string
}

export interface Portal{
    id: number
    name: string
}

export interface SelectOption {
    value: number | string,
    label: string,
}

export interface User {
    id: number,
    display: string,
}

export interface CommentProps {
    EditComment?: (id: number, editedComment: string, functionSetIsEditMode: void) => void
    members?: Array<SelectOption>,
    task_id?: number
    comment: string,
    id: number,
    employee_name: string,
    timestamp: string | null
    saving?: boolean
    active?: boolean
}

export interface HistoryItem {
    employee_id: number,
    employee_name: string,
    log_id: number,
    log: string,
    tasklist_id: string,
    task_id: string,
    task_description:string
    timestamp: string
}

export interface NotificationsProps {
    id: number;
    task_id: string,
    task_name: string,
    description: string
    name: string,
    message: string,
    tasklist_name: string,
    tasklist_id: string
    read: string
    timestamp: string
}


export interface Client{
    client_id: number
    client_name: string
}