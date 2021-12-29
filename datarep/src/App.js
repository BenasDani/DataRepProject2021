import './App.css';
import React, { Component } from 'react';
import { Content } from './components/content';
import { Create } from './components/create';
import { Read } from './components/read';
import {Edit} from './components/edit';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



class App extends Component {
  render() {
    return (

      //wraps div element
      <Router>
        <div className="App">

          {/* Navbar*/}
          <Navbar bg="danger" variant="dark">
            
          
            <Navbar.Brand href="/">Gamez</Navbar.Brand>

            <Nav className="me-auto">
              <Nav.Link href="/">Home Page</Nav.Link>
              <Nav.Link href="/read">Game Library</Nav.Link>
              <Nav.Link href="/create">Add Game</Nav.Link>
            </Nav>
          </Navbar>
          <br />
          <br />
          <Switch>
            <Route path='/' component={Content} exact />
            <Route path='/read' component={Read} exact />
            <Route path='/create' component={Create} exact />
            <Route path={"/edit/:id"} component={Edit}></Route>
          </Switch>

        </div>
      </Router>
    );
  }
}
export default App;

