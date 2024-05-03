import { useNavigate } from 'react-router-dom';
import './Header.scss'
import { IoPerson } from "react-icons/io5";

export const Header = () => {

    const navigate = useNavigate();

    const onLogoutHandler = () => {
        navigate('/login');
    }

    return(
        <header className='header'>
            <div className="header-container">
                <div className="header-inner">
                    <a className="header-logo" href='/homepage'>peacedauren</a>
                    <nav className="header-nav">
                        <li>
                            <a href=""></a>
                        </li>
                        <li>
                            <a href=""></a>
                        </li>
                        <li>
                            <a href=""></a>
                        </li>
                    </nav>
                    <div className="header-profile">
                        <div className="profile-img"><IoPerson /></div>
                        <div className="dropdown">
                            <button onClick={onLogoutHandler}>Exit</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}