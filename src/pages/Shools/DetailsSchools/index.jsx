import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import './styles.css'
import { hp } from "../../../util/helpers"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "../../../store"
import Loading from "../../../components/Loading"

export default function DetailsSchools(){
  const location = useLocation()
  const [school, setSchool] = useState(location.state ? location.state : {})
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const state = useSelector(state => state.global)

  useEffect(() => {
    if(!location.state){
      dispatch( actions.setDataLoading(true) )
      fetch(process.env.REACT_APP_API_URL + 'escolas/' + id, {
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
          setSchool(data)
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          dispatch( actions.setDataLoading(false) )
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function edit(school){
    navigate('/escolas/' + school.id + '/edicao', { state: school })
  }

  function delete_(school){
    dispatch( actions.setModal({ // Exibe a página modal
      ...state.modal,
      body: `Deseja realmente excluir a escola nº ${school.id}: ${school.nome} ?`,
      data: school,
      action: 'DELETE_SCHOOL'
    }) )
  }

  const date = (dt) => {
    if(dt){
      return dt.split(' ')[0] + ' às ' + dt.split(' ')[1]
    }
    return ''
  }

  return (
    <Loading>
      <div className="d-flex justify-content-center">
        <div className="card col-12 col-md-8 col-lg-6 details">
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-center">
              <i className="bi bi-arrow-left pointer text-info mx-3" 
                onClick={() => navigate(-1)}></i> 
                  Detalhes da escola nº { school.id }                            
              <i className="bi bi-pencil pointer text-info ms-3"  
                onClick={(e) => edit(school)}></i>
              <i className="bi bi-trash pointer text-danger ms-3"
                onClick={(e) => delete_(school)}></i>
            </h5>
            <hr/>
            <p className="card-text">ID: { school.id }</p>
            <p className="card-text">Nome: { school.nome }</p>
            <p className="card-text">Diretor: { school.diretor }</p>
            <p className="card-text">Cidade: { school.cidade?.descricao }</p>
            <p className="card-text">Estado: { school.cidade?.estado.descricao }</p>
            <p className="card-text">Localização: { school.zona }</p>
            <p className="card-text">Turno(s): { hp.turnos(school.turnos) } </p>
            <p className="card-text">Cadastrada em: { date(school.created_at) } </p>
            <p className="card-text">Atualizada em: { date(school.updated_at) } </p>

            <h5 className="card-title text-center mb-3"> Usuário </h5>
            <hr/>
            <p className="card-text">Nome: { school.usuario?.name }</p>
            <p className="card-text">E-mail: { school.usuario?.email }</p>
          </div>
        </div>
      </div>
    </Loading>
  )
}