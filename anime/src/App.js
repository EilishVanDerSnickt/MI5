import React from 'react';
import Thomaach from './thomaach';
import footer from './footer';


function App() {

  const lijst = {
    personen : [
      {name: "One Piece", id: 1},
      {name: "One Punch Man", id: 2},
      {name: "My Hero Academy", id: 3}
    ]
  }
  
  
  return (
    <div className="App">
      
      <div className="inputDiv"><input type="text" className="input" placeholder="Search..." /></div>

      <h1 className="Anime">AniME</h1>

      <Thomaach value={lijst}/>
      <footer/>
      <div className="footer">
      <a href="">AnimeList</a>
      <a href="">Quiz</a>
      </div>
       
    </div>
  );
}


export default App;
