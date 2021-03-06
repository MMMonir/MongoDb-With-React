const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
//Deleting ID
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;

//Middle Wire
app.use(cors());
app.use(express.json());

//user: mydbuser1
//pass: ae66FBZvXjjNKwsO

const uri = "mongodb+srv://mydbuser1:ae66FBZvXjjNKwsO@cluster0.e97ot.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
      await client.connect();
      const database = client.db("foodMaster");
      const usersCollection = database.collection("users");
      // create a document to insert
      // const doc = {
      //   name: "Special One",
      //   content: "specialone@gmail.com",
      // }
      // const result = await usersCollection.insertOne(doc);
      // console.log(`A document was inserted with the _id: ${result.insertedId}`);

      //GET API
      app.get('/users', async(req, res) => {
        const  cursor = usersCollection.find({});
        const users = await cursor.toArray();
        res.send(users)
      });

      //POST API
      app.post('/users', async(req, res) => {
        const newUser = req.body;
        const result = await usersCollection.insertOne(newUser);
        console.log('Got new user', req.body);
        console.log('added user', result)
        res.json(result)
      });

      //Details API
      app.get('/users/:id', async(req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const user = await usersCollection.findOne(query);
        console.log('Load user with id: ', id);
        res.send(user);
      });

      //UPDATE API
      app.put('/users/:id', async(req, res) => {
        const id = req.params.id;
        const updatedUser = req.body;
        const filter = { _id: ObjectId(id) };
        const options = {upsert: true};
        const updateDoc = {
          $set: {
            name: updatedUser.name,
            email: updatedUser.email
          }
        };
        const result = await usersCollection.updateOne(filter, updateDoc, options)
        console.log('Updating user', req);
        res.json(result);
      });

      //DELETE API
      app.delete('/users/:id', async(req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await usersCollection.deleteOne(query);

        console.log('Deleting user with id', result);
        res.json(result);
      })

    }
    
    finally {
      // await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running my server')
});
app.listen(port, () =>{
    console.log('Running server on port', port);
})