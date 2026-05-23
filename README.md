# Mini CRM

Sistema de CRM em desenvolvimento. Construído com Next.js 14, PostgreSQL e Docker.

## Pré-requisitos

Certifique-se de ter instalado:

- [Node.js 18+](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- npm 9+

## Configuração inicial

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd mini-crm
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie os arquivos de exemplo e preencha com seus valores:

```bash
# Variáveis do Docker (banco de dados)
cp .env.example .env

# Variáveis do Next.js
cp apps/web/.env.example apps/web/.env.local

# Variáveis das migrations
cp libs/database/.env.example libs/database/.env
```

> **Atenção:** Nunca comite os arquivos `.env`, `.env.local` ou qualquer arquivo com credenciais reais.

### 4. Suba o banco de dados

```bash
npm run db:up
```

Aguarde o container subir e verifique:

```bash
docker ps
# Deve aparecer: mini-crm-db   running
```

### 5. Execute as migrations

```bash
npm run db:migrate
```

### 6. (Opcional) Crie o usuário de seed para testes

```bash
npm run db:seed
```

Isso cria o usuário:
- **Email:** `admin@minicrm.com`
- **Senha:** `senha12345`

> **Atenção:** Não execute o seed em produção.

### 7. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## Scripts disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor Next.js em desenvolvimento |
| `npm run db:up` | Sobe o container do PostgreSQL |
| `npm run db:down` | Para o container do PostgreSQL |
| `npm run db:logs` | Exibe os logs do banco em tempo real |
| `npm run db:migrate` | Executa todas as migrations pendentes |
| `npm run db:seed` | Cria dados iniciais para desenvolvimento |

---

## Estrutura do projeto

```
mini-crm/
├── apps/
│   └── web/                  ← Aplicação Next.js 14
├── libs/
│   ├── auth/                 ← Lógica de autenticação isolada
│   ├── database/             ← Migrations SQL e seed
│   └── shared-types/         ← DTOs e enums compartilhados
└── docker/
└── docker-compose.yml    ← PostgreSQL local
```

---

## Variáveis de ambiente

### `.env` (raiz — Docker)

| Variável | Descrição | Exemplo |
|---|---|---|
| `POSTGRES_USER` | Usuário do banco | `crm_user` |
| `POSTGRES_PASSWORD` | Senha do banco | `crm_password` |
| `POSTGRES_DB` | Nome do banco | `mini_crm` |

### `apps/web/.env.local` (Next.js)

| Variável | Descrição | Exemplo |
|---|---|---|
| `DATABASE_URL` | String de conexão do Postgres | `postgresql://crm_user:crm_password@localhost:5432/mini_crm` |
| `COOKIE_SECRET` | Segredo para assinar cookies de sessão | Gere com `openssl rand -base64 64` |
| `NODE_ENV` | Ambiente da aplicação | `development` |

---

## Problemas comuns

**Porta 5432 já em uso**
> Outro processo está usando a porta do Postgres. Pare o serviço conflitante ou altere a porta no `docker-compose.yml`.

**Erro de conexão com o banco ao rodar migrations**
> Verifique se o container está rodando com `docker ps` e se o `DATABASE_URL` no `libs/database/.env` está correto.

**Trigger já existe ao rodar migrations**
> O banco já tinha sido inicializado antes. Pare e remova o volume para resetar:
> ```bash
> npm run db:down
> docker volume rm mini-crm_postgres_data
> npm run db:up
> npm run db:migrate
> ```