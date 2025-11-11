<template>
  <div v-if="isReady">
    <!-- ✅ Show Navbar except on Login page -->
    <Navbar v-if="$route.name !== 'Login'" />
    <router-view />
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'

const isReady = ref(false)

onMounted(() => {
  // give Vue a moment to load localStorage
  setTimeout(() => {
    isReady.value = true
  }, 100)
})
</script>




<style>
/* Make sure layout spans full height */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Allow main content to expand and push footer down */
router-view {
  flex: 1;
}
</style>
