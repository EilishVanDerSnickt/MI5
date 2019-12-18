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

    return (
        <div className="QuizResults">
            <h1>Welcome on the Quiz Results page</h1>
            { bool && <p> Je hebt { punten } punten gehaald </p> }
            { misgelopen && <p> Er is iets misgelopen met de punten </p> }
            <a href="/"><button>Ga verder</button></a>
        </div>
    );
}

export default ResultaatQuiz;