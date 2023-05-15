import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Mention, MentionsInput } from 'react-mentions'

import tasklist_api from '../../services/tasklist_api'
import { AppContext } from '../../services/context'
import { CommentProps, User } from '../../lib/interfaces'
import { ContainerComment } from './styles'
import { ButtonIcon } from '../../util/ButtonIcon'


/*########################################################## 
***Version

    221223  MAM                 Recomponentize

***Description***

    component Comments
        Shows and put (update) comments

***Props***
    EditComment                 Function to edit a comment
    members                     Mentions library source 
    task_id                     The parent task id
    comment                     The current comment
    id                          The comment id
    employee_name               Who did the comment
    timestamp                   When the comment was posted
    saving                      If the task is being saved
    active                      If the task is active

##########################################################*/

export function Comment({ comment, id, employee_name, timestamp, members, EditComment, task_id, saving, active }: CommentProps) {

    //initialize the variables
    const { userName } = useContext(AppContext)
    const [isEditMode, setIsEditMode] = useState(false)
    const [newComment, setNewComment] = useState(comment)
    const userLang = navigator.language
    const format =  userLang != 'pt-BR' && userLang.includes('es') == false ? 'MM/DD/YYYY' : 'DD/MM/YYYY' 
    const commentStatic = ' **' + employee_name + ':** ' + newComment + '  *' + moment(timestamp?.toString()).format(format) + '* '

    //Convert tasklist members into mentions library members
    function ConvertMembers() {
        const users: Array<User> = []
        members?.map(m => users.push({ id: Number(m.value), display: m.label }))

        return users
    }

    useEffect(() => {
        isEditMode == true && employee_name == userName ?
            tasklist_api.put('/comments/', {
                task_id: task_id,
                comment_id: id,
                comment: newComment
            })
        :
            null
    }, [isEditMode])

    useEffect(() => {
        saving?
            EditComment ? EditComment(id, newComment, setIsEditMode(false)) : null
        :
            null
    }, [saving])

    return (
		<ContainerComment>
			<div id='divCommentStatic'>
				{isEditMode && employee_name == userName?
					<MentionsInput
						id='InputMentions'
						style={true}
						value={newComment}
						onChange={e => { setNewComment(e.target.value) }}
					>
						{members ? <Mention trigger='@' data={ConvertMembers()} markup={'**__display__**'} /> : <></>}
					</MentionsInput> :
					<ReactMarkdown children={commentStatic}></ReactMarkdown>
				}
			</div>
			<span id='spanButtons'>
				{(isEditMode && employee_name == userName) || !active?
						null
					:   
                    employee_name == userName?
                    <ButtonIcon IconType={'BsPencilSquare'} functionButtonIcon={() => {setIsEditMode(true)}}/>
                    : null
				}
			</span>
		</ContainerComment>
    )
}