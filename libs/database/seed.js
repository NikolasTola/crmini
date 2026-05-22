// TODO: Remover esse script antes de ir para produção ou proteger com variável de ambiente
require("dotenv").config();
const { Client } = require("pg");
const bcrypt = require("bcryptjs");

async function run() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const email = "admin@minicrm.com";
  const password = "senha12345";
  const hash = await bcrypt.hash(password, 12);

  await client.query(
    `INSERT INTO users (email, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (email) DO NOTHING`,
    [email, hash]
  );

  console.log(`✅ Usuário seed criado: ${email} / ${password}`);
  await client.end();
}

run().catch((err) => {
  console.error("❌ Erro no seed:", err.message);
  process.exit(1);
});