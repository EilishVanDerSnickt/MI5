import React from 'react';
import Thomaach from '../thomaach';
import DatatoFirebase from './DataToFirebase';
import { lstat } from 'fs';
import ls from 'local-storage';
import { cpus } from 'os';

class AnimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          personen : [],
          items: [],
          //bij elke setState moet de index verhoogt worden
          index: 0,
          localStorageItems: []
        }
      } // constructor
      
      addAnime(anime) {
        //console.log("ok")
        let animes = [...this.state.personen, anime]
        var counter = this.state.index;
        this.setState({
          personen: animes,
          index: counter + 1
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
          var counter = that.state.index;
            
          fetch('https://kitsu.io/api/edge/trending/anime')
          .then(response => {
            if(response.ok) return response.json();
            throw new Error(response.statusText)  // throw an error if there's something wrong with the response
          })
          .then(function handleData(data) {
              console.log(data);
  
              that.setState({
                items: data,
                index: counter + 1,
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
  
              that.addToLocalStorage(ids, "IDs");
              that.addToLocalStorage(posters, "Posters");
              that.addToLocalStorage(names, "ENJP_titles");
          })
      } // componentDidMount

      addToLocalStorage = (array, benaming) => {
        ls.set(benaming, array);

        console.log("Local storage: " + localStorage.getItem(benaming));
      
      } // addToLocalStorage
      
      render(){
        var {items, index} = this.state;
        const that = this;
      
        return (
            <div className="App">
                <div className="inputDiv"><input type="text" className="input" placeholder="Search..." /></div>
                <h1 className="Anime">AniME</h1>
                <Thomaach value={that.state} />
                
                <div className="footer">
                    <a href="/">AnimeList</a>
                    <a href="/Quiz">Quiz</a>
                </div>
                { index == 1 && <DatatoFirebase data={items}/> }
                
            </div>
        );
      } // render
}

export default AnimeList;