const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// middleware

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://raihan:raihan@cluster0.7ziiyhp.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  
app.get('/', (req, res) => {
    res.send('Clean Community is Running..!!!')
  })

  app.listen(port, ()=>{
    console.log("Server is running", port);
  })