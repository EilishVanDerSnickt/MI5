import React, {Component} from 'react';
import './App.css';
import Navigation from './Components/Navigation';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Components/Home';
import Contact from './Components/Contact';
import About from './Components/About';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Route path='/home' component={Home} />
        <Route path='/contact' component={Contact} />
        <Route path='/about' component={About} />
      </div>
    </BrowserRouter>
  );
}

export default App;
