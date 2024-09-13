import { actions } from "../store"

export const hp = {
  logout: (dispatch, navigate) => {
    localStorage.clear()
    dispatch( actions.setUser({}) )
    navigate('/login', { replace: true })
  },

  turnos: (turnos) => {
    let text = ''
    if(turnos){
      turnos.forEach((t, i) => {
        if(i === 0){
          text = t.turno
        } else {
          text += ', ' + t.turno
        }
      })
    }

    return text
  }
}



