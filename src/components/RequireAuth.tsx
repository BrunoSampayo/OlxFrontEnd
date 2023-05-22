type Props ={
    children: JSX.Element
}
import { Navigate } from "react-router-dom"
import { isLogged } from "../helpers/AuthHandler"

export const RequireAuth = ({children} :Props)=>{
    
    let logged = isLogged()

    if(!logged){
      return  <Navigate to='/signin'/>
    }
    return children
    

}