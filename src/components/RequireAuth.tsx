type Props ={
    children: JSX.Element
    privato?:any
}
import { Navigate } from "react-router-dom"
import { isLogged } from "../helpers/AuthHandler"

export const RequireAuth = ({children ,privato} :Props)=>{
    
    let logged = isLogged();
    let authorized = (privato && !logged) ? false : true

    return authorized ? children : <Navigate to='/signin'/>
    

}