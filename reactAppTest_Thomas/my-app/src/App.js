import React from 'react';
import Thomaach from './thomaach';


function App() {

  const lijst = {
    personen : [
      {name: "thomas", age: 20, belt: "green", id: 1},
      {name: "ruben", age: 20, belt: "red", id: 2},
      {name: "rens", age: 21, belt: "black", id: 3}
    ]
  }

  /*const persoon = {
    name: "thomas",
    age: 20,
    belt: "green"
  };*/

  
  
  return (
    <div className="App">
      
      <h1>My first react app!</h1>

      <p>Welcome :p</p>       
       {/*<Thomaach value={persoon}/>*/}
       <Thomaach value={lijst}/>
    </div>
  );
}


export default App;
