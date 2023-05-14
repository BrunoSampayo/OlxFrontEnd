import {  useRoutes } from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { NotFound } from "./pages/NotFound"
import { SignIn } from "./pages/SignIn"
export default () =>{
    return useRoutes([
        {path:'/', element:<Home/>},
        {path:'/about', element:<About/>},
        {path:'/signin', element:<SignIn/>},
        {path:'*', element:<NotFound/>}

    ])
}