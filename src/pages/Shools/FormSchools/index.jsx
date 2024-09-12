import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { hp } from "../../../util/helpers"

export default function SchoolsNew(){
  const initialForm = {
    nome: '',
    diretor: '',
    cidade_id: '',
    localizacao: '',
    turnos: []
  }
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const state = useSelector(state => state.global)
  const dispatch = useDispatch()

  useEffect(() => {
    if(form.nome && form.cidade_id && form.localizacao && form.turnos?.length){
      setBtnDisabled(false)
    } else {
      setBtnDisabled(true)
    }
  }, [form])

  function handleChangeInput(e){
    const name = e.target.name
    const value = e.target.value

    if(name === 'turnos'){
      let turnos = form.turnos 

      if(e.target.checked){
        turnos.push(value)
      } else {
        turnos = turnos.filter(turno => turno !== value)
      }

      setForm({
        ...form,
        turnos
      })
    } else {
      setForm({
        ...form,
        [name]: value
      })
    }
  }

  function handleSubmitForm(){
    setBtnDisabled(true)
    setIsLoading(true)
    setErrorMessage('')
    setSuccessMessage('')
    document.body.style.cursor = 'wait'
 
    fetch(process.env.REACT_APP_API_URL + 'escolas', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(form)
    })
    .then(res => {
      if (!res.ok) {
        setErrorMessage('Erro ao criar a escola')
      }
      if (res.status === 401){ // Desloga o usuário caso o token seja inválido
        hp.logout(dispatch, navigate)
      }
      return res.json()
    })
    .then(() => {
      setForm(initialForm)
      setSuccessMessage('Escola criada com sucesso')
    })
    .catch((err) => {
      console.log(err)
      setErrorMessage('Erro ao criar a escola')
    })
    .finally(() => {
      setBtnDisabled(false)
      setIsLoading(false)
      document.body.style.cursor = 'default'
    })
  }

  return (
    <div>
      <h5 className="text-center">
        <i className="bi bi-arrow-left pointer text-info mx-2" 
          onClick={() => navigate('/escolas', {state: 'update'})}></i>
        Cadastro de escola
      </h5>

      <div className="mb-3"> 
        <label htmlFor="input-name" className="form-label">Nome da escola</label>
        <input type="text" name="nome" className="form-control" id="input-name" 
          onChange={handleChangeInput} value={form.nome} />
      </div>

      <div className="mb-3"> 
        <label htmlFor="input-director" className="form-label">Diretor</label>
        <small className="form-text"> (opcional) </small>
        <input type="text" name="diretor" className="form-control" id="input-director" 
          onChange={handleChangeInput} value={form.diretor} />
      </div>

      <div className="mb-3">
        <select className="form-select" name="cidade_id" onChange={handleChangeInput} value={form.cidade_id}>
          <option disabled value="">-- Cidade --</option>
          { state.cities.map(city => 
            <option value={city.id} key={city.id} > {city.descricao} </option>  
          )}
        </select>
      </div>

      <div className="mb-3">
        <select className="form-select" name="localizacao" onChange={handleChangeInput} value={form.localizacao}>
          <option disabled value="">-- Localização --</option>
          <option value="1">Urbana</option>
          <option value="2">Rural</option>
        </select>
      </div>

      <div className="mb-3" >
        <div className="mb-2">Turnos</div>
        <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
          <input type="checkbox" name="turnos" checked={form.turnos.includes('M')} value="M" 
            className="btn-check" id="btncheck1" autoComplete="off" onChange={handleChangeInput}/>
          <label className="btn btn-outline-primary" htmlFor="btncheck1">Manhã</label>

          <input type="checkbox" name="turnos" checked={form.turnos.includes('T')} value="T" 
            className="btn-check" id="btncheck2" autoComplete="off" onChange={handleChangeInput}/>
          <label className="btn btn-outline-primary" htmlFor="btncheck2">Tarde</label>

          <input type="checkbox" name="turnos" checked={form.turnos.includes('N')} value="N" 
            className="btn-check" id="btncheck3" autoComplete="off" onChange={handleChangeInput}/>
          <label className="btn btn-outline-primary" htmlFor="btncheck3">Noite</label>

          <input type="checkbox" name="turnos" checked={form.turnos.includes('I')} value="I" 
            className="btn-check" id="btncheck4" autoComplete="off" onChange={handleChangeInput}/>
          <label className="btn btn-outline-primary" htmlFor="btncheck4">Integral</label>
        </div>
      </div>
    
      <button className="btn btn-primary" disabled={btnDisabled} onClick={handleSubmitForm}>
        <i className="bi bi-floppy2-fill"></i> Cadastrar
      </button>
      { isLoading && <img src="/images/1488.gif" className="btn-gif" alt="" /> }

      { errorMessage && 
        <div className="text-danger text-center text-md-start mt-2">{ errorMessage }</div>
      }
      { successMessage &&
        <div className="text-success text-center text-md-start mt-2">{ successMessage }</div>
      }
    </div>
  )
}