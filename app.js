const firebase = require('firebase');
const ejsMate = require('ejs-mate');
const express = require('express');
const path = require('path');
const app = express();
// import "firebase/auth";
// import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
    apiKey: "AIzaSyA44jtfdtQshEV3e4pgE-tnBfwTDpPdbns",
    authDomain: "tarp-e1d36.firebaseapp.com",
    projectId: "tarp-e1d36",
    storageBucket: "tarp-e1d36.appspot.com",
    messagingSenderId: "26146724415",
    appId: "1:26146724415:web:3d94b6b82fdcc07ebcf68a",
    measurementId: "G-SN7EKE66WD"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, '/views'));
app.engine('ejs',ejsMate);
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    var user = firebase.auth().currentUser;
    res.locals.currentUser = user;
    next();
})

app.get('/', (req, res) => {
    res.render('home');
})


app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async(req, res) => {
    try {

        const {email, username, password} = req.body;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
        });
        res.redirect('/');
    } catch(e) {
        res.redirect('register');
    }
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.post('/login',  async(req, res) => {
    const {email, password} = req.body;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        var user = userCredential.user;
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
  });
    res.redirect('/');
})

app.get('/logout', function(req , res){
    firebase.auth().signOut().then(() => {
        res.redirect('/login');
      }).catch((error) => {
        // An error happened.
      });
 });

app.get('/livestream', (req, res) => {
    res.render('livestream');
})

app.get('/alerts', (req, res) => {
    res.render('alerts');
})

app.listen(3000, () => {
    console.log("connected on port 3000");
})
