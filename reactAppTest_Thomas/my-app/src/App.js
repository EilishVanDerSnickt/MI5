import React from 'react';
import Thomaach from './thomaach';
import AddNinja from './AddNinja';


class App extends React.Component {

  state = {
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

  addNinja = (ninja) => {
    ninja.id = Math.random()
    let ninjas = [...this.state.personen, ninja]
    this.setState({
      personen: ninjas
    })
  }
  render(){
  return (
    <div className="App">
      
      <h1>Hallo!</h1>

      <p>Welcome :p</p>       
       {/*<Thomaach value={persoon}/>*/}
       <Thomaach value={this.state}/>
       <AddNinja addNinja={this.addNinja}></AddNinja>

    </div>
  );
  }
}


export default App;
