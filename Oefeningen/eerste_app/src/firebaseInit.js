import * as firebase from 'firebase'
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyBQmDSKrot-kkHU9YtFrI1PMCr3YY0156Y',
    authDomain: 'https://animereactapp.firebaseapp.com/',
    projectId: 'animereactapp',
    databaseURL: "https://animereactapp.firebaseio.com/",
    storageBucket: "gs://animereactapp.appspot.com",
    messagingSenderId: "863356677005"
  };

  export default !firebase.apps.length 
  ? firebase.initializeApp(config).firestore()
  : firebase.app().firestore();

  