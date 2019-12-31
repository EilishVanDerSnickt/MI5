import React from 'react';
import Firebase from './FirebaseInit';

class DataToFirebase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trendingAnime: [],
            isLoaded: false,
        }
    } // constructor

    componentDidMount() {
        const that = this;
        this.setState({
            trendingAnime: that.props.data,
            isLoaded: true,
        })
    } // componentDidMount

    render() {
        const that = this;
        console.log(that.props.data);

        that.ophalenRelevanteData();

        return(<p></p>);
    } // render

    ophalenRelevanteData() {
        var {trendingAnime, isLoaded} = this.state;

        console.log(trendingAnime);

        var ids = [];
        var posters = [];
        var enjp_titles = [];
        var jajp_titles = [];
        var synopsis = [];

        if (!isLoaded) {
            console.log("not loaded");
            return;
        } else {
            console.log("loaded");
            for (let i = 0; i < 10; i++) {
                ids[i] = trendingAnime.data[i].id;
                posters[i] = trendingAnime.data[i].attributes.posterImage.medium;
                enjp_titles[i] = trendingAnime.data[i].attributes.titles.en_jp;
                jajp_titles[i] = trendingAnime.data[i].attributes.titles.ja_jp;
                synopsis[i] = trendingAnime.data[i].attributes.synopsis;
            }
        }

        /** 
        console.log(ids);
        console.log(posters);
        console.log(enjp_titles);
        console.log(jajp_titles);
        console.log(synopsis);
        */

        //that.vulTrendingAnime(ids, posters, enjp_titles, jajp_titles, synopsis);
        //that.vulPosters(posters);
        //that.vulTitles(enjp_titles, jajp_titles);
        //that.vulSynopsis(synopsis);

    } // ophalenRelevanteData

    vulTrendingAnime(ids, posters, enjp_titles, jajp_titles, synopsis) {

        for (let i = 0; i < 10; i++) {
            Firebase.collection("TrendingAnime").add({
                index: i,
                id: ids[i],
                posterURL: posters[i],
                en_ja_title: enjp_titles[i],
                japanese_title: jajp_titles[i],
                synopsis: synopsis[i] 
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            }); 
        }

    } //vulTrendingAnime

    vulPosters(posters) {
        for (let i = 0; i < 10; i++) {
            Firebase.collection("Posters").add({
                index: i,
                posterURL: posters[i]
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            }); 
        }
    } // vulPosters

    vulTitles(enjp_titles, jajp_titles){
        for (let i = 0; i < 10; i++) {
            Firebase.collection("Titles").add({
                index: i,
                en_ja_title: enjp_titles[i],
                japanese_title: jajp_titles[i]
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            }); 
        }
    } // vulTitles

    vulSynopsis(synopsis) {
        for (let i = 0; i < 10; i++) {
            Firebase.collection("Synopsis").add({
                index: i,
                synopsis: synopsis[i]
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            }); 
        }
    } // vulSynopsis
}

export default DataToFirebase;