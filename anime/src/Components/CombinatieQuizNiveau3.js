import React from 'react';
import PosterQuizNiveau3 from './PosterQuizNiveau3';
import SynopsisQuizNiveau3 from './SynopsisQuizNiveau3';
import TitlesQuizNiveau3 from './TitlesQuizNiveau3';

class CombinatieQuizNiveau3 extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            randomNR: null,
            poster: false,
            synopsis: false,
            titles: false,
        }
    } // constructor

    componentWillMount() {
        const that = this;
        var r_nummer;

        r_nummer = Math.round(Math.random() * 10);

        that.setState({
            randomNR: r_nummer,
        });
    } // componentWillMount

    componentDidMount() {
        const that = this;
        that.bepaalDeQuiz();
    } // componentDidMount

    bepaalDeQuiz = () => {
        var {randomNR} = this.state;
        const that = this;

        switch(randomNR) {
            case 1:
            case 2:
            case 3:
                that.setState({
                    poster: true,
                });
              return console.log("poster");
            case 4:
            case 5:
            case 6:
                that.setState({
                    synopsis: true,
                });
              return console.log("synopsis");
            case 7:
            case 8:
            case 9:
            case 10:
                that.setState({
                    titles: true,
                });
              return console.log("titles");
            default:
                window.location.reload(false);
                return console.log("Er is iets misgegaan");
          }
    } // bepaalDeQuiz

    render() {
        var {poster, synopsis, titles} = this.state;

        return (
            <div>                
                { poster && <PosterQuizNiveau3 /> }
                { synopsis && <SynopsisQuizNiveau3 /> }
                { titles && <TitlesQuizNiveau3 /> }
            </div>
        );
    } // render
}

export default CombinatieQuizNiveau3;