import React from 'react';
import Thomaach from './thomaach';
import footer from './footer';



class App extends React.Component {

  state = {
    personen : [
      {name: "One Piece", posterUrl:"dd", id: 1},
      {name: "One Punch Man", posterUrl:"dd", id: 2},
      {name: "My Hero Academy", posterUrl:"dd", id: 3}
    ]
  }
  
  componentDidMount() {

    /*
    function addAnime(anime) {
      let animes = [...this.state.personen, anime]
      this.setState({
        personen: animes
      })
    }*/

    var anime = function(name, poster, id) {
      this.name = name
      this.poster = poster
      this.id = id
    }
        var ids = [];
        var posters = [];
        var names = [];
    
        
    
        fetch('https://kitsu.io/api/edge/trending/anime')
        .then(response => {
        if(response.ok) return response.json();
        throw new Error(response.statusText)  // throw an error if there's something wrong with the response
        })
        .then(function handleData(data) {
            console.log(data);
            for (let i = 0; i < 10; i++){
              //vul de arrays met de opgehaalde data
              ids[i] = data.data[i].id;
              posters[i] = data.data[i].attributes.posterImage.tiny; 
              names[i] = data.data[i].attributes.canonicalTitle;
    
    
              //addAnime(new anime(data.data[i].attributes.canonicalTitle, data.data[i].attributes.posterImage.tiny, data.data[i].id));
    
            }
        })
  }

  
  
render(){
    return (
      <div className="App">
        
        <div className="inputDiv"><input type="text" className="input" placeholder="Search..." /></div>

        <h1 className="Anime">AniME</h1>
        <Thomaach value={this.state} /*ids={ids} posters={posters} names={names}*//>
        <footer/>
        <div className="footer">
          
        <a href="TODO">AnimeList</a>
        <a href="TODO">Quiz</a>
        </div>
        
      </div>
    );
  }
}


export default App;
