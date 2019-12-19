import React from 'react';

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
                aangepasteTekst = "Jammer, je hebt " + punten + "/15 gehaald. Blijf oefenen!";
                that.setState({
                    boodschap: aangepasteTekst,
                });
                return;
            case 7:
            case 8:
            case 9:
                aangepasteTekst = "Super, je hebt " + punten + "/15 gehaald. Goed resultaat!";
                that.setState({
                    boodschap: aangepasteTekst,
                });
                return;
            case 10:
            case 11:
            case 12:
            case 13:
                aangepasteTekst = "Proficiat, je hebt " + punten + "/15 gehaald. Geweldig resultaat!";
                that.setState({
                    boodschap: aangepasteTekst,
                });
                return;
            case 14:
            case 15:
                aangepasteTekst = "Wow, je hebt " + punten + "/15 gehaald. Je bent een expert in de trending anime!";
                that.setState({
                    boodschap: aangepasteTekst,
                });
                return;
            default:
                aangepasteTekst = "Er is iets misgegaan";
                that.setState({
                    boodschap: aangepasteTekst,
                });
                return;
          }
    } // componentDidMount

    render(){
        var {allesOke, nietOke, boodschap} = this.state;
        const that = this;

        return (
            <div className="QuizResults">
                <h1>Welcome on the Quiz Results page</h1>
                { allesOke && <p> { boodschap } </p> }
                { nietOke && <p> Er is iets misgelopen met de punten </p> }
                <a href="/"><button>Ga verder</button></a>
            </div>
        );
    } // render
}

export default ResultaatQuiz;