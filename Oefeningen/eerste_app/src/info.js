import React from 'react';
import Home from './home';

class Info extends React.Component {
    //initialiseer constructor en zet de state gelijk aan een array van items en een boolean isLoaded
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    } //constructor

    toonAnime = (id) => {
        console.log(id);
        fetch('https://kitsu.io/api/edge/anime/' + {id})
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
        });
        
    }

    componentDidMount(){
        //fecth de juiste url en vul de gegevens in de array en zet de isLoaded bool op true
        
       
    } //componentDidMount

    render(){
        // zet 2 variabelen gelijk aan de staat
        var {isLoaded, items} = this.state;
        //wanneer de staat niet geladen is, toon Loading
        if (!isLoaded){
            return <h1>Loading ... </h1>
        } else {
            //wanneer de staat wel geladen is maak variabelen aan met de geladen info die je nodig hebt
            var title = items.data[0].attributes.titles.en;
            var japanesetitle = items.data[0].attributes.titles.ja_jp;
            var startDate = items.data[0].attributes.startDate;
            var synopsis = items.data[0].attributes.synopsis;
            var rating = items.data[0].attributes.averageRating;
            var status = items.data[0].attributes.status;
            var poster = items.data[0].attributes.posterImage.tiny;

            if (status == "current"){
                status = "ongoing";
            }
            //toon de variabelen
            return (
                <div>
                    <Home toonAnime={this.toonAnime} value={this.toonAnime}/>
                   <h1>{title} - {japanesetitle}</h1>
                   <img src={poster} alt="One Piece"></img>
                   <p className="startDate">{startDate}</p>
                   <p className="rating">{rating}</p>
                   <p className="status">{status}</p>
                   <p className="Synopsis">{synopsis}</p>
                </div>
            );
        }
    } //render
}

export default Info;