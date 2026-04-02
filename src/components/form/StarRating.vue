<script setup>
import { ref, watch, computed } from 'vue'
import { defineProps, defineEmits } from 'vue'

const props = defineProps({ modelValue: { type: Number, default: 5 }, max: { type: Number, default: 5 } })
const emit = defineEmits(['update:modelValue'])

const hover = ref(0)

function setRating(n) {
  emit('update:modelValue', n)
}

function enter(n) { hover.value = n }
function leave() { hover.value = 0 }

const stars = computed(() => Array.from({ length: props.max }, (_, i) => i + 1))
</script>

<template>
  <div class="star-rating" @mouseleave="leave">
    <button
      v-for="s in stars"
      :key="s"
      type="button"
      class="star"
      :class="{ filled: (hover || props.modelValue) >= s }"
      @mouseenter="enter(s)"
      @click="setRating(s)"
      aria-label="Donner {{ s }} étoiles"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.011 4.665 24 6 15.595 0 9.748l8.332-1.73L12 .587z"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.star-rating { display:flex; gap:8px; align-items:center }
.star { background: transparent; border: none; cursor: pointer; color: var(--color-border); padding: 4px; }
.star svg { transition: transform 0.12s ease, color 0.12s ease; }
.star:hover svg { transform: translateY(-3px) scale(1.05); }
.star.filled { color: #f5b301; }
</style>
