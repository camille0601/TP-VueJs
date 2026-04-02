<script setup>
import { ref, reactive } from 'vue'
import StarRating from './StarRating.vue'

const step = ref(1)
const form = reactive({
  title: '',
  message: '',
  rating: 5,
})

function next() {
  if (step.value < 3) step.value++
}

function prev() {
  if (step.value > 1) step.value--
}

function submit() {
  const reviews = JSON.parse(localStorage.getItem('reviews') || '[]')
  reviews.push({ ...form, date: new Date().toISOString() })
  localStorage.setItem('reviews', JSON.stringify(reviews))
  step.value = 3
}
</script>

<template>
  <div class="multi-form">
    <div class="steps">
      <button :class="{active: step===1}" @click="step=1">1</button>
      <button :class="{active: step===2}" @click="step=2">2</button>
      <button :class="{active: step===3}" @click="step=3">3</button>
    </div>

    <div v-if="step===1">
      <h3>Étape 1 — Titre</h3>
      <input v-model="form.title" placeholder="Titre de votre avis" />
      <div class="actions">
        <button @click="next">Suivant</button>
      </div>
    </div>

    <div v-if="step===2" class="card">
      <h3>Étape 2 — Contenu</h3>
      <textarea v-model="form.message" rows="6" placeholder="Racontez votre expérience..."></textarea>
      <div class="rating-row">
        <label class="rating-label">Votre note</label>
        <StarRating v-model="form.rating" />
      </div>
      <div class="actions">
        <button class="btn-ghost" @click="prev">Précédent</button>
        <button class="btn-primary" @click="next">Suivant</button>
      </div>
    </div>

    <div v-if="step===3" class="card">
      <h3>Relecture</h3>
      <div class="review-item"><strong>Titre:</strong> <span>{{ form.title }}</span></div>
      <div class="review-item"><strong>Message:</strong> <p>{{ form.message }}</p></div>
      <div class="review-item"><strong>Note:</strong> <StarRating :modelValue="form.rating" :max="5" /></div>
      <div class="actions">
        <button class="btn-ghost" @click="prev">Modifier</button>
        <button class="btn-primary" @click="submit">Envoyer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.multi-form { background: var(--color-background-soft); padding: 1.2rem; border-radius: 12px; border: 1px solid var(--color-border); }
.multi-form input, .multi-form textarea { width: 100%; padding: 0.6rem; margin: 0.6rem 0; border: 1px solid var(--color-border); border-radius: 8px; background: var(--color-background); }
.steps { display:flex; gap:0.75rem; margin-bottom:1rem }
.steps button { width:36px; height:36px; border-radius:50%; border:1px solid var(--color-border); background: transparent }
.steps button.active { background:linear-gradient(90deg,#7c6ef7,#6b8df7); color:#fff; border-color:transparent }
.card { padding: 1rem; background: var(--color-background); border-radius: 10px; border: 1px solid var(--color-border); }
.rating-row { display:flex; align-items:center; gap:12px; margin-top:0.6rem }
.rating-label { color:var(--color-heading); font-weight:600 }
.actions { display:flex; gap:0.6rem; margin-top:0.8rem }
.btn-primary { background: linear-gradient(90deg,#7c6ef7,#6b8df7); color: #fff; border: none; padding: 0.55rem 0.9rem; border-radius: 8px; cursor:pointer }
.btn-ghost { background: transparent; border:1px solid var(--color-border); padding: 0.45rem 0.8rem; border-radius:8px; cursor:pointer }
.review-item { margin: 0.6rem 0 }
</style>
