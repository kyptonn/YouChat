import './App.css';
import  { BrowserRouter as Router, 
  Redirect, 
  Route, 
  Switch, 
} from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Singup from './pages/Registro';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>

          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/registro" component={Singup}/>
       
         
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
