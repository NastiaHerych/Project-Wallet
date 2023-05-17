const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

var cors = require("cors");
app.use(cors());

const { MongoClient, ServerApiVersion } = require("mongodb");


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

connectToDatabase();
let myDB = client.db("testDB");

//users
app.post("/post/user", async (req, res) => {
  try {
    const myColl = myDB.collection("users");
    const { name, email, password } = req.body;
    const user = { name: name, email: email, password: password };
    const result = await myColl.insertOne(user);
    res.status(200).json({
      success: true,
      message: "POST request successful. User ID: " + result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.get("/get/user", async (req, res) => {
  try {
    const { email } = req.query;
    const myColl = myDB.collection("users");
    const findResult = await myColl.findOne({ email: email });
    res
      .status(200)
      .json({ success: true, message: "GET request successful", findResult });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

//transactions
app.post("/post/transaction", async (req, res) => {
  try {
    const myColl = myDB.collection("transactions");
    const { userId, value, category, type, date, bank, description } = req.body;
    const transaction = {
      userId: userId,
      value: value,
      category: category,
      type: type,
      date: date,
      bank: bank,
      description: description,
    };
    const result = await myColl.insertOne(transaction);
    res.status(200).json({
      success: true,
      message: "POST request successful. User ID: " + result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
