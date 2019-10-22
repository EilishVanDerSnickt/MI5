import React from 'react';

class AddTodo extends React.Component{
    state = {
        content: ''
    }

    handleChange = (e) => {
        this.setState({
            content: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // call function to add a todo
        this.props.addTodo(this.state);
        this.setState({
          content: ''
        })
      }

    render(){
       return (
           <div>
               <form onSubmit={this.handleSubmit}>
                   <label>Add new todo:</label>
                   <input type="text" onChange={this.handleChange}/>
               </form>
           </div>
       ) 
    }
}

export default AddTodo