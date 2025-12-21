import { useCallback, useEffect, useState } from 'react'

let memoryToasts = []
const listeners = new Set()

const notify = () => {
  listeners.forEach((listener) => listener(memoryToasts))
}

const generateId = () => Math.random().toString(36).slice(2, 9)

export function toast({ title, description, action, duration = 5000 }) {
  const id = generateId()
  const createdAt = Date.now()
  memoryToasts = [...memoryToasts, { id, title, description, action, createdAt }]
  notify()

  if (duration) {
    setTimeout(() => dismiss(id), duration)
  }

  return id
}

export function dismiss(toastId) {
  memoryToasts = memoryToasts.filter((toast) => toast.id !== toastId)
  notify()
}

export function useToast() {
  const [toasts, setToasts] = useState(memoryToasts)

  useEffect(() => {
    listeners.add(setToasts)
    return () => listeners.delete(setToasts)
  }, [])

  const addToast = useCallback((options) => toast(options), [])
  const removeToast = useCallback((id) => dismiss(id), [])

  return {
    toasts,
    toast: addToast,
    dismiss: removeToast,
  }
}
