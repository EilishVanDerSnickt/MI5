import React from 'react';
import './App.css';
import Firebase from './firebaseInit';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <h1>Welcome to the quiz!</h1>
        <button onClick={() => {this.toonAnime()}}>Show trending anime</button>
        <button onClick={() => {this.toonPosters()}}>Show posters</button>
        <button onClick={() => {this.toonTitles()}}>Show titles</button>
        <button onClick={() => {this.toonSynopsis()}}>Show synopsis'</button>
        <button onClick={() => {this.toonCharacters()}}>Show characters</button>
      </div>
    );
  }

  toonAnime = () => {
    console.log("Trending anime");
  }

  toonPosters = () => {
    console.log("Posters");
  }

  toonTitles = () => {
    console.log("Titles");
  }

  toonSynopsis = () => {
    console.log("Synopsis");
  }

  toonCharacters = () => {
    console.log("Characters");
  }
  
}



export default App;
