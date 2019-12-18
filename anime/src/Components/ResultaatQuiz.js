import React from 'react';

const ResultaatQuiz = () => {
    var punten = 0
    var misgelopen = false;
    var bool = false;

    if (localStorage.getItem('Punten')) {
        punten = localStorage.getItem('Punten');
        bool = true;
    } else {
        misgelopen = true;
    }

    //maak aangepaste tekst voor de verschillende resultaten
    var aangepasteTekst = null;

    console.log(punten);
    switch(punten) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
            aangepasteTekst = "Jammer, je hebt " + punten + "/15 gehaald. Blijf oefenen!";
        case "7":
        case "8":
        case "9":
            aangepasteTekst = "Super, je hebt " + punten + "/15 gehaald. Goed resultaat!";
        case "10":
        case "11":
        case "12":
        case "13":
            aangepasteTekst = "Proficiat, je hebt " + punten + "/15 gehaald. Geweldig resultaat!";
        case "14":
        case "15":
            aangepasteTekst = "Wow, je hebt " + punten + "/15 gehaald. Je bent een expert in de trending anime!";
        default:
            aangepasteTekst = "Er is iets misgegaan";
      }

    return (
        <div className="QuizResults">
            <h1>Welcome on the Quiz Results page</h1>
            { bool && <p> { aangepasteTekst } </p> }
            { misgelopen && <p> Er is iets misgelopen met de punten </p> }
            <a href="/"><button>Ga verder</button></a>
        </div>
    );
}

export default ResultaatQuiz;