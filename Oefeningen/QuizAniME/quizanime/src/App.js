import React from 'react';
import './App.css';
import Firebase from './firebaseInit';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoadedAnime: false,
      APIcharacters: [],
      isLoadedCharacters: false,
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
      var enjp_titles = [];
      var jajp_titles = [];
      var synopsis = [];
  
      for (let i = 0; i < 10; i++) {
        ids[i] = items.data[i].id;
        posters[i] = items.data[i].attributes.posterImage.tiny;
        enjp_titles[i] = items.data[i].attributes.titles.en_jp;
        jajp_titles[i] = items.data[i].attributes.titles.ja_jp;
        synopsis[i] = items.data[i].attributes.synopsis;
  
        Firebase.collection("TrendingAnime").add({
          id: ids[i],
          posterURL: posters[i],
          en_ja_title: enjp_titles[i],
          japanese_title: jajp_titles[i],
          synopsis: synopsis[i]
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

    var {items, isLoadedAnime} = this.state;

    if (!isLoadedAnime) {
      return <p>Loading ... </p>
    } else {
      var posters = [];
  
      for (let i = 0; i < 10; i++) {
        posters[i] = items.data[i].attributes.posterImage.tiny;
  
        Firebase.collection("Posters").add({
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
  } //toonPosters

  toonTitles = () => {
    console.log("Titles");

    var {items, isLoadedAnime} = this.state;

    if (!isLoadedAnime) {
      return <p>Loading ... </p>
    } else {
      var enjp_titles = [];
      var jajp_titles = [];
  
      for (let i = 0; i < 10; i++) {
        enjp_titles[i] = items.data[i].attributes.titles.en_jp;
        jajp_titles[i] = items.data[i].attributes.titles.ja_jp;
  
        Firebase.collection("Titles").add({
          en_ja_title: enjp_titles[i],
          japanese_title: jajp_titles[i]
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        }); 
      }
    }
  } //toonTitles

  toonSynopsis = () => {
    console.log("Synopsis");

    var {items, isLoadedAnime} = this.state;

    if (!isLoadedAnime) {
      return <p>Loading ... </p>
    } else {
      var synopsis = [];
  
      for (let i = 0; i < 10; i++) {
        synopsis[i] = items.data[i].attributes.synopsis;
  
        Firebase.collection("Synopsis").add({
          synopsis: synopsis[i]
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        }); 
      }
    }
  } //toonSynopsis

  toonCharacters = () => {
    console.log("Characters");

    var {items, isLoadedAnime, APIcharacters, isLoadedCharacters} = this.state;

    if (!isLoadedAnime) {
      return <p>Loading ... </p>
    } else {
      var ids = [];
      var characters = [];
  
      for (let i = 0; i < 10; i++) {
        ids[i] = items.data[i].id;
        var charactersOpgehaald = false;

        var charactersOpgehaald = this.haalCharactersOp(ids[i]);

        //this.haalCharactersOp(ids[i]);

        if (isLoadedCharacters){
          console.log(charactersOpgehaald);
          console.log(APIcharacters);

          for (let i = 0; i < 10; i++) {
            characters[i] = APIcharacters.data[i].id;
          
            console.log(characters[i]);
          }
        }
      }
    }
  } //toonCharacters

  haalCharactersOp = (id) => {
    console.log(id);
    console.log('https://kitsu.io/api/edge/anime/' + id);

    var isOpgehaald = false;

    fetch('https://kitsu.io/api/edge/anime/' + id)
    .then(res => res.json())
    .then(json => {
        this.setState({
            APIcharacters: json,
        })

        isOpgehaald = true;

        if (!isOpgehaald){
          console.log('API nog niet opgehaald')
        }else {
          return isOpgehaald;
        }
    });
  } //haalCharactersOp
  
}

export default App;
