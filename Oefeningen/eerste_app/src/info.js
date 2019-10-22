import React from 'react';
import Home from './home';
import Poster from './poster';

class Info extends React.Component {
    //initialiseer constructor en zet de state gelijk aan een array van items en een boolean isLoaded
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }

        console.log(props);
    } //constructor

    componentDidMount(){
        var id = this.props.animeID;
        console.log(this.props.animeID);
        console.log(id);
        //fecth de juiste url en vul de gegevens in de array en zet de isLoaded bool op true
        fetch('https://kitsu.io/api/edge/anime/' + {id})
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
        });

        console.log('https://kitsu.io/api/edge/anime/' + {id})
       
    } //componentDidMount

    render(){
        return(<h1>{this.props.animeID}</h1>);
        {/*
        // zet 2 variabelen gelijk aan de staat
        var {isLoaded, items} = this.state;
        //wanneer de staat niet geladen is, toon Loading
        if (!isLoaded){
            return <h1>Loading ... </h1>
        } else {
            //wanneer de staat wel geladen is maak variabelen aan met de geladen info die je nodig hebt
            var title = items.data.attributes.titles.en;
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
                   <h1>{this.props.id}</h1>
                   <h1>{title} - {japanesetitle}</h1>
                   <img src={poster} alt="One Piece"></img>
                   <p className="startDate">{startDate}</p>
                   <p className="rating">{rating}</p>
                   <p className="status">{status}</p>
                   <p className="Synopsis">{synopsis}</p>
                </div>
            );
        }
    */}
    } //render
}

export default Info;