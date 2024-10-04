
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pgsiu4c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// let userCollection; // Define a variable to store the user collection
// let meetingCollection; // Define a variable to store the meeting collection
let db;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const connectDB = async()=> {
    if(db) return db;
    try{
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });

        await client.connect();
        db = client.db('meetUp');
        console.log('connected to DB');
        return db;
    }catch(err){
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
}

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         const database = client.db("meetUp")
//         userCollection = database.collection("users")
//         meetingCollection = database.collection("meetings")
        

//     } catch (e) {
//         console.error(e);
//     }
// }
// run().catch(console.dir);

// module.exports = {
//     getUserCollection: () => userCollection, // Export a function that returns the user collection
//     getMeetingCollection: () => meetingCollection // Export a function that returns the meeting collection
// };

module.exports = connectDB;