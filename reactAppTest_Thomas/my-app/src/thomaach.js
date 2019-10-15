import React from 'react';


function Thomaach({value}) {

    //console.log(value.name)

    const {personen} = value

    /* personen.map(persoon => {
        if (persoon.age > 20) {
        return (<div className="Thomaach" key={persoon.id}>
        <div>Name: {persoon.name}</div>
        <div>Age: {persoon.age}</div>
        <div>Belt: {persoon.belt}</div>
        <br></br>
        </div>
    
            )       
        }
    }) */

   /*  const {personen} = value
    const persoonenLijst = personen.map(persoon => {
        ninja.age > 20 ? (
        <div className="Thomaach" key={persoon.id}></div>
        <div>Name: {persoon.name}</div>
        <div>Age: {persoon.age}</div>
        <div>Belt: {persoon.belt}</div>
        <br></br>
        ) : null;
    }) */
  
    return(
        <div className="ninja">
            { 
                
                personen.map(persoon => {
                if (persoon.age > 20) {
                    return (<div className="Thomaach" key={persoon.id}>
                    <div>Name: {persoon.name}</div>
                    <div>Age: {persoon.age}</div>
                    <div>Belt: {persoon.belt}</div>
                    <br></br>
                    </div>
                    )}
                })
            }
        </div>
    )
  }



export default Thomaach