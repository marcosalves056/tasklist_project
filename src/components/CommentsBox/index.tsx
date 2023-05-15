import { ReactNode, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import tasklist_api from '../../services/tasklist_api';
import { Comment } from '../Comment';
import { Container } from './styles'
import { CommentProps, SelectOption } from '../../lib/interfaces';
import { AppContext } from '../../services/context';

/*########################################################## 
***Version

    220622  FGF                 Initial Version
    220722  LVM                 SomeChanges
    221223  MAM                 Refactoring

***Description***

    component CommentsBox
        Specific textarea to post comments

***Props***
    data                        The CommentsBox source data
    taskId                      The parent task id
    members                     The list of related members
    children                    The Comment component
    saving                      If th task is being saved
	active						It the task is active

##########################################################*/

interface CommentBoxProps {
    data?: Array<CommentProps>
    taskId: number
    members?: Array<SelectOption>
    children: ReactNode
    saving: boolean
	active?: boolean
}

export function CommentsBox({ data, taskId, members, children, saving, active }: CommentBoxProps) {

    //initialize the variables
    const { t } = useTranslation();
	const { userName } = useContext(AppContext)

	//enable edit comment
    function EditComment(id: number, editedComment: string, functionSetIsEditMode: void) {
		
      	//initialize the variables
		var comments: Array<CommentProps> = []
		//does the mapping of the array of objects received
		data?.map(com => {
			//if the id is the same, modify the object's 'comment' field
			if (com.id == id && com.employee_name == userName) {
			com.comment = editedComment
			}
			//add the object in the array
			comments.push(com)
		})

		data?.filter(d => d.id == id)[0].employee_name == userName?
			tasklist_api.put('/comments/', {
				task_id: taskId,
				comment_id: id,
				comment: editedComment
			}).then(() => {
				functionSetIsEditMode
			})
		:
			null
    }

    return (
		<Container>
			<h4>{t('Comments')}:</h4>
				<div id='divComments'>
				{
					data?.map((a) => 
                            <Comment active={active} key={a.id} members={members} id={a.id} EditComment={(id: number, editedComment: string, functionSetIsEditMode: void) => EditComment(id, editedComment, functionSetIsEditMode)} task_id={taskId} saving={saving} comment={a.comment} employee_name={a.employee_name} timestamp={a.timestamp} />
				)
				}
				</div>
			{children}
		</Container>
    )
}