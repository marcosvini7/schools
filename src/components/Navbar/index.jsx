import { useDispatch, useSelector } from "react-redux"
import './styles.css'
import { NavLink, Link, useNavigate } from "react-router-dom"
import { hp } from "../../util/helpers"

export default function Navbar(){
  const state = useSelector(state => state.global)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function toggleNavbar(){ // Encolher a barra de navegação
    const btn = document.getElementsByClassName('navbar-toggler')[0]
    if(btn.ariaExpanded === 'true'){
      btn.click()
    }
  } 

  return (
    <nav className="navbar navbar-expand-md bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/login" onClick={toggleNavbar}> 
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
            { state.user.name && // O link de escolas aparecerá apenas quando o usuário estiver autenticado
              <li className="nav-item" onClick={toggleNavbar}>
                <NavLink className="nav-link" activeclassname="active" to="/escolas">Escolas</NavLink>
              </li>
            }   
            <li className="nav-item" onClick={toggleNavbar}>
              <NavLink className="nav-link" activeclassname="active" to="/sobre">Sobre</NavLink>
            </li>
        
            { state.user.name ? // O nome do usuário e um link para deslogar são exibidos quando está autenticado
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person-circle"></i>  { state.user.name }
                </Link>
                <ul className="dropdown-menu">
                  <li onClick={() => hp.logout(dispatch, navigate)}>
                    <Link className="dropdown-item"> 
                      <i className="bi bi-box-arrow-left"></i> Sair
                    </Link>
                  </li>
                </ul>
              </li>
              : // Caso contrário, exibirá o link para logar
              <li className="nav-item" onClick={toggleNavbar}>
                <NavLink className="nav-link" activeclassname="active"  to="/login">Login</NavLink>
              </li>
            }  
          </ul>
        </div>
      </div>
    </nav>
  )
}