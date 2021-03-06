import React from 'react';
//import '../App.css';
import AnimePoster from './AnimePoster';
import DatatoFirebase from './DataToFirebase';
//import { lstat } from 'fs';
import ls from 'local-storage';
//import { cpus } from 'os';
import { Offline, Online } from 'react-detect-offline';
import Footer from './Footer';
//import { Link } from 'react-router-dom';
//import { Redirect } from 'react-router-dom'
require('./styles/AnimeList.css');
//require('../App.css');

class AnimeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          animes: [],
          items: [],
          //bij elke setState moet de index verhoogt worden
          index: 0
        }
      } // constructor
      
      addAnime(anime) {
        //console.log("ok")
        let animeList = [...this.state.animes, anime];
        var counter = this.state.index;

        this.setState({
          animes: animeList,
          index: counter + 1
        })
      } // addAnime


      componentWillMount() {
        const that = this;
        var counter = that.state.index;

        var anime = function(name, poster, id) {
          this.name = name
          this.poster = poster
          this.id = id
        }
        var ids = [];
        var posters = [];
        var names = [];
       
        if (localStorage.getItem("Alles") === null) {
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
                that.addAnime(new anime(names[i], posters[i] ,ids[i]));
              }
  
              that.addToLocalStorage(ids, "IDs");
              that.addToLocalStorage(posters, "Posters");
              that.addToLocalStorage(names, "ENJP_titles");
              that.addToLocalStorage(that.state.items, "Alles");
          })
        } else {
          var alles = localStorage.getItem("Alles");
          names = localStorage.getItem("ENJP_titles");
          posters = localStorage.getItem("Posters");
          ids = localStorage.getItem("IDs");

          var alles2 = JSON.parse(alles); 
          var ids2 = JSON.parse(ids);
          var names2 = JSON.parse(names);
          var posters2 = JSON.parse(posters);

          that.setState({
            items: alles2,
            index: counter + 1
          }) 

          var animeArray = [];

          for (let i = 0; i < ids2.length; i++) {
           animeArray.push(new anime(names2[i], posters2[i] ,ids2[i]));
            //that.addAnime(new anime(names2[i], posters2[i] ,ids2[i]));
          }

          counter = that.state.index;

          this.setState({
            animes: animeArray,
            index: counter + 1
          })
        }
      } // componentWillMount

      onFormSubmit = (e) => {
        var search = document.getElementById("Searchbar").value
        
          const that = this;
          e.preventDefault();
          console.log(search);

         try{
          if (document.getElementById("Searchbar").value !== "") {
            fetch('https://kitsu.io/api/edge/anime?filter[text]=' + search)
            .then(response => {
              if(response.ok) return response.json()
              throw new Error(response.statusText)  // throw an error if there's something wrong with the response
            })
            .then(function handleData(data) {
                console.log(data)
                var searchID = data.data[0].id;
                //this.router.push("/AnimeDetails/" + searchID);
                //var link = "/AnimeDetails/" + searchID;
                //return <Redirect to={Link}/>
                that.props.history.push('/AnimeDetails/' + searchID);
            })
          }
          else{}

        }
        catch {
          alert("dit lukt momenteel niet, probeer een ander woord of later opnieuw!")
        }

      }
      

      addToLocalStorage = (array, benaming) => {
        ls.set(benaming, array);
      } // addToLocalStorage
      
      render(){
        var {items, index} = this.state;
        const that = this;
  
        return (
            <div className="App">
              <Offline>
                <div className="stickyDiv">
                  <p>You are currently offline</p>
                </div>
                <h1 className="Anime">AniME</h1>
                <AnimePoster value={that.state}/>
              </Offline>
              <Online>
                <div className="inputDiv"><input id="Searchbar" type="text" className="input" placeholder="Search..."/><button className="waves-effect waves-light btn-small" onClick={this.onFormSubmit}>Search </button></div>
                <img className="logo" src={require('./AniME.png')} alt="logo AniME"></img>
                <AnimePoster value={that.state} />
                <Footer />
                {index === 1 && <DatatoFirebase data={items}/> }
              </Online>
            </div>
        );
      } // render
}

export default AnimeList;