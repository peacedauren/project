import { useEffect, useState } from 'react'
import { GoEyeClosed } from "react-icons/go";
import { FaRegEye } from "react-icons/fa6";
import Alert from '../UI/Alert/Alert';
import './RegisterPage.scss'
import { useNavigate } from 'react-router-dom'
import axiosRegister from '../Config/axiosRegister';

export type TUser = {
    username: string,
    email: string,
    password: string
  }

export const RegisterPage = () => {
    const [buttonType, setButtonType] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [email, setEmail] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirm, setComfirm] = useState<string>();
    const [cantSubmit, setCantSubmit] = useState<string>();
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(loggedIn) {
            navigate('/homepage');
            setLoggedIn(false);
        }
    })

    const toggleButton = () => {
        setButtonType(!buttonType);
    }

    const onCloseAlertHandler = () => {
        setShowAlert(false);
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(username === undefined) {
            setCantSubmit("Введите Username");
            setShowAlert(true);
        } else if(email === undefined) { 
            setCantSubmit("Введите Email");
            setShowAlert(true);
        } else if(password === undefined) {
            setCantSubmit("Введите Пароль");
            setShowAlert(true);
        } else if(confirm === undefined) {
            setCantSubmit("Подтвердите Пароль");
            setShowAlert(true);
        } else if(password !== confirm) {
            setCantSubmit("Пароли не совпадают");
            setShowAlert(true);
        } else {
            let userExists = false;
            const {data} = await axiosRegister.get("users.json");
            if(data) {
                const dataObject: TUser[] = Object.values(data);
                for(let i = 0; i < dataObject.length; i ++) {
    
                    if(dataObject[i].email === email) {
                        userExists = true;
                        break;
                    }
                    userExists = false;
                }
            }

            if(userExists) {
                setCantSubmit("Такой Email уже зарегестрирован");
                setShowAlert(true);
            } else {
                await axiosRegister.post("users.json", {
                    username: username,
                    email: email,
                    password: password
                });
                setLoggedIn(true);
            }
        }
    }

    return(
        <div className='register-page'>
            <div className="register-block">
                Sign Up
                <form className='register-input' onSubmit={onSubmitHandler}>
                    Username:
                    <input type="text" className='username' onChange={(e) => setUsername(e.target.value)}/>
                    Email Address:
                    <input type="email" className='email' onChange={(e) => setEmail(e.target.value)}/>
                    Password:
                    <input type={buttonType ? "password" : "text"} className='password-input' onChange={(e) => setPassword(e.target.value)}/>
                    Confirm Password:
                    <input type={buttonType ? "password" : "text"} className='confirm-password' onChange={(e) => setComfirm(e.target.value)}/>
                    <div className="toggle-div">
                        <button onClick={toggleButton} className='toggle'>
                            {
                            buttonType ? <GoEyeClosed /> : <FaRegEye />
                            }
                        </button>
                    </div>
                    <div className='submit-div'>
                        <button type='submit' className='register'>Sign Up</button>
                    </div>
                </form>
                <div className="already-exists">
                    <div>Already have an account?</div>
                    <a href="login">Login</a>
                </div>
                <Alert type={"danger"} show={showAlert} dismiss={onCloseAlertHandler}>
                    <p>{cantSubmit}</p>
                </Alert>            
                </div>
        </div>
    )
}