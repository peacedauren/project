import './Alert.scss'
import type {ReactNode} from 'react';
import { IoCloseSharp } from "react-icons/io5";

type TProps = {
    children: ReactNode;
    type: "primary" | "success" | "danger" | "warning";
    dismiss?: VoidFunction;
    show: boolean;
}

const Alert = ({children, type, dismiss, show}: TProps) => {
    return(
        <>
            <div className={type} id='alert' style={{transform: show ? "translateY(0)" : "translateY(-100vh)"}}>
                {children}  
                <button style={{display: dismiss ? "block" : "none"}} onClick={dismiss}><IoCloseSharp /></button>
            </div>
        </>
    )
}

export default Alert;