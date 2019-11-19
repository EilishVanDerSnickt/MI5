import React from 'react';
import Firebase from './firebaseInit';

class QuizNiveau1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titels: [],
            vraagIndex: null,
            vraagData: null,
            mogelijkeAntwoorden: [],
            antwoord: null
        }
    } // constructor

    componentWillMount() {
        //haal alle trending anime op om te weten hoeveel animes er in de collectie staan
        const that = this;
        var newTitles = [];
        var array = [];

        Firebase.collection("TrendingAnime").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                newTitles.push(doc.data().en_ja_title);
            });
            // update new titles 
            //newTitles = newTitles.map((d) => <li key={d.name}>{d.name}</li>);
            that.setState({
                titels: newTitles,
            });
            console.log("st", that.state);

            that.StelVraag();
        });
    } // ComponentWillMount
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
                        vraagIndex: data.index,
                        vraagData: data.en_ja_title,
                        antwoord: data.synopsis
                    });

                    console.log("st2", that.state);

                    that.HaalAndereAnimesOp();
                });
              }
        });
    } // StelVraag

    HaalAndereAnimesOp = () => {
        var {vraagIndex, vraagData} = this.state;
        const that = this;
        var antwoorden = [];

        console.log(vraagIndex);
        console.log(vraagData);

        let postsRef1 = Firebase.collection("Synopsis")
        let queryRef1 = postsRef1.where("index", "<", vraagIndex)
            .limit(1)
        let queryRef2 = postsRef1.where("index", ">", vraagIndex)
            .limit(1)
        let queryRef3 = postsRef1.where("index", "==", vraagIndex)
            .limit(1)
        
        queryRef1.get().then(function(querySnapshot1) {
            if (querySnapshot1.empty) {
                console.log('no documents found');
            } else {
                querySnapshot1.forEach(function (documentSnapshot1) {
                    var data1 = documentSnapshot1.data();
                    console.log(data1.synopsis);
                    antwoorden.push(data1.synopsis);
                });

                that.shuffleAntwoorden(antwoorden)
            }
        });

        queryRef3.get().then(function(querySnapshot3) {
            if (querySnapshot3.empty) {
                console.log('no documents found');
            } else {
                querySnapshot3.forEach(function (documentSnapshot3) {
                    var data3 = documentSnapshot3.data();
                    console.log(data3.synopsis);
                    antwoorden.push(data3.synopsis);
                });

                that.shuffleAntwoorden(antwoorden)
            }
        });

        queryRef2.get().then(function(querySnapshot2) {
            if (querySnapshot2.empty) {
                console.log('no documents found');
            } else {
            querySnapshot2.forEach(function (documentSnapshot2) {
                    var data2 = documentSnapshot2.data();
                    console.log(data2.synopsis);
                    antwoorden.push(data2.synopsis);
                });

                that.shuffleAntwoorden(antwoorden)
            }
        });

    } //haalAndereAnimesOp

    // shuffle de array antwoorden
    shuffleAntwoorden = (antwoorden) => {
        var j, x, i;
        const that = this;
        for (i = antwoorden.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = antwoorden[i];
            antwoorden[i] = antwoorden[j];
            antwoorden[j] = x;
        }

        that.setState ({
            mogelijkeAntwoorden: antwoorden
        });
    } //shuffleAntwoorden

    render() {
        var {vraagIndex, vraagData, antwoord, mogelijkeAntwoorden} = this.state;
        const that = this;

        //antwoorden staan nu altijd als laatste
        //mogelijkeAntwoorden.push(antwoord);
        
        mogelijkeAntwoorden = mogelijkeAntwoorden.map(function(item, index){
            return (
                <li id={index} onClick={() => {that.CheckAntwoord(item)}}>{item}</li>
            );
        });

        return (
            <div>
                <h1>Quiz level 1</h1>
                <h2>Titles</h2>
                <p>Duid de juiste synopsis aan voor {vraagData}</p>
                <ul>
                    {mogelijkeAntwoorden}
                </ul>
            </div>
        );
    } //render

    CheckAntwoord = (item) => {
        var {antwoord} = this.state;

        if (item == antwoord) {
            alert("Juist");
        } else {
            alert("fout");
        }
        
       
    } //checkAntwoord
}

export default QuizNiveau1;