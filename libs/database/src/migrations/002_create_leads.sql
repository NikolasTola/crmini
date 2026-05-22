-- ============================================================
-- ENUM: lead_status
-- ============================================================
CREATE TYPE lead_status AS ENUM (
  'novo',
  'contato_feito',
  'qualificado',
  'proposta',
  'fechado',
  'perdido'
);

-- ============================================================
-- ENUM: lead_origem
-- ============================================================
CREATE TYPE lead_origem AS ENUM (
  'instagram',
  'indicacao',
  'site',
  'whatsapp',
  'outro'
);

-- ============================================================
-- TABELA: leads
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome       TEXT        NOT NULL,
  idade      INTEGER     NOT NULL CHECK (idade >= 0 AND idade <= 150),
  contato    TEXT        NOT NULL,
  origem     lead_origem NOT NULL,
  status     lead_status NOT NULL DEFAULT 'novo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_origem ON leads(origem);

DROP TRIGGER IF EXISTS trigger_leads_updated_at ON leads;

CREATE TRIGGER trigger_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();