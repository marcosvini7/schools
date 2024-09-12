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

  localizacao: (id) => {
    switch(id){
      case 1: return 'Urbana'
      case 2: return 'Rural'
      default:
    }
  }
}