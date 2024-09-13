import { useSelector } from "react-redux";
import './styles.css'

export default function Loading({children}){
  const state = useSelector(state => state.global)

  return (
    <>
      { state.dataLoading ? 
        <div className="d-flex justify-content-center">
          <img src="/images/1488.gif" className="gif-loading" alt="" />
        </div>
        :
        children 
      }
    </>
  )
}