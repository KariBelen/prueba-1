import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import MiApi from './components/MiApi';
import Footer from './components/Footer';

function App() {

  //state para barra de busqueda. 
  const [search, setSearch] = useState('');
  //Se llaman a componentes. 
  return (
    <div className="App">
      <Header setSearch={setSearch}/>
      <MiApi search={search}/>
      <Footer/>
    </div>
  );
}

export default App;
