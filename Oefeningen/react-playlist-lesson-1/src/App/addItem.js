var React = require('react');
require('./css/addItem.css');

var addItem = React.createClass({
    render: function(){
       return(
           <form id="add-todo" onSubmit={this.handleSubmit}>
               <input type="text" required ref="newItem"/>
               <input type="submit" value="hit me" />
           </form>
       ); 
    }, //render

    //custom functions
    handleSubmit: function(e){
        //prevents the page from reloading
        e.preventDefault();

        this.props.onAdd(this.refs.newItem.value);
    } //handleSubmit
});

module.exports = addItem;