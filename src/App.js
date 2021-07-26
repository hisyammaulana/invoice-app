import logo from './logo.svg';
import './App.css';
import Invoice from './Invoice';
import Home from './Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/tagihan/:kode' component={Invoice}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
