const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://shreyanshsri1807:hSNL9hOyHsbH8Sdg@testdb.v9pbz.mongodb.net/?retryWrites=true&w=majority&appName=TestDB";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB Atlas");
    } catch (err) {
        console.log("Error connecting to MongoDB:", err);
    } finally {
        await client.close();
    }
}

run();
