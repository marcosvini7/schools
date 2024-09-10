import { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation()

  useEffect(() => { // Ajuste do título da aplicação de acordo com a rota
    let title = 'Schools'
    switch(location.pathname){
      case '/login': title += ' - login'; break
      case '/sobre': title += ' - sobre'; break
      case '/escolas': title += ' - escolas'; break
      case '/escolas/cadastro': title += ' - cadastro de escola'; break
      default:
    }
    document.getElementsByTagName('title')[0].innerText = title

  }, [location])

  return (
    <div>
      <Navbar/>
      <div className='container-fluid mt-2'>
        { location.pathname === '/' ? 
          <div>
            <h1>App</h1>
          </div>
        : 
          <Outlet />
        }
      </div>
    </div>
  );
}

export default App;