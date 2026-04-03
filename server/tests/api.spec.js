const request = require('supertest')
const app = require('../index')

describe('API endpoints', () => {
  it('GET / returns API running', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
  })

  it('GET /api/reviews returns an array', async () => {
    const res = await request(app).get('/api/reviews')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })
})
