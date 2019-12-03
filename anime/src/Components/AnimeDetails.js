import React from 'react';
class AnimeDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          anime : []
        }
      } // constructor

      

    componentDidMount(){
        const AnimeID = (window.location.href).substring(35, (window.location.href).length)
        const that = this;
        var array = [];
        
        var arrayNames = [];
        var anime = function(name, poster, id, synopsis, rating, charLink, char1, char2, char3, char4, char5, char6, char7, char8, char9, char10) {
            this.name = name
            this.poster = poster
            this.id = id
            this.synopsis = synopsis
            this.rating = rating
            this.charLink = charLink
            this.char1 = char1
            this.char2 = char2
            this.char3 = char3
            this.char4 = char4
            this.char5 = char5
            this.char6 = char6
            this.char7 = char7
            this.char8 = char8
            this.char9 = char9
            this.char10 = char10
          }
    
        fetch('https://kitsu.io/api/edge/anime?filter[id]=' + AnimeID)
            .then(response => {
                if(response.ok) return response.json();
                throw new Error(response.statusText)  // throw an error if there's something wrong with the response
            })
            .then(function handleData(data) {
                console.log(data.data[0].id);
                //console.log(data.data[0].relationships.characters.links.related)
                

                //console.log(that.state.anime.charLink)

                var deAnime = new anime(data.data[0].attributes.titles.en_jp,data.data[0].attributes.posterImage.medium, data.data[0].id, data.data[0].attributes.synopsis, 
                    data.data[0].attributes.averageRating, data.data[0].relationships.characters.links.related)
                    //data.data[0].relationships.characters.links.related
                that.setState({
                    anime: deAnime
                })

                fetch(that.state.anime.charLink)
                .then(response => {
                    if(response.ok) return response.json();
                    throw new Error(response.statusText)  // throw an error if there's something wrong with the response
                })
                .then(function handleData2(data2) {
                    console.log(data2.data.length)
                    var length = data2.data.length;
                    
                    
                    for (var i = 0; i < length; i++) {
                        array[i] = data2.data[i].id
                    }
                    
                    console.log(array);

                }).then(function test(){

                    for (var j = 0; j < array.length; j++) {
                        fetch('https://kitsu.io/api/edge/media-characters/' + array[j] + "/character")
                        .then(response => {
                         if(response.ok) return response.json();
                        throw new Error(response.statusText)  // throw an error if there's something wrong with the response
                        })
                        .then(function handleData3(data3) {
                            console.log(data3.data.attributes.name);
                            arrayNames.push(data3.data.attributes.name) 
                            
                        })
                        
                    }
                    
                }).then(function next(){
                    var reAnime = new anime(data.data[0].attributes.titles.en_jp,data.data[0].attributes.posterImage.medium, data.data[0].id, data.data[0].attributes.synopsis, 
                        data.data[0].attributes.averageRating, data.data[0].relationships.characters.links.related, arrayNames[0], arrayNames[1],arrayNames[2],arrayNames[3],
                        arrayNames[4],arrayNames[5],arrayNames[6],arrayNames[7],arrayNames[8],arrayNames[9])

                    that.setState({
                        anime: reAnime
                    })

                    console.log("test")
                })
                
            })  
        
        }
    
            
    render(){
        return (
            <div>
                <div className="AnimeDetails">
                    <img></img><h4>Anime Titel</h4>
                    <div>{this.state.anime.id}</div>
                    <ul>
                        <li>{this.state.anime.char1}</li>
                        <li>{this.state.anime.char2}</li>
                        <li>{this.state.anime.char3}</li>
                        <li>{this.state.anime.char4}</li>
                        <li>{this.state.anime.char5}</li>
                        <li>{this.state.anime.char6}</li>
                        <li>{this.state.anime.char7}</li>
                        <li>{this.state.anime.char8}</li>
                        <li>{this.state.anime.char9}</li>
                        <li>{this.state.anime.char10}</li>
                    </ul>
                </div>
            </div>
            
        )
    }
    
}

export default AnimeDetails;


 