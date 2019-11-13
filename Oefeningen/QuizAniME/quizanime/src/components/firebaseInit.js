import * as firebase from 'firebase'
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyDR3gsb66KH_Pi9jEJcs_7UUiaf-GOayFs',
    projectId: 'quizanime-d9d75',
    databaseURL: "https://quizanime-d9d75.firebaseio.com/",
    messagingSenderId: "728864804887"
  };

  export default !firebase.apps.length 
  ? firebase.initializeApp(config).firestore()
  : firebase.app().firestore();