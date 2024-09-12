import { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from './store'

function App() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Atualiza os estados do redux ao iniciar a aplicação
  useEffect(() => {
    const user = {
      name: localStorage.getItem('name'),
      token: localStorage.getItem('token')
    }
    dispatch( actions.setUser(user) )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Ajuste do título da aplicação de acordo com a rota acessada
  useEffect(() => { 
    let title = 'Schools'
    switch(location.pathname){ 
      case '/login': title += ' - login'; break
      case '/sobre': title += ' - sobre'; break
      case '/escolas': title += ' - escolas'; break
      case '/escolas/cadastro': title += ' - cadastro de escola'; break
      default:
    }
    document.getElementsByTagName('title')[0].innerText = title

    if(location.pathname === '/'){
      navigate('/login')
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <div>
      <Navbar/>
      <div className='container-fluid mt-3 mb-3'>
        <Outlet />        
      </div>
    </div>
  );
}

export default App;