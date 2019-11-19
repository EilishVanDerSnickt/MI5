import React from 'react';
import './App.css';
import Home from './components/home';
import Gegevens from './components/gegeven';
import {BrowserRouter, Route} from 'react-router-dom';
import TrendingAnime from './components/TrendingAnime';
import Quiz from './components/quiz';
import QuizNiveau1 from './components/quizNiveau1';

class App extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <div className="App">
                    <Home />
                    <Gegevens />
                </div>
                <Route path='/trendingAnime' component={TrendingAnime} />
                <Route path='/trendingAnime/quiz' component={Quiz} />
                <Route path='/quizniveau1' component={QuizNiveau1} />
            </BrowserRouter>
        );
    } //render
}

export default App;
