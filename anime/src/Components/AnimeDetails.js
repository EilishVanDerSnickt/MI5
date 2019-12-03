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
                    var array = [];
                    
                    for (var i = 0; i < length; i++) {
                        array[i] = data2.data[i].id
                    }
                    
                    console.log(array);


                    for (var j = 0; j < array.length; j++) {
                        fetch('https://kitsu.io/api/edge/media-characters/' + array[j] + "/character")
                        .then(response => {
                         if(response.ok) return response.json();
                        throw new Error(response.statusText)  // throw an error if there's something wrong with the response
                        })
                        .then(function handleData3(data3) {
                            console.log(data3.data.attributes.name);
                        })
                        
                    }

                    var deAnime = new anime(data.data[0].attributes.titles.en_jp,data.data[0].attributes.posterImage.medium, data.data[0].id, data.data[0].attributes.synopsis, 
                                            data.data[0].attributes.averageRating, data.data[0].relationships.characters.links.related, array[0], array[1],array[2],array[3],
                                            array[4],array[5],array[6],array[7],array[8],array[9])
                    //data.data[0].relationships.characters.links.related
                    that.setState({
                        anime: deAnime
                    })

                    console.log(that.state)
                })

                
            })  
            
            
            
        
        }
    
            
    render(){
        return (
            <div>
                <div className="AnimeDetails">
                    <img></img><h4>Anime Titel</h4>
                    <div>{this.state.anime.id}</div>
                </div>
            </div>
            
        )
    }
    
}

export default AnimeDetails;


 