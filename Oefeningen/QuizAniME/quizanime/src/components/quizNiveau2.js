import React from 'react';
import Firebase from './firebaseInit';
import ls from 'local-storage';

class QuizNiveau2 extends React.Component {
    render() {
        console.log("Aantal punten: " + localStorage.getItem('Punten'));
        return(
            <h1>Welcome to niveau 2</h1>
        );
    }
}

export default QuizNiveau2;