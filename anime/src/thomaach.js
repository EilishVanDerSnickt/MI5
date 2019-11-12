import React from 'react';
require('./App.css')

function Thomaach({value}) {


    const {personen} = value

    return(
        <div className="ninja">
            { 
                
                personen.map(persoon => {
                
                    return (<div className="Thomaach" key={persoon.id}>
                    <div className="Div-anime"><img src={persoon.poster} alt="Poster Anime"></img>{persoon.name} </div>
                    
                    
                    </div>
                    )
                })
            }
        </div>
    )
    
  }



export default Thomaach