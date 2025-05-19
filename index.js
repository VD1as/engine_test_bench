const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/data', (req, res) => {
  console.log("📥 Dados recebidos:");
  console.log(req.body); 
  res.status(200).json({ message: "Dados recebidos com sucesso!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
