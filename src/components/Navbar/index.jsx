import { useDispatch, useSelector } from "react-redux"
import './styles.css'
import { NavLink, Link } from "react-router-dom"
import { actions } from "../../store"

export default function Navbar(){
  const state = useSelector(state => state.global)
  const dispatch = useDispatch()

  function logout(){
    localStorage.clear()
    dispatch( actions.setUser({}) )
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/login"> 
          <div className="d-flex align-items-center">
            <img src="/images/curso-online.png" alt="" />
            <span>Schools</span>
          </div>        
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">  
            { state.user.name && // O link aparecerá apenas quando o usuário estiver autenticado
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active" to="/escolas">Escolas</NavLink>
              </li>
            }   
            <li className="nav-item">
              <NavLink className="nav-link" activeclassname="active" to="/sobre">Sobre</NavLink>
            </li>
            { state.user.name ? // O nome do usuário é exibido quando está autenticado
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person-circle"></i>  { state.user.name }
                </Link>
                <ul className="dropdown-menu">
                  <li onClick={logout} >
                    <Link className="dropdown-item" to="/login"> 
                      <i className="bi bi-box-arrow-left"></i> Sair
                    </Link>
                  </li>
                </ul>
              </li>
              : // Caso contrário, exibirá o link para logar
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname="active"  to="/login">Login</NavLink>
              </li>
            }  
          </ul>
        </div>
      </div>
    </nav>
  )
}