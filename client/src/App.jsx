import EmailDownload from "./components/EmailDownload"
import Home from "./components/Home"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
      <div className="text-violet-800">
        <BrowserRouter>
         <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/email/:id" element={<EmailDownload/>} />
          </Routes>
        </BrowserRouter>
        <ToastContainer/>
      </div>
    </> 
  )
}

export default App
