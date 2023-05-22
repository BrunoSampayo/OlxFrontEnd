import {  useRoutes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { AdPage } from "./pages/AdPage";
import { RequireAuth } from "./components/RequireAuth";
export default () =>{
    return useRoutes([
        {path:'/', element:<Home/>},
        {path:'/about', element:<About/>},
        {path:'/signin', element:<SignIn/>},
        {path:'/signup', element:<SignUp/>},
        {path:'/ad/:id', element:<AdPage/>},
        {path:'/my-account', element:<RequireAuth><About/></RequireAuth>},
        {path:'*', element:<NotFound/>}

    ])
}