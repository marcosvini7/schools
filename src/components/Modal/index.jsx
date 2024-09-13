import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { actions } from "../../store"

export default function Modal(){
  const state = useSelector(state => state.global)
  const btnModal = useRef()
  const renders = useRef(0)
  const dispatch = useDispatch()

  useEffect(() => { // Ao clicar no botão que está oculto, exibe a modal
    renders.current += 1
    if(process.env.NODE_ENV === 'development'){  
      if(renders.current > 2){ // Em desenvolvimento o useEffect é executado 2 vezes no início, por isso é preciso validar
        btnModal.current.click()
      }
    } else {
      if(renders.current > 1){
        btnModal.current.click()
      }
    }
    
  }, [state.modal])

  return <>
    <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" 
      data-bs-target="#exampleModal" ref={btnModal}></button>

    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">{state.modal.title}</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {state.modal.body}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Não</button>
            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
              onClick={ () => dispatch( actions.setModalAction( state.modal.action ) ) }>Sim</button>
          </div>
        </div>
      </div>
    </div>
</>
}