import React from 'react';
import PosterQuizNiveau1 from './PosterQuizNiveau1';
import SynopsisQuizNiveau1 from './SynopsisQuizNiveau1';
import TitlesQuizNiveau1 from './TitlesQuizNiveau1';

class CombinatieQuizNiveau1 extends React.Component{
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
    }

    bepaalDeQuiz = () => {
        var {randomNR} = this.state;
        const that = this;

       switch(randomNR) {
        case 1:
            that.setState({
                poster: true,
            });
          return console.log("poster");
        case 2:
            that.setState({
                poster: true,
            });
          return console.log("poster");
        case 3:
            that.setState({
                poster: true,
            });
          return console.log("poster");
        case 4:
            that.setState({
                synopsis: true,
            });
          return console.log("synopsis");
        case 5:
            that.setState({
                synopsis: true,
            });
          return console.log("synopsis");
        case 6:
            that.setState({
                synopsis: true,
            });
          return console.log("synopsis");
        case 7:
            that.setState({
                titles: true,
            });
          return console.log("titles");
        case 8:
            that.setState({
                titles: true,
            });
          return console.log("titles");
        case 9:
            that.setState({
                titles: true,
            });
          return console.log("titles");
        case 10:
            that.setState({
                titles: true,
            });
          return console.log("titles");
        default:
          return console.log("Er is iets misgegaan");
      }

    } // bepaalDeQuiz

    render() {
        var {poster, synopsis, titles} = this.state;
        const that = this;

        return (
            <div>                
                { poster && <PosterQuizNiveau1 /> }
                { synopsis && <SynopsisQuizNiveau1 /> }
                { titles && <TitlesQuizNiveau1 /> }
            </div>
        );
    } // render
}

export default CombinatieQuizNiveau1;