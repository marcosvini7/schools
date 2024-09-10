import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import About from "../pages/About";
import Schools from "../pages/Shools";
import SchoolsNew from "../pages/Shools/New";

export default function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="login" element={<Login />} />
          <Route path="sobre" element={<About />} />
          <Route path="escolas" element={<Schools />}>
            <Route path="cadastro" element={<SchoolsNew />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}