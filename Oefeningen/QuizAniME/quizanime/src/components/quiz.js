import React from 'react';
import Firebase from './firebaseInit';

class Quiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titels: [],
            local: [],
            vraag: null
        }
    } // constructor

    componentWillMount() {


    } // ComponentWillMount

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

            that.StelVraag();
        });
        // that.setState({ titels }) = newTitles.map((d) => <li key={d.name}>{d.name}</li>);
    } // ComponentDidMount

    StelVraag = () => {
        var {titels} = this.state;
        const that = this;

        //haal een random document op
        var aantalTitels = titels.length;
        var random = Math.ceil(Math.random() * aantalTitels)

        let postsRef = Firebase.collection("TrendingAnime")
        let queryRef = postsRef.where("index", ">=", random)
                   .orderBy("index")
                   .limit(1)

        queryRef.get().then(function(querySnapshot) {
            if (querySnapshot.empty) {
                console.log('no documents found');
              } else {
                querySnapshot.forEach(function (documentSnapshot) {
                    var data = documentSnapshot.data();
                    console.log(data.en_ja_title);

                    //bepaal de gevraagde anime door de status van vraag gelijk te zetten met de titel van de anime
                    that.setState({
                        vraag: data.en_ja_title
                    });

                    that.HaalAndereAnimeOp();
                });
              }
        });
    } // StelVraag

    HaalAndereAnimeOp = () => {
        var {vraag} = this.state;

       
        let postsRef = Firebase.collection("Titles")
        let queryRef1 = postsRef.where("en_ja_title", "==", vraag)
            .orderBy("en_ja_title")
    
        
        queryRef1.get().then(function(querySnapshot) {
            if (querySnapshot.empty) {
                console.log('no documents found');
              } else {
                querySnapshot.forEach(function (documentSnapshot) {
                    var data = documentSnapshot.data();
                    console.log(data.en_ja_title);
                });
              }
        });
    }

    render() {
        return (
            <div>
                <h1>Welcome to the quiz!</h1>
                <ul>{this.state.titels}</ul>
                <ul>{this.state.local}</ul>
            </div>
        );
    } // render
}

export default Quiz;