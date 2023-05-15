import moment from 'moment';

import pdfMake from 'pdfmake/build/pdfmake';
import { Member, taskProps } from '../../lib/interfaces';

/*##########################################################  

*** Version ***

    220825 MAM                         Initial version

*** Description ***

    Create PDF 

*** Props ***
    tasklistData                    Resources about the tasklist
    tasksData                       Resources about the tasks
    userName                        The user name
    userPortalLogo                  The portal logo
    filtered                        If it's a filtered print
    tasks                           Tasks selected
    members                         Members assigned to the task

##########################################################*/

interface GetTasklistObjectProps{
    tasks: Array<taskProps>
    members: Array<Member>
}

//Define pdf patterns
function PdfTemplate(tasklistData : GetTasklistObjectProps, tasksData : Array<taskProps>, userName : string, userPortalLogo : string, filtered? : boolean, assignedToMe?:boolean) {
    const userLang = navigator.language
    pdfMake.fonts = {
        Roboto: {
            normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
            bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
            italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
            bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
            }
    }

    //Get tas status
    function GetStatus(task_status: number, due_dates: Array<{dueDate: string}>){
        if (task_status == 1 && due_dates.length > 0 && Date.parse((due_dates[due_dates.length - 1].dueDate)) < Date.now()){
            return 3
        } else {
            return task_status
        }
    }

    //Return total task number by status
    function CountTasksNumberByStatus(status: 1|2|3){
        var lateTasksNumberTemp = 0;
        tasksData.map((task) => GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == status?
        lateTasksNumberTemp++ : null);
        return lateTasksNumberTemp
    }

    //Get formatted date
    function getFormattedDate(date: number | string | null, at:string) {
        /*##########################################################  
        Check if date exists and return formatted date or null
        date (datetime)
            ex: 2021-05-10T14:24:33.056566Z
        ##########################################################*/

        let formattedDate = null
        if (date && at == 'header') {
            formattedDate = moment(date).format('DD/MM/YYYY HH:mm')
        } else if(date && at == 'body'){
            formattedDate = moment(date).format('DD/MM/YYYY')
        }
        return formattedDate
    }


    const columnsTitle = userLang != 'pt-BR' && userLang.includes('es') == false?
        [
            { text: 'Id' },
            { text: 'Status' },
            { text: 'Location' },
            { text: 'Description' },
            { text: 'D. Opened' },
            { text: 'Due Date' },
            { text: 'Assigned To' },
            { text: 'Comments' }
        ]
    : userLang.includes('es')? 
        [
            { text: 'Id' },
            { text: 'Estado' },
            { text: 'Localización' },
            { text: 'Descripción' },
            { text: 'Apertura' },
            { text: 'F. Limite' },
            { text: 'Associado a' },
            { text: 'Comentarios' }
        ]
    :
        [
            { text: 'Id' },
            { text: 'Estado' },
            { text: 'Localização' },
            { text: 'Descrição' },
            { text: 'Abertura' },
            { text: 'D. Limite' },
            { text: 'Associado a' },
            { text: 'Comentários' }
        ]

    const columnsContent =
    {
        widths: [25, 30, 55, 100, 45, 50, 50, 90],
        body: tasksData.map(task =>

            [
                { text: task.id, fillColor: GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 1 ? 'white' : GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 2 ? '#E3F3DF':'#F6D0D0' },
                { text: GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: '02/10/2022'}]) != 2 ? 'Open' : 'Closed', fillColor: GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 1 ? 'white' : GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 2 ? '#E3F3DF':'#F6D0D0' },
                { text: task.location_name, fillColor: GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 1 ? 'white' : GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 2 ? '#E3F3DF':'#F6D0D0' },
                { text: task.description, fillColor: GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 1 ? 'white' : GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 2 ? '#E3F3DF':'#F6D0D0' },
                { text: getFormattedDate(task.date_opened, 'body'), fillColor: GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 1 ? 'white' : GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 2 ? '#E3F3DF':'#F6D0D0' },
                { ul: task.due_dates?.map(dueDate => getFormattedDate(dueDate.dueDate, 'body')), fillColor: GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 1 ? 'white' : GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 2 ? '#E3F3DF':'#F6D0D0' },
                { ul: task.assigned?.map(assigned => assigned.employee_name), fillColor: GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 1 ? 'white' : GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 2 ? '#E3F3DF':'#F6D0D0' },
                { ul: task.comments?.map(comment => comment.comment.trim() != ''? `${comment.employee_name}: ${comment.comment} - ${getFormattedDate(comment.timestamp, 'body')}` : null) , fillColor: GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 1 ? 'white' : GetStatus(task.status, task.due_dates? task.due_dates : [{dueDate: ''}]) == 2 ? '#E3F3DF':'#F6D0D0' }],

        )
    }

    let docDefinition = {
        footer: function(currentPage:number, pageCount:number) { return userLang != 'pt-BR'?
                [{text: currentPage.toString() + ' of ' + pageCount, alignment: 'right', margin:20}]
            :
                [{text: currentPage.toString() + ' de ' + pageCount, alignment: 'right', margin:20}]},
        content: [
            {
                style: 'headerStyle',
                bold: true,
                columns: [
                    { image: `data:image/png;base64,${userPortalLogo}`, width: 55},
                    { 
                        text: 
                            assignedToMe == true? 
                                navigator.language == 'en'? 
                                    `Tasks assigned to ${userName}` 
                                : navigator.language == 'es'?
                                    `Tareas asignadas a ${userName}`
                                : 
                                    `Tarefas associadas a ${userName}`
                            :
                                tasklistData.tasks[0].tasklist_name, 
                        margin: [0, 20,0,0]
                    }, 
                    { text: getFormattedDate(Date.now(), 'header'), style: 'dateHeader', width: 55, margin: [0, 17,0,0] },

                ]

            },
            {
                style: 'tableHeadStyle',
                table: {
                    widths: [25, 30, 55, 100, 45, 50, 50, 90],
                    body: [
                        columnsTitle
                    ]
                }

            },
            {
                style: 'tableStyle',

                table: columnsContent

            },
            {
                style: 'tableHeadStyle',
                text: userLang != 'pt-BR'? 
                    [
                        `\n
                        Printed by: ${userName} ${filtered? '(filtered)':''}
                        Open tasks: ${CountTasksNumberByStatus(1)}
                        Closed tasks: ${CountTasksNumberByStatus(2)}
                        Late tasks: ${CountTasksNumberByStatus(3)}
                        `
                    ]
                :
                    [
                        `\n
                        Impresso por: ${userName} ${filtered? '(filtrado)':''}
                        Tarefas abertas: ${CountTasksNumberByStatus(1)}
                        Tarefas fechadas: ${CountTasksNumberByStatus(2)}
                        Tarefas atrasadas: ${CountTasksNumberByStatus(3)}
                        `
                    ]

            }

        ],
        defaultStyle:{
            font: 'Roboto'
        },
        styles: {
            headerStyle: {
                alignment: 'center',
                fontSize: 15,
                margin: [0, 0, 0, 20]
            },
            tableHeadStyle: {
                alignment: 'center',
                lineHeight: 1,
                bold: true,
                fontSize: 9
            },
            tableStyle: {
                lineHeight: 1,
                fontSize: 7
            },
            dateHeader: {
                alignment: 'end',
                fontSize: 10
            }
        }
    }

    return pdfMake.createPdf(docDefinition as any).open()

}

export default PdfTemplate