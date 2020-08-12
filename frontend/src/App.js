import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { Provider } from 'react-redux';
import Store from './store';
import Alert from './components/layout/Alert';

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <BrowserRouter>
          <Fragment>
            <Navbar />
            <Route exact path='/' component={Landing}></Route>
            <section className='container'>
              <Alert />
              <Switch>
                <Route exact path='/register' component={Register}></Route>
                <Route exact path='/login' component={Login}></Route>
              </Switch>
            </section>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
