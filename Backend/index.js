const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

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
      const doc = {
        name: "Special One",
        content: "specialone@gmail.com",
      }
      const result = await usersCollection.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running my server')
});
app.listen(port, () =>{
    console.log('Running server on port', port);
})