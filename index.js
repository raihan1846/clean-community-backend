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
        const allContributionCollection = userDb.collection('allContribution');


        //   add user
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log('hitting the users post api..!!!', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })

        //  all issue 
        // app.get('/all-issues', async (req, res) => {
        //     const cursor = allIssuesCollection.find();
        //     const result = await cursor.toArray();
        //     res.send(result);
        // })
        app.get('/all-issues', async (req, res) => {
            const email = req.query.email; 
            let query = {};
            if (email) {
                query = { email: email };
            }
            const result = await allIssuesCollection.find(query).toArray();
            res.send(result);
        });
        

        // add issue 
        app.post('/all-issues', async (req, res) => {
            const allIssues = req.body;
            console.log('hitting the users post api..!!!', allIssues);
            const result = await allIssuesCollection.insertOne(allIssues);
            res.send(result);
        })

        // latest issue 
        app.get('/latest-issues', async (req,res)=>{
            const cursor = allIssuesCollection.find().sort({created_at: -1}).limit(6);
            const result = await cursor.toArray();
            res.send(result);
          })

        // find 1 issue 

        app.get('/all-issues/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await allIssuesCollection.findOne(query);
            res.send(result);
        });

        // update issue 
        app.patch('/all-issues/:id', async (req, res) => {
            const id = req.params.id;
            const updatedIssue = req.body;
            const query = { _id: new ObjectId(id) };
            const update = {
                $set: updatedIssue
            };
            const result = await allIssuesCollection.updateOne(query, update);
            res.send(result);
        });


        // Delete issue 
        app.delete('/all-issues/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await allIssuesCollection.deleteOne(query);
            res.send(result);
        })


        // contribution part start 
        //  all contribution 
        app.get('/all-contribution', async (req, res) => {
            const cursor = allContributionCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // add contribution 
        app.post('/all-contribution', async (req, res) => {
            const allContribution = req.body;
            console.log('hitting the users post api..!!!', allContribution);
            const result = await allContributionCollection.insertOne(allContribution);
            res.send(result);
        })
        // find 1 contribution 

        app.get('/all-contribution/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await allContributionCollection.findOne(query);
            res.send(result);
        });

        // update contribution 
        app.patch('/all-contribution/:id', async (req, res) => {
            const id = req.params.id;
            const updatedControbution = req.body;
            const query = { _id: new ObjectId(id) };
            const update = {
                $set: updatedControbution
            };
            const result = await allContributionCollection.updateOne(query, update);
            res.send(result);
        });


        // Delete contribution 
        app.delete('/all-contribution/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await allContributionCollection.deleteOne(query);
            res.send(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");



    } finally {

    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log("Server is running", port);
})

