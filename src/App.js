import React from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './componentes/login';
import Reg from './componentes/registro'
import Inicio from './componentes/inicio'
import MenProp from './componentes/menuProp'
import MenMenus from './componentes/menuMenus'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/registro' element={<Reg />} />
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/inicio/menuProp' element={<MenProp />} />
        <Route path='/inicio/menuMenus' element={<MenMenus />} />
      </Routes>
      
    </Router>
  );
}

export default App;
