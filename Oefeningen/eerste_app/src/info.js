import React from 'react';

class Info extends React.Component {
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
            var title = items.data[0].attributes.titles.en;
            var japanesetitle = items.data[0].attributes.titles.ja_jp;
            var startDate = items.data[0].attributes.startDate;
            var synopsis = items.data[0].attributes.synopsis;
            var rating = items.data[0].attributes.averageRating;
            var status = items.data[0].attributes.status;
            var poster = items.data[0].attributes.posterImage.tiny;

            if (status == "current"){
                status = "ongoing";
            }

            return (
                <div>
                   <h1>{title} - {japanesetitle}</h1>
                   <img src={poster} alt="One Piece"></img>
                   <p className="startDate">{startDate}</p>
                   <p className="rating">{rating}</p>
                   <p className="status">{status}</p>
                   <p className="Synopsis">{synopsis}</p>
                </div>
            );
        }
    } //render
}

export default Info;