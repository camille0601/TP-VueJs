<script setup>
import '@/styles/home.css'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="container">
    <main>

    </main>
  </div>
</template>

<style scoped>
/* Design Sobre & Moderne */
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

/* Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.logo {
  font-weight: bold;
  font-size: 1.2rem;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

/* Boutons */
.btn-nav {
  background-color: #42b883; /* Vert VueJS */
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-main {
  background-color: #35495e;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-nav:hover,
.btn-main:hover {
  opacity: 0.9;
}

/* Section Intro */
.intro {
  padding: 80px 0;
  text-align: center;
}

.intro h1 {
  font-size: 2.5rem;
  margin-bottom: 15px;
}

.intro p {
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 30px;
}

/* Grille de cartes */
.grid-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.card {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  border: 1px solid #eee;
}

.card h3 {
  margin-top: 0;
  color: #42b883;
}
</style>
