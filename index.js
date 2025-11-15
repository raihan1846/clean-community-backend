const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// middleware

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://helloraihanwlc_db_user:73D25G0Af0i9t7B1@cleancommunity.elxtjut.mongodb.net/?appName=CleanCommunity";

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
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
     const userDb = client.db('usersDB');
     const userCollection = userDb.collection('users');
     const allIssuesCollection = userDb.collection('allIssues');

     
    //   add user
    app.post('/users', async (req, res)=>{
        const newUser = req.body;
        console.log('hitting the users post api..!!!', newUser);
        const result = await userCollection.insertOne(newUser);
        res.send(result);
    })
    // add issue 
    app.post('/all-issues', async (req, res)=>{
        const allIssues = req.body;
        console.log('hitting the users post api..!!!', allIssues);
        const result = await allIssuesCollection.insertOne(allIssues);
        res.send(result);
    })
    

    // Delete issue 
    app.delete('/all-issues/:id', async (req, res)=>{
        const id = req.params.id;
        const query = {_id : new ObjectId(id)};
        const result = await allIssuesCollection.deleteOne(query);
        res.send(result);
    })


      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
     


    } finally {
    
    }
  }
  run().catch(console.dir);


  app.listen(port, ()=>{
    console.log("Server is running", port);
  })

  