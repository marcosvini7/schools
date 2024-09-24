import { actions } from "../store"
import { hp } from "../util/helpers"

export const sc = {
  // Obtém dados e os salva no redux ou estados locais, dependendo dos parâmetros passados
  getData: ({ dispatch, navigate, url, set, action }) => {
    dispatch( actions.setDataLoading(true)) // Exibe o gif de carregamento
    fetch(process.env.REACT_APP_API_URL + url, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }})
    .then(res => {
      if(res.ok){
        return res.json()
      }
      else if(res.status === 401){ // Desloga o usuário caso o token seja inválido
        hp.logout(dispatch, navigate)
      }
      else if(!res.ok){
        throw new Error('Erro na requisição: ' + res.status)
      }
    })
    .then(res => {
      const data = res.data ? res.data : res
      // Se "set" for válido, então se trata de uma modificação de estado local, caso contrário, usa o redux
      if(set){ 
        set(data) 
      } else {
        dispatch( actions[action](data) )
      } 
      
      if(res.data){ // Quando tem os dados de paginação
        const pageData = res
        dispatch( actions.setPageData(pageData) )
        const linkActive = pageData.links.filter((link => link.active))
        const page = parseInt(linkActive[0]?.label)
        dispatch( actions.setLinkDisabled({
          prev: page === 1 ? true : false,
          next: page === pageData.links.length - 2 ? true : false
        }) )
      }
             
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      dispatch( actions.setDataLoading(false)) // Oculta o gif
    })
  },

  // Requisição para modificar dados e fazer o login
  setData: ({ dispatch, navigate,  url, method, successAction, body, navigateTo, showSuccessMessage, 
  showErrorMessage, setBtnDisabled, login}) => {
    // Configurações de inicio de requisição   
    dispatch( actions.setBtnLoading(true)) // Exibe o gif de carregamento pequeno ao lado do botão
    document.body.style.cursor = 'wait'  // Cursor com icone de "carregando"
    if(setBtnDisabled){  // Desativa o botão que fez a requisição
      setBtnDisabled(true) 
    }   
    
    fetch(process.env.REACT_APP_API_URL + url, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      method,
      body: JSON.stringify(body)
    })
    .then(res => {
      if (res.ok){
        // Indica que ocorreu uma mudança de dados,assim a requisição na página de busca deve ser feita
        dispatch( actions.setSomeChange(true) ) 
        return res.json()                
      }
      else if (res.status === 401) {  // Desloga o usuário caso o token seja inválido
        hp.logout(dispatch, navigate)
      }
      else if(!res.ok) {        
        throw new Error('Erro na requisição: ' + res.status)
      }     
    })
    .then((data) => {     
      if(successAction){
        successAction()       
      }
      if(showSuccessMessage){
        showSuccessMessage()
      } 
      if(login){
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.nome) 
        dispatch( actions.setUser({name: data.nome,token: data.token}))
      }
      if(navigateTo){
        navigate(navigateTo)
      }
    })
    .catch((err) => {
      console.log(err)
      if(showErrorMessage){
        showErrorMessage()
      }
    })
    .finally(() => {
      // Volta para as configurações iniciais
      dispatch( actions.setBtnLoading(false)) 
      document.body.style.cursor = 'default'
      if(setBtnDisabled){ 
        setBtnDisabled(false) 
      }
    })
  }
}