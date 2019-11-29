import React from 'react';

function AnimeDetails() {

    const AnimeID = (window.location.href).substring(35, (window.location.href).length)
    var AnimeIDTest;

    fetch('https://kitsu.io/api/edge/anime?filter[id]=' + AnimeID)
        .then(response => {
            if(response.ok) return response.json();
            throw new Error(response.statusText)  // throw an error if there's something wrong with the response
        })
        .then(function handleData(data) {
            console.log(data.data[0].id);
            AnimeIDTest = data.data[0].id;
        })
            

    return (
        <div>
            <div className="AnimeDetails">
                <img></img><h4>Anime Titel</h4>
            </div>
        </div>
        
    );
}

export default AnimeDetails;


 