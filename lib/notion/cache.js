const store = new Map()

export const cacheSet = (key, value, ttlMs) => {
  store.set(key, { value, expiresAt: Date.now() + ttlMs })
}

export const cacheGet = (key) => {
  const entry = store.get(key)
  if (!entry) return undefined

  if (Date.now() > entry.expiresAt) {
    store.delete(key)
    return undefined
  }

  return entry.value
}
