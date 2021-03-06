import React from 'react';
require('./styles/AnimePoster.css');

function AnimePoster({value}) {
    const {animes} = value;
    
   
    return(
        <div className="grid-view">
            { 
                animes.map(anime => {
                    return (<div className="Div-Posters" key={anime.id}>
                            <div className="Div-anime">                                
                                <figure>
                                    <a href={"/AnimeDetails/" + anime.id}><img className="posterImg" src={anime.poster} alt="Poster Anime"></img>
                                    <figcaption className="figcapText">{anime.name}</figcaption>
                                    </a>
                                </figure>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
  } 

export default AnimePoster;