<template>
  <nav
    class="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 backdrop-blur-sm border-b border-blue-800/30 shadow-2xl sticky top-0 z-50"
  >
    <div class="container mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <router-link
          to="/dashboard"
          class="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
        >
          <span
            class="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent"
          >
            Absensi Siswa
          </span>
        </router-link>

        <div class="hidden md:flex items-center space-x-1">
          <router-link
            to="/dashboard"
            class="nav-link px-4 py-2 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 ease-out relative group"
          >
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
                ></path>
              </svg>
              <span>Dashboard</span>
            </span>
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </router-link>

          <router-link
            to="/students"
            class="nav-link px-4 py-2 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 ease-out relative group"
          >
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                ></path>
              </svg>
              <span>Siswa</span>
            </span>
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </router-link>

          <router-link
            to="/attendance"
            class="nav-link px-4 py-2 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 ease-out relative group"
          >
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                ></path>
              </svg>
              <span>Absensi</span>
            </span>
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </router-link>

          <router-link
            to="/reports"
            class="nav-link px-4 py-2 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 ease-out relative group"
          >
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              <span>Laporan</span>
            </span>
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </router-link>

          <!-- Menu Kelas - Hanya tampil untuk admin -->
          <router-link
            v-if="user && user.role === 'admin'"
            to="/classes"
            class="nav-link px-4 py-2 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 ease-out relative group"
          >
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
              <span>Kelas</span>
            </span>
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </router-link>

          <!-- Menu Buat Pengguna - Hanya tampil untuk admin -->
          <router-link
            v-if="user && user.role === 'admin'"
            to="/users/create"
            class="nav-link px-4 py-2 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 ease-out relative group"
          >
            <span class="flex items-center space-x-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              <span>Buat Pengguna</span>
            </span>
            <div
              class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-blue-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </router-link>
        </div>

        <div class="flex items-center space-x-4">
          <div v-if="user" class="hidden lg:flex flex-col items-end"></div>

          <div
            v-if="user"
            class="lg:hidden w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center shadow-lg"
          >
            <span class="text-sm font-bold text-white">{{
              user.full_name.charAt(0).toUpperCase()
            }}</span>
          </div>

          <button
            @click="toggleMobileMenu"
            class="md:hidden text-blue-100 hover:text-white focus:outline-none"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              v-if="!isMobileMenuOpen"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-else>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <button
            @click="logout"
            class="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg hover:shadow-red-500/25 transition-all duration-300 ease-out transform hover:scale-105 active:scale-95"
          >
            <span class="flex items-center space-x-2">
              <svg
                class="w-4 h-4 transition-transform group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                ></path>
              </svg>
              <span>Logout</span>
            </span>
            <div
              class="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
          </button>
        </div>
      </div>

      <transition name="slide-fade">
        <div v-if="isMobileMenuOpen" class="md:hidden mt-4 pt-4 border-t border-blue-800/30">
          <div class="flex flex-col gap-2">
            <router-link @click="closeMobileMenu" to="/dashboard" class="mobile-nav-link"
              >Dashboard</router-link
            >
            <router-link @click="closeMobileMenu" to="/students" class="mobile-nav-link"
              >Siswa</router-link
            >
            <router-link @click="closeMobileMenu" to="/attendance" class="mobile-nav-link"
              >Absensi</router-link
            >
            <router-link @click="closeMobileMenu" to="/reports" class="mobile-nav-link"
              >Laporan</router-link
            >

            <!-- Mobile Menu Kelas - Hanya tampil untuk admin -->
            <router-link
              @click="closeMobileMenu"
              v-if="user && user.role === 'admin'"
              to="/classes"
              class="mobile-nav-link"
              >Kelas</router-link
            >

            <!-- Mobile Menu Buat Pengguna - Hanya tampil untuk admin -->
            <router-link
              @click="closeMobileMenu"
              v-if="user && user.role === 'admin'"
              to="/users/create"
              class="mobile-nav-link"
              >Buat Pengguna</router-link
            >
          </div>
        </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const user = ref(null)
const router = useRouter()
const emit = defineEmits(['logout'])
const isMobileMenuOpen = ref(false)

onMounted(() => {
  const storedRole = localStorage.getItem('role')
  const storedUserName = localStorage.getItem('userName') || 'John Doe'

  user.value = {
    full_name: storedUserName,
    role: storedRole || 'secretary',
  }

  console.log('Current user role:', user.value.role) // Untuk debugging
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const logout = () => {
  localStorage.removeItem('role')
  localStorage.removeItem('userName')
  emit('logout')
}
</script>

<style scoped>
.nav-link.router-link-active {
  @apply text-white bg-white/10;
}

.mobile-nav-link {
  @apply block px-4 py-2 rounded-lg text-white hover:bg-white/10 hover:text-white transition-colors duration-200;
}

/* Vue transition styles */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.nav-link {
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #60a5fa, #34d399);
  transform: translateX(-50%);
  transition: width 0.3s ease;
}

.nav-link:hover::before {
  width: 80%;
}

/* Glass morphism effect */
nav {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Custom scrollbar for mobile menu */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>
