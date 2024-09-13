import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import About from "../pages/About";
import Schools from "../pages/Shools";
import FormSchools from "../pages/Shools/FormSchools";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/NotFound";

export default function Router(){

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />
          <Route path="sobre" element={<About />} />
          <Route path="escolas" element={ <PrivateRoute> <Schools/> </PrivateRoute> }>
            <Route path="cadastro" element={<FormSchools />} />
            <Route path=":id/edicao" element={<FormSchools />} />
          </Route>        
        </Route>   
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}