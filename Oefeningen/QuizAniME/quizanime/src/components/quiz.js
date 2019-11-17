import React from 'react';
import Firebase from './firebaseInit';

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titels: [],
            local: []
        }
    }

    componentWillMount() {


    }
    componentDidMount() {
        const that = this;
        var newTitles = [];
        var array = [];

        for (var i = 0; i < localStorage.length; i++){
            console.log(localStorage.getItem(localStorage.key(i)));
            array.push(localStorage.getItem(localStorage.key(i)));
        }

        Firebase.collection("TrendingAnime").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                newTitles.push(doc.data().en_ja_title);
            });
            // update new titles 
            //newTitles = newTitles.map((d) => <li key={d.name}>{d.name}</li>);
            that.setState({
                titels: newTitles,
                local: array
            });
            console.log("st", that.state);
        });
        // that.setState({ titels }) = newTitles.map((d) => <li key={d.name}>{d.name}</li>);
    }
    render() {
        return (
            <div>
                <h1>Welcome to the quiz!</h1>
                <ul>{this.state.titels}</ul>
                <ul>{this.state.local}</ul>
            </div>
        );
    }
}

export default Quiz;