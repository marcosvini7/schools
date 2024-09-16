import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { actions } from "../../store";
import './styles.css'
import { hp } from "../../util/helpers";
import Loading from "../../components/Loading";
import { sc } from "../../services";

export default function Schools(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const state = useSelector(state => state.global)
  let renders = useRef(0)
  const [searchParams] = useSearchParams()
  const initialForm = {
    nome: '',
    cidade_id: ''
  }
  const [form, setForm] = useState({
    nome: searchParams.get('nome') ? searchParams.get('nome') : '',
    cidade_id: searchParams.get('cidade_id') ? searchParams.get('cidade_id') : ''
  })
  const [search, setSearch] = useState(initialForm)
  const [forceEffect, setForceEffect] = useState(0)
  const [showElement, setShowElement] = useState(false)
  let browserNav = useRef(false)

  // Solicita as cidades para a api e salva os dados no redux
  useEffect(() => {
    sc.getData({dispatch, navigate, url: 'cidades', action: 'setCities'})

    // Se o usuário clicou em um botão de navegação do browser, identifica essa ação através do browserNav
    const handlePopState = () => {
      browserNav.current = true
    }
    window.addEventListener('popstate', handlePopState)
    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { 
    let nome = search.nome
    let cidade_id = search.cidade_id
    let page =  1
    if(browserNav.current){ // Se navegou através da navegação do browser, usa os parâmetros para fazer a requisição
      nome = searchParams.get('nome') ? searchParams.get('nome') : ''
      cidade_id = searchParams.get('cidade_id') ? searchParams.get('cidade_id') : ''
      page = searchParams.get('page') ? searchParams.get('page') : ''
    }
    const url = 'escolas?page=' + page + '&nome=' + nome + '&cidade_id=' + cidade_id

    function executeAction(){
      if(browserNav.current){
        browserNav.current = false
        sc.getData({dispatch, navigate, url, action: 'setSchools'})
      } else {
        // Navega para a própria página para mudar os parâmetros de query e ativar o useEffect da requisição
        // Assim, fica um histórico de pesquisa no navegador
        if(location.pathname === '/escolas'){
          navigate('/' + url)
        }        
      }  
    }

    // Evita execução ao iniciar o componente
    if(renders.current > 1){
      executeAction()    
    } else if(process.env.NODE_ENV !== 'development' && renders.current > 0) {
      executeAction()
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, forceEffect])

  // É executado quando ocorre uma modificação em "state.modalDataAction", isso é feito na página modal
  useEffect(() => {
    if(state.modalAction === 'DELETE_SCHOOL'){
      sc.setData({dispatch, navigate, url: 'escolas/' + state.modal.data.id, method: 'DELETE',
        successAction: () => setForceEffect(Math.random())})
    }
    // Limpa o estado para que as alterações possam ser identificadas novamente
    dispatch( actions.setModalAction('') )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.modalAction])
  
  // Modifica o "search" que causa a execução de outro useEffect
  useEffect(() => {
    if(renders.current === 0){ // Não executa na primeira redenrização
      return
    }
    // Lógica para fazer a requisição somente depois de um tempo que o usuário digitar,
    // para evitar que uma requisição seja feita a cada caractere digitado
    const timeout = setTimeout(() => {     
      setSearch(form)
    }, 500)

    return () => clearTimeout(timeout)  

  }, [form])

  // Executa quando os paramêtros de query mudam e faz a requisição para a api
  useEffect(() => {
    let timer
    if(location.pathname === '/escolas' &&  renders.current !== 0){
      const nome = searchParams.get('nome') ? searchParams.get('nome') : ''
      const cidade_id = searchParams.get('cidade_id') ? searchParams.get('cidade_id') : ''
      const page = searchParams.get('page') ? searchParams.get('page') : ''       
      const url = 'escolas?page=' + page +  '&nome=' + nome + '&cidade_id=' + cidade_id

      timer = setTimeout(() => { // Timer para garantir a execução depois da função listener de click na navegação do browser           
        if(!browserNav.current){ // Se não navegou com os botões do browser           
          if(location.search){  // Se tem parâmetros de query
            sc.getData({dispatch, navigate, url, action: 'setSchools'}) 
          } else {            
            setForm(initialForm) // Reseta o form               
          }
        } 
        else {              
          // Modifica o form com os parâmetros query e implica execução de outro useEffect
          setForm({nome, cidade_id})                  
        }              
      }, 10)
    }

    if(renders.current === 0){ // Executa ao iniciar o componente
      sc.getData({dispatch, navigate, url: 'escolas', action: 'setSchools'})
    }
      
    return () => clearTimeout(timer)
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // Quando volta para a rota, atualiza os dados
  useEffect(() => {
    if(location.state === 'update' && renders.current !== 0){
      setForceEffect(Math.random())
    }
  }, [location.state])

  // Deley para exibir o texto de "escolas não encontradas"
  useEffect(() => {
    renders.current += 1
    let timer
    if(location.pathname === '/escolas'){
      if(!state.dataLoading){ // Se a requisição terminou
        timer = setTimeout(() => setShowElement(true), 200)
        
      } else {
        setShowElement(false)
      }
    }
    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.dataLoading])

  function handleChangeInput(e){
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

  function navigateTo(p){
    let prev = p.label.includes('Previous')
    let next = p.label.includes('Next')
    if((state.linkDisabled.prev && prev) || (state.linkDisabled.next && next)){
      return
    }

    let url = '/escolas?page='
    let page =  searchParams.get('page') ? parseInt(searchParams.get('page')) : parseInt(p.label)

    if(!page){
      page = 1
    }
    if(prev){
      url += page - 1
    }
    else if(next){
      url += page + 1
    } else {
      url += p.label
    }

    const nome = searchParams.get('nome') ? searchParams.get('nome') : ''
    const cidade_id = searchParams.get('cidade_id') ? searchParams.get('cidade_id') : ''
    url += '&nome=' + nome + '&cidade_id=' + cidade_id

    navigate(url)
  }

  return (
    <div> {/* Ou renderiza o filtro e escolas ou o conteúdo de outra página*/}
      { location.pathname === '/escolas' ? <>
          <div>
            <div className="row">
              <div className="col-12 col-md-9">
                <input type="search" value={form.nome} placeholder="Pesquise por escolas" className="form-control" name="nome" 
                  onChange={handleChangeInput} />
              </div>

              <div className="col-10 col-md-2 mt-2 mt-md-0">
                <select className="form-select" value={form.cidade_id} name="cidade_id" onChange={handleChangeInput} >
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

          { state.schools.length > 0 &&
          <div className="mt-4 mb-3">
            <div className="text-center mb-1"> 
              <small>{ state.pageData.from } - { state.pageData.to } </small>
            </div>
            <div className="d-flex justify-content-center">            
              <nav aria-label="Page navigation example">
                <ul className="pagination">               
                  { state.pageData.links?.map((p, i) => 
                    <span key={ 'link-paginate-' + i } onClick={ () => navigateTo(p) } >
                      { p.label.includes('Previous') &&                 
                          <li className="page-item pointer">
                            <span className={state.linkDisabled.prev ? 'page-link disabled' : 'page-link'}>
                              <i className="bi bi-arrow-left"></i></span>                  
                          </li>
                      }
                      { p.label.includes('Next') &&                   
                          <li className="page-item pointer">
                            <span className={state.linkDisabled.next ? 'page-link disabled' : 'page-link'}>
                              <i className="bi bi-arrow-right"></i></span>
                          </li>
                      }
                      { !p.label.includes('Next') && !p.label.includes('Previous') &&                     
                          <li className={ p.active ? 'page-item active pointer' : 'page-item pointer' }>
                            <span className="page-link"> { p.label } </span>
                          </li>                  
                      }        
                    </span> 
                  )}
                </ul>
              </nav>
            </div>
          </div>
          }

          { !state.schools.length && showElement &&
            <h5 className="text-center mt-5">Ops! não foram encontradas escolas</h5>
          }
        </Loading>
        
      </>
      : // Exibe outra página
        <Outlet/>
      }
  </div>
)}
