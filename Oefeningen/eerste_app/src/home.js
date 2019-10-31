import React, {Component} from 'react';
import './home.css';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Info from './info';
import Poster from './poster';

//require('./home.css');

class Home extends React.Component {
    //initialiseer constructor en zet de state gelijk aan een array van items en een boolean isLoaded
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    } //constructor

    componentDidMount(){
        //fecth de juiste url en vul de gegevens in de array en zet de isLoaded bool op true
        fetch('https://kitsu.io/api/edge/trending/anime')
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
        });
    } //componentDidMount

    handleOnclick = () => {
        /**this.props.toonAnime(id);
        this.setState({
            items: null,
            isLoaded: null
        })*/
        console.log("Test")
    }

    render(){
            // zet 2 variabelen gelijk aan de staat
        var {isLoaded, items} = this.state;
        //wanneer de staat niet geladen is, toon Loading
        if (!isLoaded){
            return <h1>Loading ... </h1>
        } else {
            //wanneer de staat wel geladen is maak 2 lege arrays, 1 met alle id's en 1 met alle afbeeldinglinks van de posters
            var ids = [];
            var posters = [];

            for (let i = 0; i < 10; i++){
                //vul de arrays met de opgehaalde data
                ids[i] = items.data[i].id;
                posters[i] = items.data[i].attributes.posterImage.tiny;
            }
            
            // geef in de array voor posters de combinatie van de inhoud met de index mee
            posters = posters.map(function(item, index){
                return(
                    // specifieer de routering
                    <BrowserRouter>
                        <div >
                            {/** specifieer de link naar de page waarnaar je wilt verwijzen */}
                            <Link to="/info">
                                {/** geef de posterimage weer en overschrijf deze op als image in de array posters ipv de url die reeds opgeslagen was in deze array */}
                                <Poster id={items.data[index].id} foto={item} i={index}/>
                                {/**<img src={item} key={index} alt={items.data[index].id} onClick={() => {<Info id={items.data[index].id}/>}}></img>*/}
                            </Link>
                            {/** specifieer het pad naar de juiste page en de component die hiermee verbonden wordt */}
                            <Route path='/info' component={Info}/>
                        </div>
                    </BrowserRouter>
                );
            });
            //toon de geupdate array van images op de page
            return (
                <div>
                    {/**<Info id={items.data[0].id}/>*/}
                    <ul>{posters}</ul>
                </div>
            );
        }
    } //render
}

export default Home;