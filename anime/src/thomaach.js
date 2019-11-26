import React from 'react';
import ls from 'local-storage';
require('./App.css');


function Thomaach({value}) {
    const {personen} = value

   
        

    return(
        <div className="grid-view">
            { 
                personen.map(persoon => {
                    
                    return (<div className="Thomaach" key={persoon.id}>
                            <div className="Div-anime">                                
                                <figure>
                                    <a href={"/AnimeDetails/" + persoon.id}><img className="posterImg" src={persoon.poster} alt="Poster Anime"></img>
                                    <figcaption className="figcapText">{persoon.name}</figcaption>
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

export default Thomaach