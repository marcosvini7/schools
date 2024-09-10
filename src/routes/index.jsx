import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import About from "../pages/About";
import Schools from "../pages/Shools";
import SchoolsNew from "../pages/Shools/New";

function isAuthenticated(){
  if(localStorage.getItem('token') !== ''){
    return true
  } else {
    return false
  }
}

export default function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />
          <Route path="sobre" element={<About />} />
          <Route path="escolas" element={ isAuthenticated() ? <Schools/> : <Navigate to="/login" /> }>
            <Route path="cadastro" element={<SchoolsNew />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}