import { actions } from "../store"

export const hp = {
  turno: (sigla) => {
    switch(sigla){
      case 'M': return 'Manhã'
      case 'T': return 'Tarde'
      case 'N': return 'Noite'
      case 'I': return 'Integral'
      default:
    }
  },

  localizacao: (i) => {
    switch(i){
      case 1: return 'Urbana'
      case 2: return 'Rural'
      default:
    }
  },

  logout: (dispatch, navigate) => {
    localStorage.clear()
    dispatch( actions.setUser({}) )
    navigate('/login', { replace: true })
  }
}



