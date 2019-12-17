import React from 'react';
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
        //aanmaken belangrijke variabelen
        const AnimeID = (window.location.href).substring(35, (window.location.href).length)
        const that = this;
        var array = new Array(9);
        var charTest;
        var arrayNames = [];
        var arrayPic = [];

        //aanmaken object van animes
        var anime = function(name, poster, id, synopsis, rating, charLink, year) {
            this.name = name
            this.poster = poster
            this.id = id
            this.synopsis = synopsis
            this.rating = rating
            this.charLink = charLink
            this.year = year
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
                    data.data[0].attributes.averageRating, data.data[0].relationships.characters.links.related, data.data[0].attributes.startDate)
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
                    for (var j = 0; j < array.length; j++) {
                        fetch('https://kitsu.io/api/edge/media-characters/' + array[j] + "/character")
                        .then(response => {
                         if(response.ok) return response.json();
                        throw new Error(response.statusText)  // throw an error if there's something wrong with the response
                        })
                        // eslint-disable-next-line no-loop-func
                        .then(function handleData3(data3) {
                            //na de forloop dit uitvoeren en de characters in een object stoppen en dat doorgeven aan een nieuwe functie
                            //console.log(data3.data.attributes.name);
                            arrayNames.push(data3.data.attributes.name)
                            
                            arrayPic.push(data3.data.attributes.image.original)
                            
                            //charTest = new characters(arrayNames[0], arrayNames[1], arrayNames[2], arrayNames[3], arrayNames[4], arrayNames[5], arrayNames[6], arrayNames[7], arrayNames[8], arrayNames[9])
                            //console.log(charTest)
                            
                            that.teststate(arrayNames, arrayPic);
                        })
                        
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

    /*<ul>
                        {this.state.pics.map(pic => (
                                <li className="PersDetails"><img  src={pic}></img></li>
                            ))}
                    </ul>




                    <ul>
                        
                        {this.state.chars[1]}</li>
                        <img className="detailsCharPic" src={this.state.pics[1]}></img>
                        {this.state.chars[2]}</li>
                        <img className="detailsCharPic" src={this.state.pics[2]}></img>
                        {this.state.chars[3]}</li>
                        <img className="detailsCharPic" src={this.state.pics[3]}></img>
                        {this.state.chars[4]}</li>
                        <img className="detailsCharPic" src={this.state.pics[4]}></img>
                        {this.state.chars[5]}</li>
                        <img className="detailsCharPic" src={this.state.pics[5]}></img>
                        {this.state.chars[6]}</li>
                        <img className="detailsCharPic" src={this.state.pics[6]}></img>
                        {this.state.chars[7]}</li>
                        <img className="detailsCharPic" src={this.state.pics[7]}></img>
                        {this.state.chars[8]}</li>
                        <img className="detailsCharPic" src={this.state.pics[8]}></img>
                        {this.state.chars[9]}</li>
                        <img className="detailsCharPic" src={this.state.pics[9]}></img>
                    </ul>
                    */
    
    //html fixen
    render(){
        return (
            <div>
                <div className="AnimeDetails">
                <img className="posterDetails" src={this.state.anime.poster} alt={this.state.anime.name}></img>
                <h3 className="h4Details">{this.state.anime.name}</h3><p className="h4Details">{this.state.anime.year}</p>
                <p>{this.state.anime.synopsis}</p>
                    
                    <table className="TableClass">
                    <h3>Characters</h3>
                        <tr>
                            <th>{this.state.chars[0]}</th>
                            <th><img className="detailsCharPic" src={this.state.pics[0]}></img></th>
                            <th>{this.state.chars[1]}</th>
                            <th><img className="detailsCharPic" src={this.state.pics[1]}></img></th>
                            <th>{this.state.chars[2]}</th>
                            <th><img className="detailsCharPic" src={this.state.pics[2]}></img></th>
                            <th>{this.state.chars[3]}</th>
                            <th><img className="detailsCharPic" src={this.state.pics[3]}></img></th>
                        </tr>
                        <tr>
                            <th>{this.state.chars[4]}</th>
                            <th><img className="detailsCharPic" src={this.state.pics[4]}></img></th>
                            <th>{this.state.chars[5]}</th>
                            <th><img className="detailsCharPic" src={this.state.pics[5]}></img></th>
                            <th>{this.state.chars[6]}</th>
                            <th><img className="detailsCharPic" src={this.state.pics[6]}></img></th>
                            <th>{this.state.chars[7]}</th>
                            <th><img className="detailsCharPic" src={this.state.pics[7]}></img></th>
                        </tr>
                        <tr>
                            <th>{this.state.chars[8]}</th>
                            <th><img className="detailsCharPic" src={this.state.pics[8]}></img></th>
                            <th>{this.state.chars[9]}</th>
                            <th><img className="detailsCharPic" src={this.state.pics[9]}></img></th>
                        </tr>
                        
                            
                        
                    </table>
                    
                    
                </div>
            </div>
            
        )
    }
    
}

export default AnimeDetails;


 