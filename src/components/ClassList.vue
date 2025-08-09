<template>
  <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
    <!-- Header -->
    <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900">Daftar Kelas</h2>
            <p class="text-sm text-gray-600">Kelola kelas yang tersedia</p>
          </div>
        </div>
        <button
          @click="openAddClassModal"
          class="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tambah Kelas
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center py-12">
        <div class="flex flex-col items-center space-y-3">
          <div
            class="animate-spin w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full"
          ></div>
          <p class="text-sm text-gray-500">Memuat data kelas...</p>
        </div>
      </div>

      <!-- Classes Table -->
      <div v-else-if="classes.length > 0" class="overflow-hidden rounded-lg border border-gray-200">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nama Kelas
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tingkat
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tahun Ajaran
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="cls in classes" :key="cls.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3"
                    >
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
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ cls.class_name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {{ cls.grade_level }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ cls.academic_year }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Aktif
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div
          class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Belum ada kelas</h3>
        <p class="text-gray-600 mb-6">Mulai dengan menambahkan kelas pertama Anda.</p>
        <button
          @click="openAddClassModal"
          class="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tambah Kelas Pertama
        </button>
      </div>
    </div>

    <!-- Add Class Modal -->
    <teleport to="body">
      <div
        v-if="showAddClassModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        @click.self="closeAddClassModal"
      >
        <div class="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all">
          <!-- Modal Header -->
          <div class="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-xl">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">Tambah Kelas Baru</h3>
              <button
                @click="closeAddClassModal"
                class="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg p-1"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Modal Content -->
          <div class="p-6">
            <form @submit.prevent="addClass" class="space-y-5">
              <!-- Class Name -->
              <div class="space-y-2">
                <label for="newClassName" class="block text-sm font-medium text-gray-900">
                  Nama Kelas
                  <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="newClassName"
                  v-model="newClass.class_name"
                  class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Contoh: XII IPA 1"
                  required
                />
              </div>

              <!-- Grade Level -->
              <div class="space-y-2">
                <label for="newGradeLevel" class="block text-sm font-medium text-gray-900">
                  Tingkat
                  <span class="text-red-500">*</span>
                </label>
                <select
                  id="newGradeLevel"
                  v-model="newClass.grade_level"
                  class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                  required
                >
                  <option value="">Pilih Tingkat</option>
                  <option value="X">Kelas X</option>
                  <option value="XI">Kelas XI</option>
                  <option value="XII">Kelas XII</option>
                </select>
              </div>

              <!-- Academic Year -->
              <div class="space-y-2">
                <label for="newAcademicYear" class="block text-sm font-medium text-gray-900">
                  Tahun Ajaran
                  <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="newAcademicYear"
                  v-model="newClass.academic_year"
                  class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Contoh: 2024/2025"
                  required
                />
              </div>

              <!-- Action Buttons -->
              <div class="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  @click="closeAddClassModal"
                  class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 transition-all duration-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm flex items-center"
                >
                  <svg
                    v-if="isSubmitting"
                    class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {{ isSubmitting ? 'Menambahkan...' : 'Tambah Kelas' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </teleport>

    <!-- Toast Notification -->
    <teleport to="body">
      <div
        v-if="showToast"
        class="fixed top-4 right-4 z-50 transform transition-all duration-300"
        :class="toastClass"
      >
        <div class="flex items-center p-4 rounded-lg shadow-lg border">
          <svg
            v-if="toastType === 'success'"
            class="w-5 h-5 mr-3 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <svg v-else class="w-5 h-5 mr-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm font-medium">{{ toastMessage }}</span>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const classes = ref([])
const showAddClassModal = ref(false)
const isLoading = ref(true)
const isSubmitting = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

const newClass = ref({
  class_name: '',
  grade_level: '',
  academic_year: '',
})

const toastClass = computed(() => {
  return toastType.value === 'success'
    ? 'bg-green-50 border-green-200 text-green-800'
    : 'bg-red-50 border-red-200 text-red-800'
})

const showToastMessage = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 4000)
}

const fetchClasses = async () => {
  const token = localStorage.getItem('token')
  isLoading.value = true

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/classes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.ok) {
      classes.value = await response.json()
    } else {
      console.error('Failed to fetch classes')
      showToastMessage('Gagal memuat data kelas', 'error')
    }
  } catch (error) {
    console.error('Error fetching classes:', error)
    showToastMessage('Terjadi kesalahan saat memuat data', 'error')
  } finally {
    isLoading.value = false
  }
}

const openAddClassModal = () => {
  newClass.value = { class_name: '', grade_level: '', academic_year: '' }
  showAddClassModal.value = true
}

const closeAddClassModal = () => {
  showAddClassModal.value = false
}

const addClass = async () => {
  const token = localStorage.getItem('token')
  isSubmitting.value = true

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/classes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newClass.value),
    })

    if (response.ok) {
      showToastMessage('Kelas berhasil ditambahkan!')
      closeAddClassModal()
      fetchClasses()
    } else {
      const errorData = await response.json()
      showToastMessage(`Gagal menambah kelas: ${errorData.message || response.statusText}`, 'error')
    }
  } catch (error) {
    console.error('Error adding class:', error)
    showToastMessage('Terjadi kesalahan saat menambah kelas', 'error')
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchClasses()
})
</script>
