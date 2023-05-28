import {  useRoutes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { NotFound } from "./pages/NotFound";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { AdPage } from "./pages/AdPage";
import { RequireAuth } from "./components/RequireAuth";
import { AddAd } from "./pages/AddAd";
import { Ads } from "./pages/Ads";
export default () =>{
    return useRoutes([
        {path:'/', element:<Home/>},
        {path:'/about', element:<About/>},
        {path:'/signin', element:<SignIn/>},
        {path:'/signup', element:<SignUp/>},
        {path:'/ad/:id', element:<AdPage/>},
        {path:'/my-account', element:<RequireAuth privato><About/></RequireAuth>},
        {path:'/post-an-add', element:<RequireAuth privato><AddAd/></RequireAuth>},
        {path:'/ads', element:<Ads/>},

        {path:'*', element:<NotFound/>}

    ])
}