<template>
  <div class="home-page">
    <LoginForm @loginSuccess="handleLoginSuccess" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import LoginForm from '../components/LoginForm.vue'

const router = useRouter()

const handleLoginSuccess = () => {
  // Logic to update App.vue's isLoggedIn status is handled by App.vue's watchEffect on router.afterEach
  // We can also explicitly push to dashboard here
  router.push('/dashboard')
}
</script>
