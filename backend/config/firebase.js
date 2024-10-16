// firebase.js
const serviceAccount = require('./serviceAccountKey.json'); 
const admin = require('firebase-admin');
 // Update path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://sleekstyle-98723.appspot.com', // Update your bucket name
});

const bucket = admin.storage().bucket();

module.exports =  bucket ;
