import React from 'react';
import Thomaach from '../thomaach';
import footer from './footer';
import DatatoFirebase from './DataToFirebase';

class AnimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          personen : [],
          items: [],
          animeLoaded: false
        }
      } // constructor
      
      addAnime(anime) {
        //console.log("ok")
        let animes = [...this.state.personen, anime]
        this.setState({
          personen: animes
        })
        console.log(this.state)
      } //addAnime
      
      componentDidMount() {
        const StatePls = (anime) =>  {
          return this.addAnime(anime)
        }
    
        var anime = function(name, poster, id) {
          this.name = name
          this.poster = poster
          this.id = id
        }
    
        var ids = [];
        var posters = [];
        var names = [];
        const that = this;
          
        fetch('https://kitsu.io/api/edge/trending/anime')
        .then(response => {
          if(response.ok) return response.json();
          throw new Error(response.statusText)  // throw an error if there's something wrong with the response
        })
        .then(function handleData(data) {
            console.log(data);

            that.setState({
              items: data,
              animeLoaded: true,
          })

            for (let i = 0; i < 10; i++){
              //vul de arrays met de opgehaalde data
              ids[i] = data.data[i].id;
              posters[i] = data.data[i].attributes.posterImage.medium; 
              names[i] = data.data[i].attributes.canonicalTitle;
            }
        }).then(function addToState() {
            for (let i = 0; i < ids.length; i++) {
              StatePls(new anime(names[i], posters[i] ,ids[i]))
              //this.addAnime(new anime(names[i], posters[i] ,ids[i]));
                //console.log(i)
            }
        })
      } // componentDidMount
      
      render(){
        var {items, animeLoaded} = this.state;
        const that = this;
      
        return (
            <div className="App">
                <div className="inputDiv"><input type="text" className="input" placeholder="Search..." /></div>
                <h1 className="Anime">AniME</h1>
                <Thomaach value={that.state} />
                <footer/>
                <div className="footer">
                    <a href="/">AnimeList</a>
                    <a href="/Quiz">Quiz</a>
                </div>
                { animeLoaded && <DatatoFirebase data={that.state.items}/> }
                
            </div>
        );
      } // render
}

export default AnimeList;