const pool = require('./database');

class Cliente {
  constructor(id, nome, fone,) {
    this.id = id;
    this.nome = nome;
    this.fone = fone;
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM clientes');
    return rows.map((row) => new Cliente(row.id, row.nome, row.fone));
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new Cliente(row.id, row.nome, row.fone);
  }

  async save() {
    if (this.id) {
      await pool.query('UPDATE clientes SET nome = $1, fone = $2 WHERE id = $3', [this.nome, this.fone, this.id]);
    } else {
      const { rows } = await pool.query('INSERT INTO clientes (nome, fone) VALUES ($1, $2) RETURNING id', [this.nome, this.fone]);
      this.id = rows[0].id;
    }
  }

  async delete() {
    await pool.query('DELETE FROM clientes WHERE id = $1', [this.id]);
  }
}

module.exports = Cliente;
