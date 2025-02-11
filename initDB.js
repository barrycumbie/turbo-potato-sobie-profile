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

function initSobiePosts(){

  mongoData.insertOne(
    {
      title: "built a crud app", 
      post: "full stack etc. whatever",
      link: "forthcoming to my app!" 
    }
  )

}




app.listen(
  port,()=> console.log(`server is running on ... localhost:${port}`
    )
  );