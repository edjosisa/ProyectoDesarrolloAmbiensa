import './App.css';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
import MostrarClientes from './components/MostrarClientes';
import CrearCliente from './components/CrearCliente';
import EditarCliente from './components/EditarCliente';
function App() {
  return (
    <div className="App">

      <div>
        
      </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MostrarClientes/>}/>
          <Route path='/create' element={<CrearCliente/>}/>
          <Route path='/edit/:id' element={<EditarCliente/>}/>
          

        </Routes>
        
        

        
      </BrowserRouter>
    </div>
  );
}

export default App;
