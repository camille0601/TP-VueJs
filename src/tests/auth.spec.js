import { beforeEach, describe, it, expect } from 'vitest'
import { register, login, logout, isAuthenticated } from '../services/auth'

beforeEach(() => {
  localStorage.clear()
})

describe('auth service', () => {
  it('registers a new user and prevents duplicates', () => {
    const r1 = register({ username: 'bob', password: 'pwd' })
    expect(r1.ok).toBe(true)
    const r2 = register({ username: 'bob', password: 'pwd' })
    expect(r2.ok).toBe(false)
  })

  it('logs in and out correctly', () => {
    register({ username: 'anna', password: '123' })
    const res = login({ username: 'anna', password: '123' })
    expect(res.ok).toBe(true)
    expect(isAuthenticated()).toBe(true)
    logout()
    expect(isAuthenticated()).toBe(false)
  })
})
