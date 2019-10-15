import React, {Component} from 'react';
import './home.css';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Info from './info';

//require('./home.css');

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    } //constructor

    componentDidMount(){
        fetch('https://kitsu.io/api/edge/trending/anime')
        .then(res => res.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
        });
    } //componentDidMount

    render(){
        var {isLoaded, items} = this.state;
        if (!isLoaded){
            return <h1>Loading ... </h1>
        } else {
            var ids = [];
            var posters = [];

            for (let i = 0; i < 10; i++){
                ids[i] = items.data[i].id;
                posters[i] = items.data[i].attributes.posterImage.tiny;
            }

            posters = posters.map(function(item, index){
                return(
                    <BrowserRouter>
                        <div>
                            <Link to="/info">
                                <img src={item} key={index} alt={items.data[index].id}></img>
                            </Link>
                            <Route path='/info' component={Info}/>
                        </div>
                    </BrowserRouter>
                );
            });

            return (
                <div>
                    <ul>{posters}</ul>
                </div>
            );
        }
    } //render
}

export default Home;