import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Greeting from './greeting';

class App extends Component{
  render(){
    const greeting = 'Welcome to React';

    return(
      <div>
        <Greeting welcome={greeting}/>
      </div>
    );
  }
}

export default App;
