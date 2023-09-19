const pool = require('./database');

class Estoque {
  constructor(id, nome, val) {
    this.id = id;
    this.nome = nome;
    this.val = val;
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM estoque');
    return rows.map((row) => new Estoque(row.id, row.nome, row.val));
  }

  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM estoque WHERE id = $1', [id]);
    if (rows.length === 0) {
      return null;
    }
    const row = rows[0];
    return new Estoque(row.id, row.nome, row.val);
  }

  async save() {
    if (this.id) {
      await pool.query('UPDATE estoque SET nome = $1, val = $2 WHERE id = $3', [this.nome, this.val, this.id]);
    } else {
      const { rows } = await pool.query('INSERT INTO estoque (nome, val) VALUES ($1, $2) RETURNING id', [this.nome, this.val]);
      this.id = rows[0].id;
    }
  }

  async delete() {
    await pool.query('DELETE FROM estoque WHERE id = $1', [this.id]);
  }
}

module.exports = Estoque;