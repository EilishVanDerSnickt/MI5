import React from 'react';
import Thomaach from './thomaach';
import footer from './Components/footer';
import {BrowserRouter, Route} from 'react-router-dom';
import AnimeList from './Components/AnimeList';
import Quiz from './Components/Quiz';

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <Route exact path='/' component={AnimeList} />
        <Route path='/Quiz' component={Quiz} />
      </BrowserRouter>
    );
  } // render
}

export default App;

