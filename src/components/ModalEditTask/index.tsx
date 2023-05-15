import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Select from 'react-select';
import { useParams } from 'react-router-dom';

import tasklist_api from '../../services/tasklist_api';
import { AppContext } from '../../services/context';
import { Modal, ModalBody, ModalTop, ModalBotton } from '../ModalGeneric';
import InputText from '../../util/InputText';
import InputTextArea from '../../util/InputTextArea';
import { ButtonSwitch } from '../../util/ButtonSwitch';
import { Button } from '../../util/Button';
import InputDatePicker from '../../util/InputDatePicker';
import { Spin } from '../../util/Spin';
import { DropZone } from '../DropZone/index';
import { CommentsBox } from '../CommentsBox';
import { History } from '../History';
import { taskProps, Location, Settings } from '../../lib/interfaces';
import { Container, ContainerHeaderModal } from './styles';
import { GetLocations, GetMembers } from '../../lib/get_functions';
import { ButtonIcon } from '../../util/ButtonIcon';
import TooltipIcon from '../../assets/icons/tooltipIcon.svg'

/*########################################################## 
***Version

    220626  FGF                 Initial Version
    220708  MAM                 Implement react-select
    220722  FGF                 Implement delete function

***Description***

    component ModalEditTask

***Props***
    functionCloseOpenModal   Sets modal visibility 
    dados                    Return task data
    settings                 Stores task settings
    assgnedToMe              If the task is assigned to the user          

##########################################################*/

interface ModalEditTaskProps {
  functionCloseOpenModal: () => void;
  dados: taskProps;
  settings?: Settings;
  assignedToMe?: boolean;
}

interface SelectOption {
  value: number | string,
  label: string,
}

export function ModalEditTask({functionCloseOpenModal, dados, settings, assignedToMe}: ModalEditTaskProps) {

  const { t } = useTranslation();
  //Get the tasklist name
  const { tasklistid } = useParams()
  const { ReloadTasksAgain, setClickOutside } = useContext(AppContext);
  const defaultEmployees: Array<SelectOption> = [];
  ///Push deFaultEmployees with it's content provided by db
  dados.assigned?.map((dat) =>
    defaultEmployees.push({
      label: dat.employee_name,
      value: dat.employee_id,
    })
  );
  const [locations, setLocations] = useState<Array<Location>>()
  const [isOpenTask, setIsOpenTask] = useState(
    dados.status == 1 ? true : false
  );
  const [selectedEmployee, setSelectedEmployee] = useState<Array<SelectOption>>(defaultEmployees)
  const [selectedDate, setSelectedDate] = useState('')
  const [isInputDateVisible, setIsInputDateVisible] = useState(false);
  const [inputTextAreaComment, setInputTextAreaComment] = useState('')
  const [isSpanSelectVisible, setIsSpanSelectVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isHistoryVisible, setHistoryVisible] = useState(false);
  const [isParticipating, setIsParticipating] = useState(Boolean(dados.listen));
  const [description, setDescription] = useState(dados.description)
  const [location, setLocation] = useState(dados.location_name)
  const [listOfEmployees, setListOfEmployees] = useState<Array<SelectOption>>()
  const [listenTooltipFlag, setListenTooltipFlag] = useState<boolean>(false)
  const userLang = navigator.language
  const format = () => { return userLang != 'pt-BR' && userLang.includes('es') == false ? 'MM/DD/YYYY' : 'DD/MM/YYYY'};

  //send edit to back-end
  async function EditTask(data: taskProps) {
    setIsSaving(true);
    setClickOutside(false);

    //object constructor UserAssigned
    const isOpen = isOpenTask ? '1' : '2';

    //Verify if location and description fields aren't empty or field by blank spaces
    if (location.trim() !== '' && location.trim() !== '') {
      tasklist_api.put('/task', {
        task_id: data.id,
        status: isOpen,
        location: location.trim(),
        description: description.trim(),
        assigned: selectedEmployee.map(se => Number(se.value)),
        due_date: selectedDate != '' ? moment(selectedDate).format('MM/DD/YYYY') : '',
        listen: isParticipating,
        deleted: false

      })
        .then(() => {
          ReloadTasksAgain();
          setIsSaving(false);
          functionCloseOpenModal();
        })
        .catch(() => { });
        inputTextAreaComment != ''? 
          tasklist_api.post('comments',{
            task_id: data.id,
            comment: inputTextAreaComment
          })
        :
          null
    } else { //if location and description fields are empty or field by blank spaces, alert user
      alert(t('Required field not already filled! Please fill them before create a task.'))
      setIsSaving(false)
    }
  }

  //send delete task to back-end
  async function DeleteTask(data: taskProps) {
    setIsDeleting(true);
    setClickOutside(false);
    const dateNow = moment(Date.now()).format()
    tasklist_api.put('/task/', {
      task_id: data.id,
      status: data.status,
      location: data.location_name,
      description: data.description,
      listen: data.listen,
      deleted: true
    })
      .then(() => {
        ReloadTasksAgain();
        setIsDeleting(false);
        functionCloseOpenModal();
      })
      .catch();
  }

  //Return owner task name
  function GetInteractions() {
    var names: Array<string> = [dados.owner_name]
    dados.assigned?.filter(a => names.includes(a.employee_name) == false ? names.push(a.employee_name) : null)
    dados.comments?.filter(c => names.includes(c.employee_name) == false ? names.push(c.employee_name) : null)

    return names
  }

  //Return the assignedToMe task state
  function EditCleared(){
    return Boolean(settings?.active) || assignedToMe
  }

  if(!locations || locations.length == 0){
    GetLocations(setLocations, dados.tasklist_id)
  }

  if(!listOfEmployees || listOfEmployees.length == 0){
    GetMembers(setListOfEmployees, dados.tasklist_id)
  }
  function openSpanDate() { 
    EditCleared()?
    setIsInputDateVisible(!isInputDateVisible)
    :
    alert(t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task'))
  }
  function openSpanAssign() { 
    EditCleared()?
    setIsSpanSelectVisible(!isSpanSelectVisible)
    :
    alert(t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task'))
  }
  
  return (
    <Container>
      <Modal functionSetModal={functionCloseOpenModal}>
        <ModalTop functionSetModal={functionCloseOpenModal}>
          <ContainerHeaderModal>
            <strong>{dados.owner_name} </strong>
            <p> {t('created this task on')} </p>
            <strong>{moment(dados.date_opened).format(format())}</strong>
          </ContainerHeaderModal>
        </ModalTop>
        <ModalBody>
          <Container>
          {EditCleared()?
              null
            : 
              <h6 style={{color:'var(--color-red-primary)', textAlign:'center', paddingBottom:'0.5rem', fontWeight:'500'}}>{t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task')}</h6>}
            <div id='divStatusLocation'>
              <label htmlFor='statusSwitch'>
                {t('Status')}: <span>{isOpenTask ? t('Open') : t('Close')} </span>
              </label>
              <ButtonSwitch
                id='statusSwitch'
                checked={!isOpenTask}
                functionButtonSwitch={() => {EditCleared()?
                  setIsOpenTask(!isOpenTask)
                  :
                  alert(t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task'))
                }}
              />
              <label htmlFor='inputLocation'>*{t('Location')}:</label>
              <InputText
                id='inputLocation'
                list='Locations'
                defaultValue={dados.location_name}
                disabled={!EditCleared()}
                onChange={(e) =>
                  e.target.value !== dados.location_name
                    ? (setLocation(e.target.value), setClickOutside(true))
                    : setClickOutside(false)
                }

              />
              <datalist id='Locations'>
                {locations?.map((location, i) => {
                  return <option key={i} value={location.location} />;
                })}
              </datalist>
            </div>
            <div id='divDescription'>
              <label htmlFor='inputDescription'>*{t('Description')}:</label>
              <InputTextArea
                id='inputDescription'
                placeholder={t('Type the description here...')}
                defaultValue={dados.description}
                disabled={!EditCleared()}
                onChange={(e) =>
                  e.target.value !== dados.description
                    ? (setDescription(e.target.value), setClickOutside(true))
                    : setClickOutside(false)
                }
              />
            </div>
            <div id='divAttachment'>
              <DropZone saving={isSaving} taskId={dados.id} active={EditCleared()}/>
            </div>
            <div id='divAssignedTo'>
              <label htmlFor='openAssignedTo'>{t('Assigned To')}:</label>
              <div>
                {dados.assigned && dados.assigned.length >= 1 && dados.assigned.map((dat, i) => {
                  return (
                    <label key={i}>
                      {' '}
                      {i > 0 ? '/ ' : ''}
                      {dat.employee_name}
                    </label>
                  );
                })}
              </div>
              <div className='buttonPlus'>
                <ButtonIcon IconType='BsPlus' functionButtonIcon={openSpanAssign}/>
              </div>
              {isSpanSelectVisible ? (
                <span id='spanSelect'>
                  <Select
                    id='selectAssignedTo'
                    options={listOfEmployees}
                    defaultValue={defaultEmployees}
                    isClearable
                    isMulti
                    isSearchable
                    onChange={(e: any) => {
                      setClickOutside(true), setSelectedEmployee(e);
                    }}
                  />
                </span>
              ) : null}
            </div>
            <div id='divDueDate'>
              <label htmlFor='openDueDate'>{t('Due Date')}:</label>
              <span>
                {dados.due_dates && dados.due_dates?.length >= 1 ? moment(dados.due_dates[dados.due_dates.length - 1].dueDate).format(format()) : null}
              </span>
              <div className='buttonPlus'>
                <ButtonIcon IconType='BsPlus' functionButtonIcon={openSpanDate}/>
                </div>
              {isInputDateVisible ? (
                <InputDatePicker
                  id='inputDueDate'
                  onChange={(e) => {
                    setClickOutside(true),
                      setSelectedDate(e.target.value);
                  }}
                />
              ) : null}
            </div>
            <div id='divNotification'>
              <label>{t('Listen')}:</label>
              <div className='tooltip' onMouseEnter={() => setListenTooltipFlag(true)} onMouseLeave={() => setListenTooltipFlag(false)}>
                <img  src={TooltipIcon} alt='tooltip icon' />
                {listenTooltipFlag ? <span>{t('Set if the user will recives notifications for every change in this task')}</span> : null}
              </div>
              <ButtonSwitch
                checked={isParticipating}
                functionButtonSwitch={() => { EditCleared()?
                  setIsParticipating(!isParticipating)
                  :
                  alert(t('Archived Tasklist. Please ask the tasklist admin to set it changeable before create new task'))
                }
                } />
            </div>
            <div id='divInteractions'>
              <label>{t('Interactions')}:</label>
              <span>{GetInteractions().length > 1 ? (GetInteractions().splice(0, GetInteractions().length - 1).map(i => `${i}, `).concat(GetInteractions()[GetInteractions().length - 1])) : GetInteractions()}</span>
            </div>
            <div id='divComments'>
              <CommentsBox active={EditCleared()} data={dados.comments?.filter(comment => comment.comment.length > 0)} taskId={dados.id} members={listOfEmployees} saving={isSaving}>
                <InputTextArea id='inputComment' disabled={!EditCleared()} placeholder={t('Insert a comment here...')} onChange={(e) => e.target.value !== '' ? setInputTextAreaComment(e.target.value) : null}/>
              </CommentsBox>
            </div>
            <div
              id='divHistory'
            >
              {isHistoryVisible ? <History taskId={dados.id} setVisibilityFunction={setHistoryVisible}/> :
                <label onClick={() => setHistoryVisible(true)}>{t('Show History')}</label>}
            </div>
          </Container>
        </ModalBody>
        <ModalBotton>
          <Button
            id='deleteButton'
            variant='red'
            disabled={!EditCleared()}
            functionButton={() => {
              DeleteTask(dados);
            }}
          >
            {isDeleting ? <Spin /> : t('Delete')}
          </Button>
          <Button
            id='saveButton'
            variant='green'
            disabled={!EditCleared()}
            functionButton={() => {
              EditTask(dados);
            }}
          >
            {isSaving ? <Spin /> : t('Save')}
          </Button>
        </ModalBotton>
      </Modal>
    </Container>
  )
}
