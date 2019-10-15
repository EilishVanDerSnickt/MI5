import React from 'react';
import './home.css';
import {BrowserRouter, Route} from 'react-router-dom';
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
        fetch('https://kitsu.io/api/edge/anime?filter[text]=one%20piece')
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
            var source = items.data[0].attributes.posterImage.tiny
            return (
                <BrowserRouter>
                    <div>
                        <a id="LinktoInfo" href="./info">
                            <img src={source} alt="One Piece poster"></img>
                        </a>
                        <Route path='/info' Component={Info}/>
                    </div>
                </BrowserRouter>
            );
        }
    } //render
}

export default Home;