const express = require("express");
const axios = require("axios");
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

app.get("/get/transactions", async (req, res) => {
  try {
    const { userId } = req.query;
    const transactionsColl = myDB.collection("transactions");
    const findResult = await transactionsColl
      .find({ userId: userId })
      .toArray();
    res
      .status(200)
      .json({ success: true, message: "GET request successful", findResult });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

var ObjectID = require("mongodb").ObjectId;

app.delete("/delete/transactions/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const transactionsColl = myDB.collection("transactions");
    const deleteResult = await transactionsColl.deleteOne({
      _id: new ObjectID(id),
    });

    if (deleteResult.deletedCount === 1) {
      res
        .status(200)
        .json({ success: true, message: "Transaction deleted successfully" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.put("/update/transaction/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, value, category, type, date, bank, description } = req.body;

    const transactionsColl = myDB.collection("transactions");
    const updateResult = await transactionsColl.updateOne(
      { _id: new ObjectID(id) },
      {
        $set: {
          userId: userId,
          value: value,
          category: category,
          type: type,
          date: date,
          bank: bank,
          description: description,
        },
      }
    );

    if (updateResult.modifiedCount === 1) {
      res
        .status(200)
        .json({ success: true, message: "Transaction updated successfully" });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

//balances
app.post("/post/balance", async (req, res) => {
  try {
    const myColl = myDB.collection("balances");
    const { userId, balances } = req.body;
    const balanceObject = {
      userId: userId,
      balances: balances,
    };
    const result = await myColl.insertOne(balanceObject);
    res.status(200).json({
      success: true,
      message: "POST request successful. User ID: " + result.insertedId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.get("/get/balances", async (req, res) => {
  try {
    const { userId } = req.query;
    const balancesColl = myDB.collection("balances");
    const findResult = await balancesColl.find({ userId: userId }).toArray();
    res
      .status(200)
      .json({ success: true, message: "GET request successful", findResult });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.get("/get/currencies", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.privatbank.ua/p24api/exchange_rates?date=20.05.2023"
    );

    res.status(200).json({
      success: true,
      message: "GET request successful",
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.put("/update/balance/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { balances } = req.body;
    const balancesColl = myDB.collection("balances");
    const updateResult = await balancesColl.updateOne(
      { _id: new ObjectID(id) },
      {
        $set: {
          balances: balances,
        },
      }
    );

    if (updateResult.modifiedCount === 1) {
      res
        .status(200)
        .json({ success: true, message: "Balance updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "Balance not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
