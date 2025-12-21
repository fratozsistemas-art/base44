import { createClient } from '@base44/sdk'

const createRejectProxy = (scope, reason) => new Proxy({}, {
  get: (_target, prop) => async (...args) => {
    console.warn(`[Base44 stub] ${scope}.${String(prop)} called while client offline`, { args })
    throw new Error(reason)
  }
})

let base44Status = {
  ready: false,
  errorMessage: null
}

let base44

try {
  base44 = createClient({
    appId: "68f4a0b77dcf6281433ddc4b",
    requiresAuth: true
  })
  base44Status = { ready: true, errorMessage: null }
} catch (error) {
  const reason = error?.message || 'Base44 SDK falhou ao inicializar o database.'
  base44Status = { ready: false, errorMessage: reason }
  console.error('Base44 client initialization failed:', error)

  base44 = {
    auth: createRejectProxy('auth', reason),
    functions: createRejectProxy('functions', reason),
    entities: createRejectProxy('entities', reason),
    integrations: createRejectProxy('integrations', reason)
  }
}

export { base44, base44Status }
