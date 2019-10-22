import React, {Component} from 'react';
import Info from './info';

class Poster extends Component{
    constructor(props){
        super(props);

        console.log(props);
    }

    toonAnime = (id) => {
        console.log(id);

        return <Info animeID={id}/>
    }


    render(){
        //console.log(this.props.id);
        return(
            <div>
                <img src={this.props.foto} key={this.props.i} alt='OnePiece' onClick={(id) => {this.toonAnime(this.props.id)}}></img>
            </div>
            
        );
    }
}

export default Poster;
