import React from 'react';
import './App.css';
import Firebase from './firebaseInit';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoadedAnime: false,
    }
  } //constructor

  componentDidMount() {
    fetch('https://kitsu.io/api/edge/trending/anime')
    .then(res => res.json())
    .then(json => {
        this.setState({
            items: json,
            isLoadedAnime: true,
        })
    });
  } //componentDidMount

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
  } //render

  toonAnime = () => {
    console.log("Trending anime");

    var {items, isLoadedAnime} = this.state;

    if (!isLoadedAnime) {
      return <p>Loading ... </p>
    } else {
      var ids = [];
      var posters = [];
  
      for (let i = 0; i < 10; i++) {
        ids[i] = items.data[i].id;
        posters[i] = items.data[i].attributes.posterImage.tiny;
  
        Firebase.collection("TrendingAnime").add({
          id: ids[i],
          posterURL: posters[i]
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        }); 
      }
    }
  } //toonAnime

  toonPosters = () => {
    console.log("Posters");
  } //toonPosters

  toonTitles = () => {
    console.log("Titles");
  } //toonTitles

  toonSynopsis = () => {
    console.log("Synopsis");
  } //toonSynopsis

  toonCharacters = () => {
    console.log("Characters");
  } //toonCharacters
  
}

export default App;
