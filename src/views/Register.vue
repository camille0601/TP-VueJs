<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register, login } from '../services/auth'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

function submit() {
  const res = register({ username: username.value, password: password.value })
  if (!res.ok) {
    error.value = res.message || 'Erreur'
    return
  }
  // auto-login after register
  login({ username: username.value, password: password.value })
  router.push('/')
}
</script>

<template>
  <div class="auth-page">
    <h2>Inscription</h2>
    <div v-if="error" class="error">{{ error }}</div>
    <form @submit.prevent="submit">
      <label>Nom d'utilisateur
        <input v-model="username" />
      </label>
      <label>Mot de passe
        <input v-model="password" type="password" />
      </label>
      <button type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<style scoped>
.auth-page { max-width: 520px; margin: 2rem auto; }
.error { color: #ff6b6b; margin-bottom: 0.5rem }
label { display: block; margin: 0.6rem 0 }
input { width: 100%; padding: 0.5rem }
button { margin-top: 0.8rem }
</style>
