import React from 'react';
import Firebase from './firebaseInit';

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titels: []
        }
    }

    componentWillMount() {


    }
    componentDidMount() {
        const that = this;
        var newTitles = [];

        Firebase.collection("TrendingAnime").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                newTitles.push(doc.data().en_ja_title);
            });
            // update new titles 
            //newTitles = newTitles.map((d) => <li key={d.name}>{d.name}</li>);
            that.setState({titels: newTitles});
            console.log("st", that.state);


        });
        // that.setState({ titels }) = newTitles.map((d) => <li key={d.name}>{d.name}</li>);
    }
    render() {

        return (
            <div>
                <h1>Welcome to the quiz!</h1>
                <ul>{this.state.titels}</ul>
            </div>
        );
    }
}

export default Quiz;