import React from 'react';
require('./styles/Quiz.css');

const Quiz = () => {
    localStorage.removeItem("Punten");
    localStorage.removeItem("Index");

    return (
        <div className="Quiz">
            <h1 className="Quizh1">Welcome on the Quiz</h1>
            <h2 className="Quizh2">Choose your quiz:</h2>
            <div className="Div-QuizButtons">
                <button className="Combi-btn"><a href="/CombinQuiz_1">Combination Quiz</a></button>
                <button className="Poster-btn"><a href="/PosterQuiz_1">Poster Quiz</a></button>
                <button className="Synops-btn"><a href="/SynopsQuiz_1">Synopsis Quiz</a></button>
                <button className="Titles-btn"><a href="/TitlesQuiz_1">Titles Quiz</a></button>
            </div>
        </div>
    );
}

export default Quiz;