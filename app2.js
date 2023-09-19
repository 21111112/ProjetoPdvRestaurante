const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Estoque = require('./estoque');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/estoque', async (req, res) => {
  const estoque = await Estoque.findAll();
  res.json(estoque);
});

app.get('/estoque/:id', async (req, res) => {
  const estoque = await Estoque.findById(req.params.id);
  if (!estoque) {
    res.status(404).send('Produto não encontrado no estoque');
  } else {
    res.json(estoque);
  }
});

app.post('/estoque', async (req, res) => {
    const { nome, val } = req.body;
    const estoque = new Estoque(null, nome, new Date(val).toISOString().split('T')[0]);
    await estoque.save();
    res.json(estoque);
    
});

app.put('/estoque/:id', async (req, res) => {
    const estoque = await Estoque.findById(req.params.id);
    if (!estoque) {
      res.status(404).send('Produto não encontrado no estoque');
    } else {
      const { nome, val } = req.body;
      estoque.nome = nome;
      estoque.val = new Date(val).toISOString().split('T')[0];
      await estoque.save();
      res.json(estoque); //200 fica implícito
    }
  });
  

app.delete('/estoque/:id', async (req, res) => {
  const estoque = await Estoque.findById(req.params.id);
  if (!estoque) {
    res.status(404).send('Produto não encontrado no estoque');
  } else {
    await estoque.delete();
    res.status(204).send('Produto removido com sucesso');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
