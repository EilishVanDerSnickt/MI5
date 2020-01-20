import React from 'react';
import Footer from './Footer';
require('./styles/AnimeDetails.css');

class AnimeDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          anime : [],
          chars : [],
          pics : []
        }
      } // constructor

    componentDidMount(){
        // zoek de index waarop de laatste / zich bevindt om de ID te vinden
        var startIndex = 0, index, laatsteIndex;
        
        while ((index = (window.location.href).indexOf("/", startIndex)) > -1) {
            laatsteIndex = index;
            startIndex = index + 1;
        }

        console.log("uiteindelijke index: " + laatsteIndex);

        //aanmaken belangrijke variabelen
        const AnimeID = (window.location.href).substring(laatsteIndex + 1, (window.location.href).length);
        const that = this;
        var array = new Array(9);
        var arrayNames = [];
        var arrayPic = [];

        //aanmaken object van animes
        var anime = function(name, poster, id, synopsis, rating, charLink, year, avgRating) {
            this.name = name
            this.poster = poster
            this.id = id
            this.synopsis = synopsis
            this.rating = rating
            this.charLink = charLink
            this.year = year
            this.avgRating= avgRating
          }

        //get request van een specifieke anime 
        fetch('https://kitsu.io/api/edge/anime?filter[id]=' + AnimeID)
            .then(response => {
                if(response.ok) return response.json();
                throw new Error(response.statusText)  // throw an error if there's something wrong with the response
            })
            .then(function handleData(data) {
                //loggen van data
                console.log(data.data[0])

                //Data in het object anime stoppen en de state updaten
                var deAnime = new anime(data.data[0].attributes.titles.en_jp,data.data[0].attributes.posterImage.medium, data.data[0].id, data.data[0].attributes.synopsis, 
                    data.data[0].attributes.averageRating, data.data[0].relationships.characters.links.related, data.data[0].attributes.startDate, data.data[0].attributes.averageRating)
                    //data.data[0].relationships.characters.links.related
                that.setState({
                    anime: deAnime
                })

                //nieuwe fetch van alle anime ids van de gefetchte anime
                fetch(that.state.anime.charLink)
                .then(response => {
                    if(response.ok) return response.json();
                    throw new Error(response.statusText)  // throw an error if there's something wrong with the response
                })
                .then(function handleData2(data2) {
                    //loggen en lengte bepalen
                    console.log(data2.data.length)
                    var length = data2.data.length;
                    
                    //alle ids in de array stoppen
                    for (var i = 0; i < length; i++) {
                        array[i] = data2.data[i].id
                    }
                    //toon de array
                    console.log(array);

                    //als deze functie klaar is dan functie test uitvoeren
                }).then(function test(){
                 
                    //een for om voor elke id in de array die bepaalde personage uit de database te halen
                    try {
                        if (array.length >= 0)  {
                            for (var j = 0; j < array.length; j++) {
                                
                                fetch('https://kitsu.io/api/edge/media-characters/' + array[j] + "/character")
                                .then(response => {
                                if(response.ok) return response.json();
                                    //throw new Error(response.statusText)  // throw an error if there's something wrong with the response
                                })
                                // eslint-disable-next-line no-loop-func
                                .then(function handleData3(data3) {
                                    //na de forloop dit uitvoeren en de characters in een object stoppen en dat doorgeven aan een nieuwe functie
                                    //console.log(data3.data.attributes.name);
                                    if (data3 !== undefined) {
                                        arrayNames.push(data3.data.attributes.name);
                                    
                                        try {
                                            arrayPic.push(data3.data.attributes.image.original)
                                        }
                                        catch {
                                            
                                        }
                                    }
        
                                    
                                    //charTest = new characters(arrayNames[0], arrayNames[1], arrayNames[2], arrayNames[3], arrayNames[4], arrayNames[5], arrayNames[6], arrayNames[7], arrayNames[8], arrayNames[9])
                                    //console.log(charTest)
                                    
                                    that.teststate(arrayNames, arrayPic);
                                })
                            
                                
                            }
                        }
                    }
                    catch {
                        alert("dit lukt momenteel niet, probeer een ander woord of later opnieuw!")
                    }

                })
                
            })  
        }

        //dit is een state update functie
        teststate = (arrayNames, arrayPic) => {
            if (arrayNames.length > 9)
            {
                this.setState({
                    chars: arrayNames,
                    pics: arrayPic
                })
                console.log(this.state)
            }
        }

    //html fixen
    render(){
        return (
            <div className="AnimeDetails">
                <img className="posterDetails" src={this.state.anime.poster} alt={this.state.anime.name}></img>
                <h3 className="h4Details">{this.state.anime.name}</h3>
                <p className="startYear">{this.state.anime.year}</p>
                <p className="Synopsis">{this.state.anime.synopsis}</p>
                <p className="Synopsis">average Rating: {this.state.anime.avgRating}%</p>
                    
                    

                    <h3 className="h3Char">Characters</h3>
                    <div className="details-grid-view">


                        <div className="details-Div-anime">                                
                            <figure>
                                <img className="details-posterImg" src={this.state.pics[0]} alt={"Poster Character " + this.state.chars[0]}></img>
                                <figcaption className="figcapText">{this.state.chars[0]}</figcaption>
                                </figure>
                        </div>

                        <div className="details-Div-anime">                                
                            <figure>
                                <img className="details-posterImg" src={this.state.pics[1]} alt={"Poster Character " + this.state.chars[1]}></img>
                                <figcaption className="figcapText">{this.state.chars[1]}</figcaption>
                                </figure>
                        </div>

                        <div className="details-Div-anime">                                
                            <figure>
                                <img className="details-posterImg" src={this.state.pics[2]} alt={"Poster Character " + this.state.chars[2]}></img>
                                <figcaption className="figcapText">{this.state.chars[2]}</figcaption>
                                </figure>
                        </div>

                        <div className="details-Div-anime">                                
                            <figure>
                                <img className="details-posterImg" src={this.state.pics[3]} alt={"Poster Character " + this.state.chars[3]}></img>
                                <figcaption className="figcapText">{this.state.chars[3]}</figcaption>
                                </figure>
                        </div>

                        <div className="details-Div-anime">                                
                            <figure>
                                <img className="details-posterImg" src={this.state.pics[4]} alt={"Poster Character " + this.state.chars[4]}></img>
                                <figcaption className="figcapText">{this.state.chars[4]}</figcaption>
                                </figure>
                        </div>

                        <div className="details-Div-anime">                                
                            <figure>
                                <img className="details-posterImg" src={this.state.pics[5]} alt={"Poster Character " + this.state.chars[5]}></img>
                                <figcaption className="figcapText">{this.state.chars[5]}</figcaption>
                                </figure>
                        </div>

                        <div className="details-Div-anime">                                
                            <figure>
                                <img className="details-posterImg" src={this.state.pics[6]} alt={"Poster Character " + this.state.chars[6]}></img>
                                <figcaption className="figcapText">{this.state.chars[6]}</figcaption>
                                </figure>
                        </div>

                        <div className="details-Div-anime">                                
                            <figure>
                                <img className="details-posterImg" src={this.state.pics[7]} alt={"Poster Character " + this.state.chars[7]}></img>
                                <figcaption className="figcapText">{this.state.chars[7]}</figcaption>
                                </figure>
                        </div>

                        <div className="details-Div-anime">                                
                            <figure>
                                <img className="details-posterImg" src={this.state.pics[8]} alt={"Poster Character " + this.state.chars[8]}></img>
                                <figcaption className="figcapText">{this.state.chars[8]}</figcaption>
                                </figure>
                        </div>

                        <div className="details-Div-anime">                                
                            <figure>
                                <img className="details-posterImg" src={this.state.pics[9]} alt={"Poster Character " + this.state.chars[9]}></img>
                                <figcaption className="figcapText">{this.state.chars[9]}</figcaption>
                                </figure>
                        </div>
                        
                    </div>
                    <Footer />
            </div>
            
        )
    }
    
}

export default AnimeDetails;




 