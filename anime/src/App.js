import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import AnimeList from './Components/AnimeList';
import Quiz from './Components/Quiz';
import AnimeDetails from './Components/AnimeDetails';
import SynopsisQuizNiveau1 from './Components/SynopsisQuizNiveau1';
import PosterQuizNiveau1 from './Components/PosterQuizNiveau1';
import TitlesQuizNiveau1 from './Components/TitlesQuizNiveau1';

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <Route exact path='/' component={AnimeList} />
        <Route path='/Quiz' component={Quiz} />
        <Route path='/AnimeDetails' component={AnimeDetails} />
        <Route path='/SynopsisQuiz_1' component={SynopsisQuizNiveau1} />
        <Route path='/PosterQuiz_1' component={PosterQuizNiveau1} />
        <Route path='/TitlesQuiz_1' component={TitlesQuizNiveau1} />
      </BrowserRouter>
    );
  } // render
}

export default App;

