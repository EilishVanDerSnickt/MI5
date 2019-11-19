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
                        vraag: data.index
                    });

                    console.log("st2", that.state);


                    that.HaalAndereAnimeOp();
                });
              }
        });
    } // StelVraag

    HaalAndereAnimeOp = () => {
        var {vraag} = this.state;

        console.log(this.state.vraag);

        /** Je krijgt alleen de laatste where te zien 
        Firebase.collection("Titles").where("index", "<", vraag)
        Firebase.collection("Titles").where("index", ">", vraag)
        .get()
        .then(snap => {
            snap.forEach(doc => {
                console.log(doc.data());
            });
        }); */

        let postsRef1 = Firebase.collection("Titles")
        let queryRef1 = postsRef1.where("index", "<", vraag)
        let queryRef2 = postsRef1.where("index", ">", vraag)
        
        queryRef1.get().then(function(querySnapshot1) {
            if (querySnapshot1.empty) {
                console.log('no documents found');
              } else {
                querySnapshot1.forEach(function (documentSnapshot1) {
                    var data = documentSnapshot1.data();
                    console.log(data.en_ja_title);
                });
              }
        });

        queryRef2.get().then(function(querySnapshot2) {
            if (querySnapshot2.empty) {
                console.log('no documents found');
              } else {
                querySnapshot2.forEach(function (documentSnapshot2) {
                    var data = documentSnapshot2.data();
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