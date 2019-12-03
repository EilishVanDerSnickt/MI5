import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import AnimeList from './Components/AnimeList';
import Quiz from './Components/Quiz';
import AnimeDetails from './Components/AnimeDetails';
import SynopsisQuizNiveau1 from './Components/SynopsisQuizNiveau1';
import PosterQuizNiveau1 from './Components/PosterQuizNiveau1';
import TitlesQuizNiveau1 from './Components/TitlesQuizNiveau1';
import SynopsisQuizNiveau2 from './Components/SynopsisQuizNiveau2';
import SynopsisQuizNiveau3 from './Components/SynopsisQuizNiveau3';
import PosterQuizNiveau2 from './Components/PosterQuizNiveau2';
import PosterQuizNiveau3 from './Components/PosterQuizNiveau3';

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <Route exact path='/' component={AnimeList} />
        <Route path='/Quiz' component={Quiz} />
        <Route path='/AnimeDetails' component={AnimeDetails} />
        <Route path='/SynopsisQuiz_1' component={SynopsisQuizNiveau1} />
        <Route path='/PosterQuiz_1' component={PosterQuizNiveau1} />
        <Route path='/PosterQuiz_2' component={PosterQuizNiveau2} />
        <Route path='/PosterQuiz_3' component={PosterQuizNiveau3} />
        <Route path='/TitlesQuiz_1' component={TitlesQuizNiveau1} />
        <Route path='/SynopsisQuiz_2' component={SynopsisQuizNiveau2} />
        <Route path='/SynopsisQuiz_3' component={SynopsisQuizNiveau3} />
      </BrowserRouter>
    );
  } // render
}

export default App;

