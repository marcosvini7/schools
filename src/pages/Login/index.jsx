import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { actions } from "../../store"

export default function Login(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form, setForm] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)

  useEffect(() => {
    if(form.email && form.senha){
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }, [form])

  function handleChangeInput(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmitForm(){
    setBtnDisabled(true)
    setErrorMessage('')
    document.body.style.cursor = 'wait'

    const formData = new FormData()
    formData.append('email', form.email)
    formData.append('senha', form.senha)

    fetch('https://apiteste.mobieduca.me/api/login/run', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.nome)
        dispatch( actions.setUser({
          name: data.nome,
          token: data.token
        }))
        navigate('/escolas')
      }
    })
    .catch(() => {
      setErrorMessage('E-mail ou senha incorreto(s)')
    })
    .finally(() => {
      setBtnDisabled(false)
      document.body.style.cursor = 'default'
    })
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="card col-12 col-sm-8 col-md-6 col-lg-4">
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>

          <div className="mb-3"> 
            <label htmlFor="input-email" className="form-label">E-mail</label>
            <input type="email" name="email" className="form-control" id="input-email" 
              onChange={handleChangeInput} />
          </div>

          <div className="mb-3"> 
            <label htmlFor="input-password" className="form-label">Senha</label>
            <input type="password" name="senha" className="form-control" id="input-password" 
              onChange={handleChangeInput} />
          </div>
          
          <button className="btn btn-primary" disabled={btnDisabled} onClick={handleSubmitForm} >Acessar</button>

          { errorMessage && 
            <div className="text-center text-danger">{ errorMessage }</div>
          }
          
        </div>
      </div>
    </div>
  )
}