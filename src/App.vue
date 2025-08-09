<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <Navbar v-if="isLoggedIn" @logout="handleLogout" />
    <main :class="{ 'flex-grow container mx-auto p-4': isLoggedIn }">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'

const router = useRouter()
const route = useRoute()
const isLoggedIn = ref(false)

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('token')
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  checkLoginStatus()
  router.push('/')
}

watchEffect(() => {
  checkLoginStatus()
})

// Watch route changes to update login status if necessary (e.g., after successful login)
router.afterEach(() => {
  checkLoginStatus()
})
</script>

<style scoped>
/* No specific styles needed for App.vue beyond Tailwind */
</style>
