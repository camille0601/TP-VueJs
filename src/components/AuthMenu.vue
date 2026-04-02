<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { isAuthenticated, getUser, logout } from '../services/auth'

const open = ref(false)
const router = useRouter()
const user = getUser()

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function onDocClick(e) {
  const el = e.target
  if (!el.closest || !el.closest('.auth')) return close()
}

function doLogout() {
  logout()
  router.push('/')
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <div class="auth">
    <button class="auth__button" @click.stop="toggle" aria-expanded="open">
      <svg
        class="auth__icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zM4 20c0-3.314 4.03-6 8-6s8 2.686 8 6v1H4v-1z"
          fill="currentColor"
        />
      </svg>
      <span class="auth__text">{{ user && user.username ? user.username : 'Se connecter' }}</span>
    </button>

    <transition name="fade">
      <div v-if="open" class="auth__menu">
        <template v-if="!isAuthenticated()">
          <RouterLink to="/login" class="auth__item" @click="close">Se connecter</RouterLink>
          <RouterLink to="/register" class="auth__item" @click="close">S'inscrire</RouterLink>
        </template>
        <template v-else>
          <a href="#" class="auth__item">Mon profil</a>
          <a href="#" class="auth__item" @click.prevent="doLogout">Se déconnecter</a>
        </template>
        <div class="auth__sep"></div>
        <a href="#" class="auth__item">Paramètres</a>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.auth {
  position: relative;
}

.auth__button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  background: linear-gradient(90deg, rgba(124, 110, 247, 0.12), rgba(124, 110, 247, 0.06));
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

.auth__icon {
  color: #fff;
  opacity: 0.9;
}

.auth__menu {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  min-width: 180px;
  background: rgba(15, 15, 25, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.04);
  padding: 0.5rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  z-index: 120;
}

.auth__item {
  color: rgba(255, 255, 255, 0.9);
  padding: 0.5rem 0.6rem;
  text-decoration: none;
  border-radius: 8px;
}

.auth__item:hover {
  background: rgba(255, 255, 255, 0.03);
}

.auth__sep {
  height: 1px;
  background: rgba(255, 255, 255, 0.04);
  margin: 0.4rem 0;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
