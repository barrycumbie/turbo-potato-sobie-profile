const express = require('express')
require('dotenv').config()
const shajs = require('sha.js')
const app = express()
const port = process.env.PORT || 3000;  
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

// console.log(uri); 

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static(__dirname + '/public'))

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const mongoData = client.db("barrySobieProfile").collection("barrySobiePosts"); 

app.get('/', async function (req, res) {
  
  let results = await mongoData.find({}).toArray(); 

  console.log(results); 
  res.render('profile', 
    { profileData : results} ); 

})

app.post('/saveMyName', (req,res)=>{
  console.log('did we hit the post endpoint?'); 
  console.log(req.body); 
  // res.redirect('/ejs'); 
  res.render('words',
  {pageTitle: req.body.myName});

  // res.render('words',
  // {theData : req.body});


})

app.get('/saveMyNameGet', (req,res)=>{
  console.log('did we hit the get endpoint?'); 

  console.log('req.query: ', req.query); 

  // console.log('req.params: ', req.params);

  let reqName = req.query.myNameGet; 
  // res.redirect('/ejs'); 

  res.render('words',
  {pageTitle: reqName});

})


app.get('/ejs', function (req, res) {
  res.render('words',
    {pageTitle: 'my cool ejs page'}
  );
})


app.get('/nodemon', function (req, res) {
  res.send('look ma, no kill node process then restart node then refresh browser...cool?');

})

//endpoint, middleware(s)
app.get('/helloRender', function (req, res) {
  res.send('Hello Express from Real World<br><a href="/">back to home</a>')
})




app.listen(
  port, 
  ()=> console.log(
    `server is running on ... localhost:${port}`
    )
  );