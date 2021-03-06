import "./App.css";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React, { Fragment } from 'react';
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = () => ( 
  <Router>
  <Fragment>
    <Navbar />
    <Route exact path='/' component={Landing} />
    <section className="container">
      <Switch>
      <Route exact path='/Register' component={Register} />
        <Route exact path='/Login' component={Login} />
      </Switch>
    </section>
  </Fragment>
  </Router>
)
export default App;
