import { ref } from 'vue'

const currentUser = ref(JSON.parse(localStorage.getItem('auth_user') || 'null'))

function saveUsers(users) {
  localStorage.setItem('auth_users', JSON.stringify(users))
}

function loadUsers() {
  return JSON.parse(localStorage.getItem('auth_users') || '{}')
}

export function register({ username, password }) {
  const users = loadUsers()
  if (users[username]) {
    return { ok: false, message: 'Utilisateur déjà existant' }
  }
  users[username] = { username, password }
  saveUsers(users)
  return { ok: true }
}

export function login({ username, password }) {
  const users = loadUsers()
  const u = users[username]
  if (!u || u.password !== password) return { ok: false, message: 'Identifiants invalides' }
  currentUser.value = { username }
  localStorage.setItem('auth_user', JSON.stringify(currentUser.value))
  return { ok: true }
}

export function logout() {
  currentUser.value = null
  localStorage.removeItem('auth_user')
}

export function isAuthenticated() {
  return !!currentUser.value
}

export function getUser() {
  return currentUser
}

export default {
  register,
  login,
  logout,
  isAuthenticated,
  getUser,
}
