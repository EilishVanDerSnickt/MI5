import React from 'react';
require('./App.css')

function Thomaach({value}) {


    const {personen} = value

    return(
        <div className="ninja">
            { 
                
                personen.map(persoon => {
                
                    return (<div className="Thomaach" key={persoon.id}>
                    <div className="Div-anime">Name: {persoon.name}</div>
                    </div>
                    )
                })
            }
        </div>
    )
    
  }



export default Thomaach