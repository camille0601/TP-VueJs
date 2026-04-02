<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login } from '../services/auth'

const router = useRouter()
const route = useRoute()

const username = ref('')
const password = ref('')
const error = ref('')

async function submit() {
  const res = login({ username: username.value, password: password.value })
  if (!res.ok) {
    error.value = res.message || 'Erreur'
    return
  }
  const redirect = route.query.redirect || '/'
  router.push(redirect)
}
</script>

<template>
  <div class="auth-page">
    <h2>Connexion</h2>
    <div v-if="error" class="error">{{ error }}</div>
    <form @submit.prevent="submit">
      <label>Nom d'utilisateur
        <input v-model="username" />
      </label>
      <label>Mot de passe
        <input v-model="password" type="password" />
      </label>
      <button type="submit">Se connecter</button>
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
