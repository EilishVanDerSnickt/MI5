var React = require('react');
var ReactDOM = require('react-dom');
require('./css/index.css');

import {Router, Route, browserHistory, Link} from 'react-router';

//module requires
var todoItem = require('./todoItem');
var addItem = require('./addItem');
var about = require('./about');

var App = React.createClass({
    render: function(){
        return(
            <Router history={browserHistory}>
                <Route path={'/'} component={TodoComponent}></Route>
                <Route path={'/about'} component={about}></Route>
            </Router>
        );      
    }
})

//create component
var TodoComponent = React.createClass({

    getInitialState: function(){
        return{
            todos: ['wash up', 'eat some cheese', 'take a nap', 'buy flowers'],
            age: 30
        }
    },

    render: function(){
        var ager = setTimeout(function(){
            this.setState({
                age: 35
            })
        }.bind(this), 5000);

        var todos = this.state.todos;

        todos = todos.map(function(item, index){
            return(
                <TodoItem item={item} key={index} onDelete={this.onDelete}/>
            );
        });

        return(
            <div id="todo-list">
                {/*<p>{this.props.mmsg}</p>*/}

                {/*<p><strong>Cheese name: </strong> {this.props.cheese.name} </p>
                <p><strong>Cheese smell factor: </strong> {this.props.cheese.smellfactor} </p>
                <p><strong>Cheese price: </strong> {this.props.cheese.price} </p>*/}

                <Link to={'/about'}>About</Link>
                <p /**onClick={this.clicked}*/>The busiest people have the most leisure... </p>
                <p>{this.state.age}</p>
                <ul>
                    {/**
                    <li>{this.state.todos[0]}</li>
                    <li>{this.state.todos[1]}</li>
                    <li>{this.state.todos[2]}</li>
                    */}

                    {todos}
                </ul>
                <ListComponent todos={this.state.todos}/>
                <addItem onAdd={this.onAdd}/>
            </div>
        );
    }, //render

    //custom functions
    /**clicked: function(){
        console.log('You clicked me');
    }*/

    onDelete: function(item){
        var updatedTodos = this.state.todos.filter(function(val, index){
            return item !== val;
        });

        this.setState({
            todos: updatedTodos
        });
    }, //onDelete

    onAdd: function(item){
        var updatedTodos = this.setState.todos;
        updatedTodos.push(item);
        this.setState({
            todos: updatedTodos
        })
    }, //onAdd

    //lifecycle functions
    componentWillMount: function(){
        console.log('componentWillMount');
    },

    componentDidMount: function(){
        console.log('componentDidMount');

        //any grabbing of external data
    },

    componentWillUpdate: function(){
        console.log('componentWillUpdate');
    }
});

//var myCheese = {name: 'Camembert', smellfactor: 'Extreme pong', price: '3.50'};



//put component in html page
ReactDOM.render(</*TodoComponent*/ App /*mmsg="I like cheese" cheese={myCheese}*/ />, document.getElementById('todo-wrapper'));