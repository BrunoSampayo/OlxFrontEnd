type Props ={
    children: JSX.Element
}
import { useNavigate } from "react-router-dom"
import { isLogged } from "../helpers/AuthHandler"

export const RequireAuth = ({children} :Props)=>{
    const navigate = useNavigate()
    let logged = true

    if(logged){
        return children
    }else{
        
        return null
    }

}