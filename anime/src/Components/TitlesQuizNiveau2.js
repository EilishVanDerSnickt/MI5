import React from 'react';
import Firebase from './FirebaseInit';
import ls from 'local-storage';
require('./styles/TitlesQuiz.css');

class TitlesQuizNiveau2 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mogelijkeVragen: [],
            vraagIndex: null,
            vraagData: null,
            mogelijkeAntwoorden: [],
            antwoord: null,
            refreshIndex: null,
            nieuwNiveau: false,
            punten: 0,
            nieuwNiveauLink: null,
        }
    } // constructor
    
    componentWillMount() {
        //haal alle trending anime op om te weten hoeveel animes er in de collectie staan
        const that = this;
        var vragen = [];
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
                vragen.push(doc.data().japanese_title);
            });
            // update new titles 
            //newTitles = newTitles.map((d) => <li key={d.name}>{d.name}</li>);
            that.setState({
              mogelijkeVragen: vragen,
            });
            console.log("st", that.state);
    
            that.StelVraag();
        });
    } // ComponentWillMount

    componentDidMount() {
        const that = this;
        // haal het pad uit de link om te weten of het gaat om een combinatiequiz
        const QuizLink = (window.location.href).substring((window.location.href).length - 13, (window.location.href).length - 1);
    
        console.log("Link:" + QuizLink);
    
        that.setState({
            nieuwNiveauLink: QuizLink + "3",
        });
    } // ComponentDidMount

    StelVraag = () => {
        var {mogelijkeVragen} = this.state;
        const that = this;
    
        //haal een random document op
        var aantalMogelijkeVragen = mogelijkeVragen.length;
        var random = Math.ceil(Math.random() * aantalMogelijkeVragen)
    
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
                    console.log(data.japanese_title);
    
                    //bepaal de gevraagde anime door de status van vraag gelijk te zetten met de titel van de anime
                    that.setState({
                        vraagIndex: data.index,
                        vraagData: data.japanese_title,
                        antwoord: data.en_ja_title
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
    
        let postsRef = Firebase.collection("Titles")
        let queryRef1 = postsRef.where("index", "<", vraagIndex)
            .limit(2)
        let queryRef2 = postsRef.where("index", ">", vraagIndex)
            .limit(2)
        let queryRef3 = postsRef.where("index", "==", vraagIndex)
            .limit(1)
        
        queryRef1.get().then(function(querySnapshot1) {
            if (querySnapshot1.empty) {
                console.log('no documents found');
            } else {
                querySnapshot1.forEach(function (documentSnapshot1) {
                    var data1 = documentSnapshot1.data();
                    console.log(data1.en_ja_title);
                    antwoorden.push(data1.en_ja_title);
                });
            }
        });
    
        queryRef2.get().then(function(querySnapshot2) {
            if (querySnapshot2.empty) {
                console.log('no documents found');
            } else {
            querySnapshot2.forEach(function (documentSnapshot2) {
                    var data2 = documentSnapshot2.data();
                    console.log(data2.en_ja_title);
                    antwoorden.push(data2.en_ja_title);
                });
            }
        });
    
        queryRef3.get().then(function(querySnapshot3) {
            if (querySnapshot3.empty) {
                console.log('no documents found');
            } else {
                querySnapshot3.forEach(function (documentSnapshot3) {
                    var data3 = documentSnapshot3.data();
                    console.log(data3.en_ja_title);
                    antwoorden.push(data3.en_ja_title);
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
    
    render(){
        var {vraagData, mogelijkeAntwoorden, nieuwNiveau, nieuwNiveauLink} = this.state;
        const that = this;

        mogelijkeAntwoorden = mogelijkeAntwoorden.map(function(item, index){
            return (
                <li id={index} onClick={() => {that.CheckAntwoord(item)}}>{item}</li>
            );
        });

        return(
            <div className="Div-TitlesQuiz">
                <h1 className="TitlesQuizh1">Select the right title for <span className="VraagDataTitles">{vraagData} :</span></h1>
                <ul className="MogelijkeAntwoordenTitles">
                    {mogelijkeAntwoorden}
                </ul>
                { nieuwNiveau && <a href={nieuwNiveauLink}><button className="NextBTN">NEXT -></button></a> }
            </div>
        
        );
    } // render

    CheckAntwoord = (item) => {
        var {antwoord, refreshIndex} = this.state;
        const that = this;
        var aantalPunten;

        if (refreshIndex === 1) {
            aantalPunten = localStorage.getItem('Punten');
            localStorage.removeItem("Punten");
            ls.set('Punten', parseInt(aantalPunten));
            aantalPunten = parseInt(aantalPunten, 10);
            console.log(aantalPunten);
        }
    
        aantalPunten = localStorage.getItem('Punten');
        
        console.log(localStorage.getItem('Index'));
        console.log("Aantal punten: " + aantalPunten);
    
        if (item === antwoord) {
            aantalPunten = parseInt(aantalPunten) + 1;
            
            ls.set('Punten', aantalPunten);
    
            that.setState ({
                punten: aantalPunten
            });
        } else {
            aantalPunten = parseInt(aantalPunten);

            that.setState ({
                punten: aantalPunten
            });
        }
    
        console.log("Aantal punten: " + localStorage.getItem('Punten'));
    
        //wanneer de pagina 5 keer heeft gerefreshed stop ermee en ga naar het volgende niveau
        if (refreshIndex < 5) {
            window.location.reload(false);
        } else {
            localStorage.removeItem('Index');
    
            ls.set('Punten', aantalPunten);
            console.log("Aantal punten: " + localStorage.getItem('Punten'));
    
            console.log("Ga naar niveau 3");
    
            that.setState ({
                nieuwNiveau: true
            });
        }
    } // checkAntwoord
}

export default TitlesQuizNiveau2;