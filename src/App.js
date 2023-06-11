import './App.css';
import  { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import { Startup } from './pages/startup';
import {Home} from "./pages/home";
import {Add} from "./pages/add";
import {Auth} from "./pages/auth";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>        
        <Routes>
          <Route path='/' element={<Startup/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/add' element={<Add/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
