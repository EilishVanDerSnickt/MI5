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
        //console.log(that.props.data);

        that.ophalenRelevanteData();

        return(<p></p>);
    } // render

    ophalenRelevanteData() {
        var {trendingAnime, isLoaded} = this.state;
        const that = this;

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
                posters[i] = trendingAnime.data[i].attributes.posterImage.tiny;
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

        that.vulTrendingAnime(ids, posters, enjp_titles, jajp_titles, synopsis);

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
}

export default DataToFirebase;