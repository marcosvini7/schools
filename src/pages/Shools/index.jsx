import { Outlet, useNavigate } from "react-router-dom";

export default function Schools(){
  const navigate = useNavigate()

  return (
    <div>
      <h1>Escolas</h1>
      <button className="btn btn-primary" onClick={() => navigate('/escolas/cadastro')} >Novo</button>
      <Outlet/>
    </div>
  )
}