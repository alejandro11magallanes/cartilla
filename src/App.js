import React from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './componentes/login';
import Registro from './componentes/registro';
import RegistroProvedor from './componentes/registroProv'
import Inicio from './componentes/inicio'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/registro' element={<Registro />} />
        <Route path='/registroProv' element={<RegistroProvedor />} />
        <Route path='/inicio' element={<Inicio />} />
      </Routes>
      
    </Router>
  );
}

export default App;
