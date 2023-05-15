import { LoginForm } from '../components/LoginForm';

interface LoginProps{
    isRecovering: boolean
}

export function Login({isRecovering}:LoginProps) {
        return (
            <>
                {isRecovering == false? <LoginForm isRecovering={false}/> : <LoginForm isRecovering={true}/>}
            </>
        )
}
