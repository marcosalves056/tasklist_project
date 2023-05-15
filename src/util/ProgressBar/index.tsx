import { Container } from './styles'

/*########################################################## 
***Version

    220626  MAM                 Initial Version

***Description***

    component ProgressBar

***Props***
    totalTasks                  Number of tasks in the tasklist
    totalTasksClosed            Number of closed tasks in tasklist
    variant                     The color variant wanted

##########################################################*/

interface ProgressBarProps{
    totalTasks: number
    totalTasksClosed: number
    variant :'active' | 'archived'
}

export function ProgressBar({totalTasksClosed, totalTasks, variant} : ProgressBarProps) {
    
    return (
            <Container color={variant}>
                <progress  value={totalTasksClosed} max={totalTasks}/>
            </Container>
    )
}