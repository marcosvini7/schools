import { Outlet } from "react-router-dom";

export default function Schools(){
  return (
    <div>
      <h1>Escolas</h1>
      <button className="btn btn-primary">Novo</button>
      <Outlet/>
    </div>
  )
}