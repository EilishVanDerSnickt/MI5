import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import AnimeList from './Components/AnimeList';
import Quiz from './Components/Quiz';
import AnimeDetails from './Components/AnimeDetails';

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <Route exact path='/' component={AnimeList} />
        <Route path='/Quiz' component={Quiz} />
        <Route path='/AnimeDetails' component={AnimeDetails} />
      </BrowserRouter>
    );
  } // render
}

export default App;

