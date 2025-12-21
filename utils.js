export function createPageUrl(pageName) {
  const normalized = pageName?.toLowerCase()

  const routeMap = {
    strategicintelligence: '/tsi',
    chat: '/chat',
  }

  return routeMap[normalized] || '/'
}
