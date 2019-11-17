import React from 'react';
import Firebase from './firebaseInit';
import ls from 'local-storage';

class Gegevens extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      isLoadedAnime: false,
      localStorage: []
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
        <div className="Gegevens">
          <button onClick={() => {this.toonAnime()}}> Show trending anime </button>
          <button onClick={() => {this.toonPosters()}}>Show posters</button>
          <button onClick={() => {this.toonTitles()}}>Show titles</button>
          <button onClick={() => {this.toonSynopsis()}}>Show synopsis'</button>
          <button onClick={() => {this.toonCharacters()}}> Show characters </button>
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
            index: i,
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
        this.addToLocalStorage(posters);
    }
} //toonAnime

addToLocalStorage = (array) => {
    this.setState({
        localStorage: array
    })

    ls.set('TrendingAnime', array);

   
    for (var i = 0; i < localStorage.length; i++){
        console.log(localStorage.getItem(localStorage.key(i)));
    }
}

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

    var {items, isLoadedAnime} = this.state;

    if (!isLoadedAnime) {
    return <p>Loading ... </p>
    } else {
        var ids = [];
        var characters = [];
    
        for (let i = 0; i < 10; i++) {
            ids[i] = items.data[i].id;
            //console.log(ids[i]);
    
            this.haalCharacterIDsOp(ids[i]);
        }
    }
} //toonCharacters

haalCharacterIDsOp = (id) => {
    console.log(id);
    
    var characterIDs = [];
    var request = new XMLHttpRequest();
    var request2 = new XMLHttpRequest();

    request.open('GET', 'https://kitsu.io/api/edge/anime/' + id + '/characters');

    request.onload = function(){
        var ourdata = JSON.parse(request.responseText);
        //console.log(ourdata);
    
        for (let i = 0; i < 10; i++){
            characterIDs[i] = ourdata.data[i].id;
            console.log("IDs")
            console.log(characterIDs[i]);
            
            // Haalt maar bepaalde data op
            request2.open('GET', 'https://kitsu.io/api/edge/media-characters/' + characterIDs[i] + '/character');
    
            request2.onload = function() {
            var ourdata = JSON.parse(request2.responseText);
            console.log(ourdata);
            var naam = ourdata.data.attributes.names.en;
            console.log(naam);
    
            Firebase.collection("Characters").add({
                ID: characterIDs[i],
                Name: naam,
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            }); 
            }
            request2.send();
    
            /** Haalt alle data op maar is undefined
             fetch('https://kitsu.io/api/edge/media-characters/' + characterIDs[i] + '/character')
            .then(response => {
            if(response.ok) return response.json();
            throw new Error(response.statusText)
            })
            .then(function handledata(data){
            console.log(data.data.attributes.name.en);
            })
            */
        }
    }
    request.send();
} //haalCharacterIDsOp
}

export default Gegevens;
