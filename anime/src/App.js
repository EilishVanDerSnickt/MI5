import React from 'react';
import Thomaach from './thomaach';


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
      
      <h1>Hallo!</h1>

      <p>Welcome :p</p>       
       <Thomaach value={lijst}/>
    </div>
  );
}


export default App;
