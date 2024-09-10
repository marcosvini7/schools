import { useSelector } from "react-redux"
import './styles.css'
import { NavLink } from "react-router-dom"

export default function Navbar(){
  const state = useSelector(state => state.global)

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/"> 
          <div className="d-flex align-items-center">
            <img src="/images/curso-online.png" alt="" />
            <span>Schools</span>
          </div>        
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active"  to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/escolas">Escolas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/sobre">Sobre</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}