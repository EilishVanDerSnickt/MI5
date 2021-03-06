import React from 'react';
import Firebase from './firebaseInit';
import ls from 'local-storage';
import QuizNiveau2 from './quizNiveau2';

class QuizNiveau1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titels: [],
            vraagIndex: null,
            vraagData: null,
            mogelijkeAntwoorden: [],
            antwoord: null,
            refreshIndex: null,
            nieuwNiveau: false,
            punten: 0
        }
    } // constructor

    componentWillMount() {
        //haal alle trending anime op om te weten hoeveel animes er in de collectie staan
        const that = this;
        var newTitles = [];
        var reloadIndex;

        // maak een teller aan in de localstorage die telt hoeveel keer de pagina refreshd
        if (localStorage.getItem('Index')) {
            reloadIndex = localStorage.getItem('Index');
          } else {
            reloadIndex = 0;
          }

        reloadIndex = parseInt(reloadIndex) + 1;

        ls.set('Index', reloadIndex);

        //zet de waarde van deze teller in de state
        that.setState({
            refreshIndex: reloadIndex
        });

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
                window.location.reload(false);
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

        let postsRef = Firebase.collection("Synopsis")
        let queryRef1 = postsRef.where("index", "<", vraagIndex)
            .limit(1)
        let queryRef2 = postsRef.where("index", ">", vraagIndex)
            .limit(1)
        let queryRef3 = postsRef.where("index", "==", vraagIndex)
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
        var {vraagIndex, vraagData, antwoord, mogelijkeAntwoorden, nieuwNiveau} = this.state;
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
                { that.state.nieuwNiveau && <a href="/quizniveau2"><button>Niveau 2 -></button></a> }
            </div>
        );
    } //render

    CheckAntwoord = (item) => {
        var {antwoord, refreshIndex, punten} = this.state;
        const that = this;
        var aantalPunten

        if (refreshIndex == 1) {
            ls.set('Punten', 0);
        }

        aantalPunten = localStorage.getItem('Punten');
        
        console.log(localStorage.getItem('Index'));
        console.log("Aantal punten: " + aantalPunten);

        if (item == antwoord) {
            alert("juist");
            aantalPunten = parseInt(aantalPunten) + 1;
            
            ls.set('Punten', aantalPunten);

            that.setState ({
                punten: aantalPunten
            });
        } else {
            alert("fout");
        }

        console.log("Aantal punten: " + localStorage.getItem('Punten'));

        //wanneer de pagina 5 keer heeft gerefreshed stop ermee en ga naar het volgende niveau
        if (refreshIndex < 5) {
            window.location.reload(false);
        } else {
            localStorage.clear();

            ls.set('Punten', aantalPunten);
            console.log("Aantal punten: " + localStorage.getItem('Punten'));

            console.log("Ga naar niveau 2");

            that.setState ({
                nieuwNiveau: true
            });
        }
    } //checkAntwoord
}

export default QuizNiveau1;