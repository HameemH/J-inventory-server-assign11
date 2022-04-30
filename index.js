const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://laptopInven1:ChOk4HIBc4weiEnK@cluster0.sroqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
   try{
    await client.connect();
    const collection = client.db("Inventory").collection("laptops");
    
    app.get('/item', async (req, res) => {
        const query = {};
        const cursor = collection.find(query);
        const items = await cursor.toArray();
      
        res.send(items);
    });

    app.post('/item', async(req, res) =>{
        const item = req.body;
        const result = await collection.insertOne(item);
        res.send(result)
    });

    app.get('/item/:id', async(req,res) =>{
        const id = req.params.id;
        const query ={_id: ObjectId(id)};
        const result = await collection.findOne(query);
        res.send(result)
    })
    app.delete('/item/:id', async(req, res) =>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await collection.deleteOne(query);
        res.send(result);
    })


   }

    finally {

    }

}

run().catch(console.dir);
 

app.get('/', (req, res) =>{
    res.send('Running My Node  Server');
});

app.listen(port, () =>{
    console.log('Server is running', port);
})