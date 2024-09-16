import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { sc } from "../../services"

export default function Login(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form, setForm] = useState({})
  const [errorMessage, setErrorMessage] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const state = useSelector(state => state.global)

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

  function handleSubmitForm(e){
    e.preventDefault()
    setErrorMessage('')
    
    sc.setData({
      dispatch, navigate, url: 'login/run', method: 'POST', 
      body: form, setBtnDisabled, login: true, navigateTo: '/escolas', 
      showErrorMessage: () => setErrorMessage('E-mail ou senha incorreto(s)')})
  }

  return (
    <div className="d-flex justify-content-center">
      <div className="card col-12 col-sm-8 col-md-6 col-lg-4">
        <div className="card-body">
          <h5 className="card-title text-center">Login</h5>
          <form onSubmit={handleSubmitForm}>
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
            
            <button type="submit" className="btn btn-primary" disabled={btnDisabled}>
              <i className="bi bi-box-arrow-right"></i> Acessar
            </button>
            { state.btnLoading && <img src="/images/1488.gif" className="btn-gif" alt="" /> }

            { errorMessage && 
              <div className="text-center text-danger mt-2">{ errorMessage }</div>
            }
          </form>
        </div>
      </div>
    </div>
  )
}