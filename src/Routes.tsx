import {  useRoutes } from "react-router-dom"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
export default () =>{
    return useRoutes([
        {path:'/', element:<Home/>},
        {path:'/about', element:<About/>}
    ])
}