import React from 'react';

const Quiz = () => {
    localStorage.removeItem("Punten");
    localStorage.removeItem("Index");

    return (
        <div className="Quiz">
            <h1>Welcome on the Quiz page</h1>
            <p>Kies je quiz</p>
            <button><a href="/CombinationQuiz_1">Combination Quiz</a></button>
            <button><a href="/PosterQuiz_1">Poster Quiz</a></button>
            <button><a href="/SynopsisQuiz_1">Synopsis Quiz</a></button>
            <button><a href="/TitlesQuiz_1">Titles Quiz</a></button>
        </div>
    );
}

export default Quiz;