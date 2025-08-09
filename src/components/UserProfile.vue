<template>
  <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
    <!-- Header -->
    <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Profil Pengguna</h2>
          <p class="text-sm text-gray-600">Informasi akun dan pengaturan</p>
        </div>
      </div>
    </div>

    <!-- Profile Content -->
    <div class="p-6">
      <!-- Loading State -->
      <div v-if="!user" class="flex items-center justify-center py-8">
        <div class="flex flex-col items-center space-y-3">
          <div
            class="animate-spin w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full"
          ></div>
          <p class="text-sm text-gray-500">Memuat profil...</p>
        </div>
      </div>

      <!-- Profile Information -->
      <div v-else class="space-y-6">
        <!-- Main Profile Card -->
        <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div class="flex items-start space-x-4">
            <!-- Avatar -->
            <div
              class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"
            >
              <span class="text-xl font-semibold text-blue-700">
                {{ getInitials(user.full_name) }}
              </span>
            </div>

            <!-- Basic Info -->
            <div class="flex-1 min-w-0">
              <h3 class="text-lg font-medium text-gray-900 mb-1">{{ user.full_name }}</h3>
              <p class="text-sm text-gray-600 mb-2">@{{ user.username }}</p>
              <div class="flex items-center space-x-2">
                <span
                  :class="roleClasses[user.role]"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2zm5-1v1H9V5a1 1 0 112 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  {{ getRoleDisplay(user.role) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Detailed Information -->
        <div class="grid gap-4">
          <h4 class="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">
            Detail Informasi
          </h4>

          <!-- Information Items -->
          <div class="grid gap-3">
            <!-- Full Name -->
            <div class="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Nama Lengkap</p>
                  <p class="text-sm text-gray-600">{{ user.full_name }}</p>
                </div>
              </div>
            </div>

            <!-- Username -->
            <div class="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Username</p>
                  <p class="text-sm text-gray-600">{{ user.username }}</p>
                </div>
              </div>
            </div>

            <!-- Email (if available) -->
            <div
              v-if="user.email"
              class="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-4 h-4 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Email</p>
                  <p class="text-sm text-gray-600">{{ user.email }}</p>
                </div>
              </div>
            </div>

            <!-- Role -->
            <div class="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-4 h-4 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Peran</p>
                  <p class="text-sm text-gray-600">{{ getRoleDisplay(user.role) }}</p>
                </div>
              </div>
            </div>

            <!-- Class (if secretary) -->
            <div
              v-if="user.class_name"
              class="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-4 h-4 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900">Kelas yang Dikelola</p>
                  <p class="text-sm text-gray-600">{{ user.class_name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const user = ref(null)

defineEmits(['editProfile', 'changePassword'])

const roleClasses = {
  admin: 'bg-blue-100 text-blue-800',
  secretary: 'bg-green-100 text-green-800',
}

const getInitials = (name) => {
  if (!name) return 'UN'
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2)
}

const getRoleDisplay = (role) => {
  const roleMap = {
    admin: 'Administrator',
    secretary: 'Sekretaris Kelas',
  }
  return roleMap[role] || role
}

onMounted(() => {
  const userData = localStorage.getItem('user')
  if (userData) {
    try {
      user.value = JSON.parse(userData)
    } catch (error) {
      console.error('Error parsing user data:', error)
    }
  }
})
</script>
