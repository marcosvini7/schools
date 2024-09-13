import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import './styles.css'

export default function NotFound(){
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <Navbar />
      <div className="container-fluid">
        <h3>Ops! infelizmente não conseguimos encontrar essa página :(</h3>
        <h4>Clique <span className="text-info pointer" 
          onClick={() => navigate(-1, {replace: true})} >aqui</span> para voltar </h4>
      </div>
    </div>
  )
}