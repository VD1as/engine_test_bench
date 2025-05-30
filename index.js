const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 3000;

const uri = "mongodb+srv://vdiasnoite:Vdcp15243%402530@cluster0.rw5dk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

let collection;

async function startServer() {
  try {
    await client.connect();
    const db = client.db("engine_workbench");
    collection = db.collection("dados");
    console.log("Conectado ao MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(`Servidor https://engine-bench.onrender.com`);
    });

  } catch (err) {
    console.error("Erro ao conectar no MongoDB:", err);
  }
}

app.post('/data', async (req, res) => {
  try {
    if (!collection) {
      return res.status(500).json({ error: "Banco de dados não está pronto ainda." });
    }

    const data = req.body;
    const result = await collection.insertOne(data);

    console.log("Dados salvos no MongoDB:", data);
    res.status(200).json({ message: "Dados salvos com sucesso", id: result.insertedId });
  } catch (err) {
    console.error("Erro ao salvar no MongoDB:", err);
    res.status(500).json({ error: "Erro ao salvar os dados" });
  }
});

startServer();
