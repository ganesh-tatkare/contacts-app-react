import firebase from 'firebase'
import keys from './firebaseConstant'

const firebaseConfig = {
    apiKey: keys.API_KEY,
    authDomain: keys.AUTH_DOMAIN,
    databaseURL: keys.DATABASE_URL,
    projectId: keys.PROJECT_ID,
    storageBucket: keys.STORAGE_BUCKET,
    messagingSenderId: keys.MESSAGING_SENDER_ID,
    appId: keys.APP_ID,
    measurementId: keys.MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

export default firebase;