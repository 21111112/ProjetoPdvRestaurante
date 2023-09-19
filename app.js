const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Cliente = require('./cliente');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/clientes', async (req, res) => {
  const clientes = await Cliente.findAll();
  res.json(clientes);
});

app.get('/clientes/:id', async (req, res) => {
  const cliente = await Cliente.findById(req.params.id);
  if (!cliente) {
    res.status(404).send('Cliente não encontrado');
  } else {
    res.json(cliente);
  }
});

app.post('/clientes', async (req, res) => {
  const { nome, fone,} = req.body;
  const clientes = new Cliente(null, nome, fone,);
  await clientes.save();
  res.status(201).json(clientes);
});

app.put('/clientes/:id', async (req, res) => {
  const cliente = await Cliente.findById(req.params.id);
  if (!cliente) {
    res.status(404).send('Cliente não encontrado');
  } else {
    const { nome, fone,} = req.body;
    cliente.nome = nome;
    cliente.fone = fone;
    await cliente.save();
    res.json(cliente);
  }
});

app.delete('/clientes/:id', async (req, res) => {
  const cliente = await Cliente.findById(req.params.id);
  if (!cliente) {
    res.status(404).send('Cliente não encontrado');
  } else {
    await cliente.delete();
    res.status(204).send('Cliente removido com sucesso');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
