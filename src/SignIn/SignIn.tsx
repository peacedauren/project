import { useState } from 'react'
import { GoEyeClosed } from 'react-icons/go'
import { FaRegEye } from 'react-icons/fa6'
import { TUser } from '../Register/RegisterPage'
import Alert from '../UI/Alert/Alert'
import './SignIn.scss'
import { useNavigate } from 'react-router-dom'
import axiosRegister from '../Config/axiosRegister'

export const SignIn = () => {
    const [buttonType, setButtonType] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [login, setLogin] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [cantSubmit, setCantSubmit] = useState<string>();

    const navigate = useNavigate();

    const toggleButton = () => {
        setButtonType(!buttonType);
    }

    const onCloseAlertHandler = () => {
        setShowAlert(false);
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(login === undefined || login.trim() === "") {
            setShowAlert(true)
            setCantSubmit("Введите Username или Email");
        } else if(password === undefined || password.trim() === "") {
            setShowAlert(true);
            setCantSubmit("Введите Пароль");
        } else {
            const {data} = await axiosRegister.get("users.json");
            if(!data) {
                setShowAlert(true);
                setCantSubmit("Неверный Login или Email");
            } else {
                const dataObject: TUser[] = Object.values(data);
                for(let i = 0; i < dataObject.length; i ++) {
                    if((dataObject[i].username === login || dataObject[i].email === login) && dataObject[i].password === password) {
                        navigate('/homepage');
                    } else {
                        setShowAlert(true);
                        setCantSubmit("Wrong Login or Password");
                    }
                }
            }
        }
    }

    return(
        <div className="login-page">
            <div className="login-block">
                Login
                <form className='login-input' onSubmit={onSubmitHandler}>
                    Username or Email:
                    <input type="text" className='username' onChange={(e) => setLogin(e.target.value)}/>
                    Password:
                    <input type={buttonType ? "password" : "text"} className='password-input' onChange={(e) => setPassword(e.target.value)}/>
                    <div className="toggle-div">
                        <button onClick={toggleButton} className='toggle'>
                            {
                            buttonType ? <GoEyeClosed /> : <FaRegEye />
                            }
                        </button>
                    </div>
                    <div className='submit-div'>
                        <button type='submit' className='login'>Login</button>
                    </div>
                </form>
                <div className="doesnt-exist">
                    <div>Don't have an account?</div>
                    <a href="/">Sign Up</a>
                </div>
                <Alert type={"danger"} show={showAlert} dismiss={onCloseAlertHandler}>
                    <p>{cantSubmit}</p>
                </Alert>
            </div>
        </div>
    )
}