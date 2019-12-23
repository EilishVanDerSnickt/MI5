import React from 'react';
import HttpsRedirect from 'react-https-redirect';
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
import TitlesQuizNiveau2 from './Components/TitlesQuizNiveau2';
import TitlesQuizNiveau3 from './Components/TitlesQuizNiveau3';
import CombinatieQuizNiveau1 from './Components/CombinatieQuizNiveau1';
import CombinatieQuizNiveau2 from './Components/CombinatieQuizNiveau2';
import CombinatieQuizNiveau3 from './Components/CombinatieQuizNiveau3';
import ResultaatQuiz from './Components/ResultaatQuiz';
require('./App.css');

class App extends React.Component {
  render(){
    return (
      <HttpsRedirect>
         <BrowserRouter>
            <Route exact path='/' component={AnimeList} />
            <Route path='/Quiz' component={Quiz} />
            <Route path='/AnimeDetails' component={AnimeDetails} />
            <Route path='/SynopsQuiz_1' component={SynopsisQuizNiveau1} />
            <Route path='/SynopsQuiz_2' component={SynopsisQuizNiveau2} />
            <Route path='/SynopsQuiz_3' component={SynopsisQuizNiveau3} />
            <Route path='/PosterQuiz_1' component={PosterQuizNiveau1} />
            <Route path='/PosterQuiz_2' component={PosterQuizNiveau2} />
            <Route path='/PosterQuiz_3' component={PosterQuizNiveau3} />
            <Route path='/TitlesQuiz_1' component={TitlesQuizNiveau1} />
            <Route path='/TitlesQuiz_2' component={TitlesQuizNiveau2} />
            <Route path='/TitlesQuiz_3' component={TitlesQuizNiveau3} />
            <Route path='/CombinQuiz_1' component={CombinatieQuizNiveau1} />
            <Route path='/CombinQuiz_2' component={CombinatieQuizNiveau2} />
            <Route path='/CombinQuiz_3' component={CombinatieQuizNiveau3} />
            <Route path='/ResultsQuiz' component={ResultaatQuiz} />
        </BrowserRouter>
      </HttpsRedirect>
    );
  } // render
}

export default App;

