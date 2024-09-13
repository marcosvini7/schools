import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { actions } from "../../store";
import './styles.css'
import { hp } from "../../util/helpers";
import Loading from "../../components/Loading";

export default function Schools(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const state = useSelector(state => state.global)
  let initialRender = useRef(true)
  const initialForm = {
    nome: '',
    cidade_id: ''
  }
  const [form, setForm] = useState(initialForm)
  const [search, setSearch] = useState(initialForm)
  const [forceEffect, setForceEffect] = useState(0)

  // Solicita as cidades para a api e salva os dados no redux
  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + 'cidades', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }})
      .then(res => {
        if(res.ok){
          return res.json()
        }
        if(res.status === 401){ // Desloga o usuário caso o token seja inválido
          hp.logout(dispatch, navigate)
        }
      })
      .then(data => {
        dispatch( actions.setCities(data) )
      })
      .catch(err => {
        console.log(err)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Solicita as escolas para a api usando a lógica de parametros de query
  useEffect(() => {
    let url = process.env.REACT_APP_API_URL + 'escolas?nome=' + search.nome 
      + '&cidade_id=' + search.cidade_id 

    dispatch( actions.setDataLoading(true) )
    fetch(url, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem('token')
      }
    })
    .then(res => {
      if(res.ok){
        return res.json()
      }
      if(res.status === 401){ // Desloga o usuário caso o token seja inválido
        hp.logout(dispatch, navigate)
      }
    })
    .then(res => {
      dispatch( actions.setSchools(res.data) )
    })
    .catch(err => {
      console.log(err)
    })
    .finally(() => {
      dispatch( actions.setDataLoading(false) )
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, forceEffect])

  // É executado quando ocorre uma modificação em "state.modalDataAction", isso é feito somente na página modal
  useEffect(() => {
    if(state.modalAction === 'DELETE_SCHOOL'){
      const school = state.modal.data
      dispatch( actions.setDataLoading(true) )
    
      fetch(process.env.REACT_APP_API_URL + 'escolas/' + school.id, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem('token'),
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      })
      .then(res => {
        if (res.ok){
          setForceEffect( Math.random() )
        }
        if (res.status === 401) {  // Desloga o usuário caso o token seja inválido
          hp.logout(dispatch, navigate)
        }
        else if(!res.ok) {        
          console.log('Ocorreu um problema')
        } 
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        dispatch( actions.setDataLoading(false) )
        if(location.pathname !== '/escolas'){
          navigate('/escolas')
        }
      })
    }
    // Limpa o estado para que as alterações possam ser identificadas novamente
    dispatch( actions.setModalAction('') )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.modalAction])
  
  useEffect(() => {
    if(initialRender.current){ // Não executa na primeira redenrização
      initialRender.current = false
      return
    }

    // Lógica para fazer a requisição somente depois de um tempo que o usuário digitar,
    // para evitar que uma requisição seja feita a cada caractere digitado
    const timeout = setTimeout(() => {     
      setSearch(form)
    }, 500)

    return () => clearTimeout(timeout)  

  }, [form])

  // Quando volta para a rota, atualiza os dados
  useEffect(() => {
    if(location.state === 'update'){
      setForceEffect(Math.random())
    }
  }, [location.state])

  function handleInputChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function details(school){
    navigate('/escolas/' + school.id, { state: school })
  }

  function edit(e, school){
    e.stopPropagation()
    navigate('/escolas/' + school.id + '/edicao', { state: school })
  }

  function delete_(e, school){
    e.stopPropagation()
    dispatch( actions.setModal({ // Exibe a página modal
      ...state.modal,
      body: `Deseja realmente excluir a escola nº ${school.id}: ${school.nome} ?`,
      data: school,
      action: 'DELETE_SCHOOL'
    }) )
  }

  return (
    <div> {/* Ou renderiza o filtro e escolas ou o formulário de cadastro */}
      { location.pathname === '/escolas' ? <>
          <div>
            <div className="row">
              <div className="col-12 col-md-9">
                <input type="search" value={form.nome} placeholder="Pesquise por escolas" className="form-control" name="nome" 
                  onChange={handleInputChange} />
              </div>

              <div className="col-10 col-md-2 mt-2 mt-md-0">
                <select className="form-select" value={form.cidade_id} name="cidade_id" onChange={handleInputChange} >
                  <option value="">-- Cidade --</option>
                  { state.cities.map(city => 
                    <option value={city.id} key={city.id} > {city.descricao} </option>  
                  )}
                </select>
              </div>

              <div className="col mt-2 mt-md-0">
                <button className="btn btn-sm btn-primary" onClick={() => navigate('/escolas/cadastro')} > 
                  <i className="bi bi-plus-lg"></i>       
                </button>
              </div>
            </div>
          </div>

        <Loading> {/* Componente para exibir o gif de carregamento. É controlado pelo estado do redux "dataLoading" */}
          <div className="row">
            { state.schools.map(school =>        
              <div className="col-12 col-sm-6 col-lg-4 pointer" 
                  key={school.id} onClick={() => details(school)} >
                <div className="card mt-3">
                  <h5 className="card-header">
                    <div className="d-flex align-items-start justify-content-between">
                      <div>
                        <i className="bi bi-book"></i> {school.nome}
                      </div>
                      <div className="d-flex"> 
                        <i className="bi bi-pencil text-info ms-3 ms-md-2"  
                          onClick={(e) => edit(e, school)}></i>
                        <i className="bi bi-trash text-danger ms-3 ms-md-2"
                          onClick={(e) => delete_(e, school)}></i>
                      </div>
                    </div>
                     
                  </h5>
                  <div className="card-body">
                    { school.diretor && 
                      <p className="card-text"> 
                        <i className="bi bi-person-square"></i> Diretor: { school.diretor }                
                      </p>
                    }
                    <p className="card-text">
                      <i className="bi bi-geo"></i> Cidade: { school.cidade.descricao }
                    </p>

                    <p className="card-text">
                      <i className="bi bi-map"></i> Localização: { school.zona }
                    </p>

                  </div>
                  <div className="card-footer text-body-secondary">
                    turno(s): { hp.turnos(school.turnos) }
                  </div>
                </div>
              </div>
            )} 
          </div>
        </Loading>

      { !state.dataLoading && !state.schools.length && // Se não está carregando e não tem dados no array
        <h5 className="text-center mt-5">Ops! não foram encontradas escolas</h5>
      }
      </>
      : // Exibe a página de cadastro
        <Outlet/>
      }
  </div>
)}
