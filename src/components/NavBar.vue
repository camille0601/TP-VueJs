<script setup>
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)

const links = [
  { to: '/', label: 'Accueil'},
  { to: '/about', label: 'À propos' },
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
      <!-- Logo / Brand -->
      <RouterLink to="/" class="navbar__brand" @click="closeMenu">
        <span class="navbar__brand-icon">⚡</span>
        <span class="navbar__brand-text">MonApp</span>
      </RouterLink>

      <!-- Links desktop -->
      <ul class="navbar__links">
        <li v-for="link in links" :key="link.to">
          <RouterLink
            :to="link.to"
            class="navbar__link"
            :class="{ 'navbar__link--active': route.path === link.to }"
          >
            <span class="navbar__link-icon">{{ link.icon }}</span>
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>

      <!-- Hamburger (mobile) -->
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
            <span>{{ link.icon }}</span>
            {{ link.label }}
          </RouterLink>
        </li>
      </ul>
    </transition>
  </nav>
</template>

<style scoped>
/* ===== Variables ===== */
.navbar {
  --nav-height: 64px;
  --nav-bg: rgba(15, 15, 25, 0.85);
  --nav-border: rgba(255, 255, 255, 0.08);
  --nav-accent: #7c6ef7;
  --nav-accent-glow: rgba(124, 110, 247, 0.4);
  --nav-text: rgba(255, 255, 255, 0.8);
  --nav-text-hover: #ffffff;
  --nav-radius: 12px;
  --nav-transition: 0.25s cubic-bezier(0.4, 0, 0.2, 1);

  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  background: var(--nav-bg);
  border-bottom: 1px solid var(--nav-border);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

/* ===== Inner layout ===== */
.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: var(--nav-height);
}

/* ===== Brand ===== */
.navbar__brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--nav-text-hover);
  letter-spacing: -0.02em;
  transition: opacity var(--nav-transition);
}

.navbar__brand:hover {
  opacity: 0.85;
}

.navbar__brand-icon {
  font-size: 1.4rem;
  filter: drop-shadow(0 0 8px var(--nav-accent-glow));
}

.navbar__brand-text {
  background: linear-gradient(135deg, #fff 30%, var(--nav-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ===== Desktop links ===== */
.navbar__links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.navbar__link {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  border-radius: var(--nav-radius);
  text-decoration: none;
  color: var(--nav-text);
  font-size: 0.95rem;
  font-weight: 500;
  transition:
    color var(--nav-transition),
    background var(--nav-transition),
    box-shadow var(--nav-transition);
  position: relative;
}

.navbar__link-icon {
  font-size: 1rem;
}

.navbar__link:hover {
  color: var(--nav-text-hover);
  background: rgba(255, 255, 255, 0.07);
}

.navbar__link--active {
  color: var(--nav-text-hover);
  background: rgba(124, 110, 247, 0.18);
  box-shadow: 0 0 0 1px rgba(124, 110, 247, 0.35);
}

.navbar__link--active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  border-radius: 2px;
  background: var(--nav-accent);
  box-shadow: 0 0 8px var(--nav-accent-glow);
}

/* ===== Hamburger ===== */
.navbar__hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 6px;
  background: transparent;
  border: 1px solid var(--nav-border);
  border-radius: 8px;
  cursor: pointer;
  transition: background var(--nav-transition);
}

.navbar__hamburger:hover {
  background: rgba(255, 255, 255, 0.07);
}

.navbar__hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--nav-text);
  border-radius: 2px;
  transition:
    transform var(--nav-transition),
    opacity var(--nav-transition);
}

.navbar__hamburger--open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.navbar__hamburger--open span:nth-child(2) {
  opacity: 0;
}
.navbar__hamburger--open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* ===== Mobile menu ===== */
.navbar__mobile-menu {
  list-style: none;
  margin: 0;
  padding: 0.75rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-top: 1px solid var(--nav-border);
}

.navbar__mobile-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--nav-radius);
  text-decoration: none;
  color: var(--nav-text);
  font-size: 1rem;
  font-weight: 500;
  transition:
    background var(--nav-transition),
    color var(--nav-transition);
}

.navbar__mobile-link:hover {
  background: rgba(255, 255, 255, 0.07);
  color: var(--nav-text-hover);
}

.navbar__mobile-link--active {
  background: rgba(124, 110, 247, 0.18);
  color: var(--nav-text-hover);
  box-shadow: inset 3px 0 0 var(--nav-accent);
}

/* ===== Transition ===== */
.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.25s ease;
  overflow: hidden;
  max-height: 400px;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}

/* ===== Responsive ===== */
@media (max-width: 640px) {
  .navbar__links {
    display: none;
  }

  .navbar__hamburger {
    display: flex;
  }
}
</style>
