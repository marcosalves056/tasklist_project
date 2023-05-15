import { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

import tasklist_api from '../../services/tasklist_api'
import { AppContext } from '../../services/context'
import { SimpleTask } from '../../lib/interfaces'
import { Modal, ModalBody, ModalBotton, ModalTop } from '../ModalGeneric'
import { Button } from '../../util/Button'
import { Spin } from '../../util/Spin'
import { Container } from './styles'

/*##########################################################  

*** Version ***

220829 LVM                         Initial version

*** Description ***

ModalImportTasks 

*** Props ***
functionCloseOpenModal             Function to Open and Close Modal
##########################################################*/

interface ModalImportTasksProps {
    functionCloseOpenModal: () => void
}

export function ModalImportTasks({ functionCloseOpenModal }: ModalImportTasksProps) {

    const { t } = useTranslation()
    const { tasklistid } = useParams()
    const { ReloadTasksAgain } = useContext(AppContext)
    //Initialize the states
    const [file, setFile] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const fileReader = new FileReader();

    // convert the csv to JSON
    function csvFileToJSON(string: any) {

        var array = string.toString().split(`\r\n`) //split the string into array elements
        var data = []
        for (const r of array) {//convert the array elements by coma to get location and description values
            let row = r.toString().split(',')
            data.push(row)
        }
        var heading = data[0].map((head:string)=> head.toLowerCase()) //get the header of the csv file
        var ans_array = []
        for (var i = 1; i < data.length; i++) { //feed the JSON object
            var row = data[i]
            var obj: any = {}
            for (var j = 0; j < heading.length; j++) {
                if (!row[j]) { //set the last element
                    row[j] = 'NA';
                }

                obj[heading[j].replaceAll(' ', '_')] = row[j].toString().replaceAll(' ', ' ')
            }
            ans_array.push(obj)
        }

        ans_array.pop()//remove the last element
        return ans_array
    };

    //Call the function cvsFileToJSON and send the JSON to back-end
    function CreateManyTasks() {

        setIsLoading(true)

        var tasksInJson : Array<SimpleTask> = []

        if (file) {

            fileReader.readAsText(file)

            fileReader.onload = async function () {
                const text = fileReader.result
                tasksInJson = csvFileToJSON(text)
                tasksInJson.length > 0? (
                    tasklist_api.post('/many_tasks',{
                        tasklist_id: tasklistid,
                        tasks: tasksInJson
                    })
                    .then(()=>{
                        setIsLoading(false)
                        ReloadTasksAgain()
                        functionCloseOpenModal()
                    }))
                    .catch(() => alert(t('CSV file formatted incorrectly. Please, check the file and try again.')))
                    :
                    console.error('There is no tasks to import')
            }
            fileReader.onerror = function () {
                alert(fileReader.onerror)
            }
        }
        
    };

    return (
        <Container>
            <Modal functionSetModal={() => { functionCloseOpenModal() }}>
                <ModalTop
                    functionSetModal={() => { functionCloseOpenModal() }}>
                    {t('Import Tasks')}
                </ModalTop>
                <ModalBody>
                    <input
                        type={'file'}
                        id={'csvFileInput'}
                        accept={'.csv'}
                        onChange={(e: any) => setFile(e.target.files[0])}
                    />
                </ModalBody>
                <ModalBotton>
                    <Button
                        functionButton={() => { CreateManyTasks() }}>
                        {isLoading ? <Spin /> : t(`Import`)}
                    </Button>
                </ModalBotton>
            </Modal>

        </Container>
    )
}