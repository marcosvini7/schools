import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Loading from "../../../components/Loading"
import { sc } from "../../../services"
import { actions } from "../../../store"

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
  const state = useSelector(state => state.global)
  const dispatch = useDispatch()
  const { id } = useParams()
  const location = useLocation()

  useEffect(() => {
    dispatch( actions.setSomeChange(false) )
    if(location.state){ // Se o estado for enviado da outra rota não precisa fazer a requisição para buscar os dados
      setForm({
        nome: location.state.nome,
        diretor: location.state.diretor ? location.state.diretor : '',
        cidade_id: location.state.cidade_id,
        localizacao: location.state.localizacao,
        turnos: location.state.turnos.map(turno => turno.turno_sigla)
      })
    }
    else if(id){ 
      sc.getData({dispatch, navigate, url: 'escolas/' + id, set: setForm})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  function handleSubmitForm(e){
    e.preventDefault()

    let msgSuccess = 'Escola cadastrada com sucesso!'
    let msgError = 'Erro ao cadastrar escola'
    if(id){
      msgSuccess = 'Escola atualizada com sucesso!'
      msgError = 'Erro ao atualizar escola'
    }
    setSuccessMessage('')
    setErrorMessage('')

    sc.setData({
      dispatch, 
      navigate, 
      url: id ? 'escolas/' + id : 'escolas',
      method: id ? 'PATCH' : 'POST',
      successAction: () => {
        if(!id) setForm(initialForm)
      },
      body: form,
      showSuccessMessage: () => setSuccessMessage(msgSuccess),
      showErrorMessage: () => setErrorMessage(msgError),
      setBtnDisabled
    })
  }

  const updatePage = useMemo(() => state.someChange ? 'update' : '', [state.someChange])

  return (
    <div>     
      <h5 className="text-center">
        <i className="bi bi-arrow-left pointer text-info mx-2" 
          onClick={() => navigate('/escolas', {state: updatePage})}></i>
        {id ? 'Edição de escola nº ' + id : 'Cadastro de escola'}
      </h5>

      <Loading> 
      <form onSubmit={handleSubmitForm}>
        <div className="mb-3"> 
          <label htmlFor="input-name" className="form-label">Nome da escola</label>
          <input type="text" name="nome" className="form-control" id="input-name" 
            onChange={handleChangeInput} value={form.nome} minLength="6" maxLength="200"/>
        </div>

        <div className="mb-3"> 
          <label htmlFor="input-director" className="form-label">Diretor</label>
          <small className="form-text"> (opcional) </small>
          <input type="text" name="diretor" className="form-control" id="input-director" 
            onChange={handleChangeInput} value={form.diretor} minLength="6" maxLength="200" />
        </div>

        <div className="mb-3">
          <select className="form-select" name="cidade_id" onChange={handleChangeInput} value={form.cidade_id} >
            <option disabled value="">-- Cidade --</option>
            { state.cities.map(city => 
              <option value={city.id} key={city.id} > {city.descricao} </option>  
            )}
          </select>
        </div>

        <div className="mb-3">
          <select className="form-select" name="localizacao" onChange={handleChangeInput} value={form.localizacao} >
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
      
        <button type="submit" className="btn btn-primary" disabled={btnDisabled}>
          <i className="bi bi-floppy2-fill"></i> 
          { id ? ' Atualizar' : ' Cadastrar'}
        </button>
   
        { state.btnLoading && <img src="/images/1488.gif" className="btn-gif" alt="" /> }

        { errorMessage && 
          <div className="text-danger text-center text-md-start mt-2">{ errorMessage }</div>
        }
        { successMessage &&
          <div className="text-success text-center text-md-start mt-2">{ successMessage }</div>
        }
      </form>
      </Loading>
    </div>
  )
}