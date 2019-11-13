import React from 'react';
import './App.css';
import Home from './components/home';
import Gegevens from './components/gegeven';
import {BrowserRouter, Route} from 'react-router-dom';
import TrendingAnime from './components/TrendingAnime';

class App extends React.Component {
    render(){
        return (
            <BrowserRouter>
                <div className="App">
                    <Home />
                    <Gegevens />
                </div>
                <Route path='/trendingAnime' component={TrendingAnime} />
            </BrowserRouter>
        );
    } //render
}

export default App;
