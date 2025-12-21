import { createClient } from '@base44/sdk'

const env = typeof import.meta !== 'undefined' ? import.meta.env : {}

const sanitize = (value) => (typeof value === 'string' ? value.trim() : value)

const appId = sanitize(env?.VITE_BASE44_APP_ID)
const apiUrl = sanitize(env?.VITE_BASE44_API_URL)
const databaseUrl = sanitize(env?.VITE_BASE44_DATABASE_URL)

const missingEnv = []
if (!appId) missingEnv.push('VITE_BASE44_APP_ID')

const createRejectProxy = (scope, reason) => new Proxy(
  {},
  {
    get: (_target, prop) => async (...args) => {
      console.warn(`[Base44 stub] ${scope}.${String(prop)} called while client offline`, { args })
      throw new Error(reason)
    }
  }
)

let base44Status = {
  ready: false,
  errorMessage: missingEnv.length
    ? `Configuração ausente: defina ${missingEnv.join(', ')} no arquivo .env.`
    : null,
  missingEnv
}

let base44

if (missingEnv.length === 0) {
  try {
    const clientOptions = {
      appId,
      requiresAuth: true,
      ...(apiUrl ? { apiUrl } : {}),
      ...(databaseUrl ? { databaseUrl } : {})
    }

    base44 = createClient(clientOptions)
    base44Status = { ready: true, errorMessage: null, missingEnv }
  } catch (error) {
    const reason = error?.message || 'Base44 SDK falhou ao inicializar o database.'
    base44Status = { ready: false, errorMessage: reason, missingEnv }
    console.error('Base44 client initialization failed:', error)
  }
}

if (!base44) {
  const reason =
    base44Status.errorMessage || 'Base44 SDK indisponível: verifique configuração e conectividade.'

  base44 = {
    auth: createRejectProxy('auth', reason),
    functions: createRejectProxy('functions', reason),
    entities: createRejectProxy('entities', reason),
    integrations: createRejectProxy('integrations', reason)
  }
}

export { base44, base44Status }
