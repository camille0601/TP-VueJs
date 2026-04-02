<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import '@/styles/navbar.css'
import AuthMenu from './AuthMenu.vue'
const route = useRoute()
const menuOpen = ref(false)

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/formulaire', label: 'Formulaire' }
]

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar__inner">
      <RouterLink to="/" class="navbar__brand" @click="closeMenu">
        <span class="navbar__brand-text">TP VueJs</span>
      </RouterLink>

      <ul class="navbar__links">
        <li v-for="link in links" :key="link.to">
          <RouterLink
            :to="link.to"
            class="navbar__link"
            :class="{ 'navbar__link--active': route.path === link.to }"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>

      <div class="navbar__actions">
        <AuthMenu />
      </div>

      <button
        class="navbar__hamburger"
        :class="{ 'navbar__hamburger--open': menuOpen }"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <transition name="slide-down">
      <ul v-if="menuOpen" class="navbar__mobile-menu">
        <li v-for="link in links" :key="link.to">
          <RouterLink
            :to="link.to"
            class="navbar__mobile-link"
            :class="{ 'navbar__mobile-link--active': route.path === link.to }"
            @click="closeMenu"
          >
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>
    </transition>
  </nav>
</template>
