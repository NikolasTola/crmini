require("dotenv").config();
const path = require("path");
const fs = require("fs");
const { Client } = require("pg");

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("❌ DATABASE_URL não definida no .env");
  process.exit(1);
}

async function run() {
  const client = new Client({ connectionString: DATABASE_URL });

  try {
    await client.connect();
    console.log("✅ Conectado ao banco de dados");

    const migrationsDir = path.join(__dirname, "src", "migrations");
    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();

    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
      console.log(`⏳ Executando: ${file}`);
      await client.query(sql);
      console.log(`✅ Aplicado: ${file}`);
    }

    console.log("🎉 Migrations concluídas!");
  } catch (err) {
    console.error("❌ Erro:", err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();