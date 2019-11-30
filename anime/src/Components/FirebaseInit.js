import * as firebase from 'firebase'
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyDM4quuYZVvTWIVhbm4Fft4qS2vzcRjV0s',
    projectId: 'anime-ad027',
    databaseURL: "https://anime-ad027.firebaseio.com/",
    messagingSenderId: "940709182218"
  };

  export default !firebase.apps.length 
  ? firebase.initializeApp(config).firestore()
  : firebase.app().firestore();