import React from 'react';
import Footer from './Footer';
require('./styles/QuizResults.css')

class ResultaatQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            punten: null,
            allesOke: false,
            nietOke: false,
            boodschap: null,
        }
    } // constructor

    componentWillMount() {
        const that = this;
        var lokaalPunten = 0

        if (localStorage.getItem('Punten')) {
            lokaalPunten = localStorage.getItem('Punten');
            lokaalPunten = parseInt(lokaalPunten);

            that.setState({
                punten: lokaalPunten,
                allesOke: true,
            });

        } else {
            that.setState({
                nietOke: true,
            });
        }
    } // componentWillMount

    componentDidMount() {
        var {punten} = this.state;
        const that = this;
        var aangepasteTekst = null;
        
        switch(punten) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                aangepasteTekst = "Sorry, you only scored " + punten + "/15. Keep on practicing!";
                that.setState({
                    boodschap: aangepasteTekst,
                });
                return;
            case 7:
            case 8:
            case 9:
                aangepasteTekst = "Great, you scored " + punten + "/15. Good result!";
                that.setState({
                    boodschap: aangepasteTekst,
                });
                return;
            case 10:
            case 11:
            case 12:
            case 13:
                aangepasteTekst = "Congrats, you scored " + punten + "/15. Great result!";
                that.setState({
                    boodschap: aangepasteTekst,
                });
                return;
            case 14:
            case 15:
                aangepasteTekst = "Wow, you scored " + punten + "/15. You're an anime expert!";
                that.setState({
                    boodschap: aangepasteTekst,
                });
                return;
            default:
                aangepasteTekst = "Something went wrong";
                that.setState({
                    boodschap: aangepasteTekst,
                });
                return;
          }
    } // componentDidMount

    render(){
        var {allesOke, nietOke, boodschap} = this.state;

        return (
            <div className="QuizResults">
                <h1 className="QuizResultsh1">Quiz results</h1>
                { allesOke && <p className="QuizResultp"> { boodschap } </p> }
                { nietOke && <p className="QuizResultp"> Something went wrong regarding the obtained points </p> }
                <Footer />
            </div>
        );
    } // render
}

export default ResultaatQuiz;