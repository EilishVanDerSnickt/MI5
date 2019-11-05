import React, {Component} from 'react';
import Info from './info';

class Poster extends Component{
    constructor(props){
        super(props);

        console.log(props);
    }

    render(){
        //console.log(this.props.id);
        return(
            <div>
                <img src={this.props.foto} key={this.props.i} alt='OnePiece' onClick={(id) => {this.toonAnime(this.props.id)}}></img>
                {/**<Info animeID={this.props.id} onClick={console.log({props})}/>*/}
            </div>
            
        );
    }

    toonAnime = (id) => {
        console.log(id);

        return <Info animeID={id}/>
    }
}

export default Poster;
