import { BrowserRouter } from "react-router-dom"
import Routes from "./Routes"
import "./App.css"
import * as C from './components/MainComponents'

import Header from "./components/partials/Header"
import Footer from "./components/partials/Footer"

const App = () =>{
  return(
    <BrowserRouter>
    <C.Template>
      <Header/>
      <Routes/>
      <Footer/>
    </C.Template>
      
    </BrowserRouter>
  )
}


export default App