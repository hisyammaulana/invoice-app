import './App.css';
import Invoice from './Invoice';
import Home from './Home';
import Accourdion from './Accourdion';
import TransferConfirmation from './TransferConfirmation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/tagihan/:kode' component={Invoice}/>
          <Route exact path='/accordion' component={Accourdion}/>
          <Route exact path='/tagihan/:kode/konfirmasi' component={TransferConfirmation}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
