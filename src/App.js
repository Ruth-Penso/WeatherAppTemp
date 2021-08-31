import logo from './logo.svg';
import './App.css';
import Auto from './AutoCoCities';
import Logo from './img/לוגו מזג אויר.PNG';
import Navigation from './Navigation';
import Favorite from './Favorite';
import store from './Redux/Store'
import { Provider } from 'react-redux'


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <Provider store={store}>
      <div>  

        <Router>

        <Navigation />
          <switch>
            <Route path="/AutoCoCities">
              <Auto />
            </Route>

            <Route path="/Favorite">
              <Favorite />
            </Route>
          </switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
