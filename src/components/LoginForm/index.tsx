import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { parseCookies, setCookie } from 'nookies';
import { useNavigate } from 'react-router-dom';

import tasklist_api from '../../services/tasklist_api';
import main_api from '../../services/main_api';
import InputText from '../../util/InputText';
import { Spin } from '../../util/Spin';
import { Container } from './styles';
import { Portal } from '../../lib/interfaces';

import LoginButtonIcon from '../../assets/icons/loginButtonIcon.svg'
import DiagonalArrowIcon from '../../assets/icons/diagonalArrowIcon.svg'
import TooltipIcon from '../../assets/icons/tooltipIcon.svg'

/*########################################################## 

***Version

    220804  MAM                 Initial Version
    221223  MAM                 Refactoring

***Description***

    component LoginForm
        Display the login, portal selection and password 
        recovery pages

***Props***
    isRecovering                State of recovering login information       

##########################################################*/

interface LoginFormProps {
    isRecovering: boolean
}

export function LoginForm({ isRecovering }: LoginFormProps) {
    
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [isValidatingRecoverEmail, setIsValidatingRecoverEmail] = useState(false)
    //Initialize the states
    const [collectedEmail, setCollectedEmail] = useState('')
    const [collectedPassword, setCollectedPassword] = useState('')
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const [isValidateUserLoading, setIsValidateUserLoading] = useState(false)
    const [timeFlag, setTimeFlag] = useState(false)
    const [tooltipFlag, setTooltipFlag] = useState<boolean>(false)
    const [portals, setPortals] = useState<Array<Portal>>([])
    
    //Get the users portal
    const { 'tasklist.portal': portal } = parseCookies()

    //Validate and login the user
    function ValidateUser(email: string, password: string, rememberMe_state: boolean, port_name: string) {
        //if there is no email or password, stop the function
        if (email.trim() == '') return
        if (password.trim() == '') return
        
        setIsValidateUserLoading(true)
        setTimeout(() => setTimeFlag(true), 5000)
        const data = port_name != undefined ?
            {
                email: email,
                password: password,
                portal: port_name
            }
        :
            {
                email: email,
                password: password
            }

        tasklist_api.post('/login', data)
            .then(res => {
                setPortals(res.data[0].portals)
                res.data[0].portals.length == 1?
                    setCookie(undefined, 'tasklist.portal', res.data[0].portals[0].name, {
                        maxAge: 60 * 60 * 24 * 365 //365 days expired test
                    })
                :
                    null

                if (res.status == 200 && res.data.length != 0) {

                    // if the checkbox 'remember-me' is true, save the token in cookies
                    if (rememberMe_state) {

                        if (res.data[0].token) {
                            setCookie(undefined, 'tasklist.token', res.data[0].token, {
                                maxAge: 60 * 60 * 24 * 365 //365 days
                            })
                        }

                        port_name !== undefined ? navigate('/', { replace: true }) : null

                    } else {

                        if (res.data[0].token) {
                            setCookie(undefined, 'tasklist.token', res.data[0].token, {
                                maxAge: 60 * 60 * 8 //8h
                            })
                        }

                        port_name !== undefined ? navigate('/', { replace: true }) : null

                    }

                    setIsValidateUserLoading(false)

                }

            }).catch(() => 
                (
                    alert(t('Email or password is not correct. Please Try again')),
                    setIsValidateUserLoading(false),
                    setTimeFlag(false)
                )
            )
    }

    //Verify if the email exist in our database
    function ValidateRecoverEmail(email: string) {
        if (email.trim() == '') return

        setIsValidatingRecoverEmail(true)

        main_api.post('/retrive_password',{
            email: email.trim()
        })
            .then(() => {
                alert(t('If your e-mail is in our database you will be emailed. Please, check your inbox and SPAN/electronic trash folder')),
                setIsValidatingRecoverEmail(false)
            })
            .catch(() => {alert(t('Email not found in our database')), setIsValidatingRecoverEmail(false)})

    }

    //Reset timeFlag
    useEffect(() => {
        timeFlag && !isValidateUserLoading?
            setTimeFlag(false)
        :
            null
    },[timeFlag])

    //Navigate to homepage if there is only one portal
    useEffect(() => {
        portal != undefined  && portals.length == 1? navigate('/', { replace: true }) : null
    },[portal])

    //Reset login passed 5 seconds trying loading
    useEffect(() =>{
        if(isValidateUserLoading && timeFlag){
            alert(t('The server timed out, please try again'))
            setIsValidateUserLoading(false)
            setTimeFlag(false)
            navigate('/login', { replace: true })
            window.location.reload()
        }
    }, [isValidateUserLoading, timeFlag])

    return (
        <Container>
            {isRecovering == false  && portals.length < 1?
                <>
                    <div id='formPosition'>
                        <h1>Proj-mgmt</h1>
                        {!isChangingPassword && !isValidateUserLoading && !timeFlag? //Login page
                                <>
                                    <div>
                                        <div id='emailGroup'>
                                            <InputText
                                                id='emailInput'
                                                placeholder={t('Insert your email')}
                                                type='email'
                                                onChange={(i: any) => setCollectedEmail(i.target.value)}
                                                onKeyDown={(e: any) => e.key == 'Enter' ? ValidateUser(collectedEmail, collectedPassword, rememberMe, portal) : null}
                                                autoComplete='on'
                                                autoFocus={true}
                                            />
                                        </div>
                                            <div id='passwordGroup'>
                                                <InputText
                                                    id='passwordInput'
                                                    placeholder={t('Insert your password')}
                                                    type='password'
                                                    autoComplete='on'
                                                    onChange={(i: any) => setCollectedPassword(i.target.value)}
                                                    onKeyDown={(e: any) => e.key == 'Enter' ? ValidateUser(collectedEmail, collectedPassword, rememberMe, portal) : null} 
                                                    />
                                                <a id='passwordButton' onClick={() => ValidateUser(collectedEmail, collectedPassword, rememberMe, portal)}>
                                                    <img src={LoginButtonIcon} alt='login button' />
                                                </a>
                                            </div>
                                    </div>
                                    <div id='divFormBottom'>
                                        <div id='RememberMeGroup'>
                                            <input id='rememberMe' onChange={() => { setRememberMe(!rememberMe) }} type='checkbox' checked={rememberMe} />
                                            <span onClick={() => { setRememberMe(!rememberMe) }}>{t('Remember me')}</span>
                                            <div id='tooltip' onMouseEnter={() => setTooltipFlag(true)} onMouseLeave={() => setTooltipFlag(false)}>
                                                <img  src={TooltipIcon} alt='tooltip icon' />
                                                {tooltipFlag ? <span>{t('If checked, you will not need to log in again for 365 days, otherwise your section will expire in 8 hours.')}</span> : null}
                                            </div>
                                        </div>
                                        <hr />
                                        <div id='forgotPasswordLink' onClick={() => setIsChangingPassword(!isChangingPassword)} >
                                            <a>{t('Forgot Proj-mgmt account password?')}</a>
                                            <a >
                                                <img src={DiagonalArrowIcon} alt='Diagonal Arrow' />
                                            </a>
                                        </div>
                                    </div>
                                </>
                                :
                                <>
                                    {isValidatingRecoverEmail == false && !isValidateUserLoading && !timeFlag ? //Password recovery page
                                        <>
                                            <span id='spanQuestion'>{t('What is your registered email?')}</span>
                                            <div id='emailGroup'>
                                                <InputText
                                                    placeholder={t('Insert your email')}
                                                    type='email'
                                                    onChange={(i: any) => setCollectedEmail(i.target.value)}
                                                    onKeyDown={(e: any) => e.key == 'Enter' ? ValidateRecoverEmail(collectedEmail) : null}
                                                />
                                                <a id='emailButton' onClick={() => ValidateRecoverEmail(collectedEmail)}>
                                                    <img src={LoginButtonIcon} alt='login button' />
                                                </a>
                                            </div>
                                            <div id='divFormBottom'>
                                                <hr />
                                                <div id='forgotPasswordLink' >
                                                    <a onClick={() => setIsChangingPassword(!isChangingPassword)}>{t('Back to login')}</a>
                                                    <a onClick={() => setIsChangingPassword(!isChangingPassword)}>
                                                        <img src={DiagonalArrowIcon} alt='Diagonal Arrow' />
                                                    </a>
                                                </div>
                                            </div>
                                        </>
                                        :
                                        <div id='divSpinLoading'>
                                            <Spin />
                                            <h4>{t('Loading...')}</h4>
                                        </div>
                                    }
                                </>
                        }

                    </div>
                </>
                : portals.length > 1 && !isValidateUserLoading && !timeFlag?//Portal selection page
                    <div id='formPosition'>
                        <h1>Proj-mgmt</h1>
                        <span id='spanQuestion'>{t('Select a portal')}:</span>
                        {portals.map(port => 
                            <button 
                                className='PortalOption' 
                                key={port.id} 
                                onClick={() => (setCookie(undefined, 'tasklist.portal', port.name, {
                                                    maxAge: 60 * 60 * 24 * 30 //30 days
                                    }), 
                                    ValidateUser(collectedEmail, collectedPassword, rememberMe, port.name))}>
                                        {port.name == 'info'? 'Informi' : port.name}
                                    </button>
                        )}
                    </div>
                :
                <div id='divSpinLoading'>
                    <Spin />
                    <h4>{t('Loading...')}</h4>
                </div>
            }
        </Container>
    )
}