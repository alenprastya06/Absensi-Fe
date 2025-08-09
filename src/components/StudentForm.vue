<template>
  <div class="h-300">
    <form @submit.prevent="submitForm" class="space-y-1">
      <!-- Personal Information Section -->
      <div class="space-y-6">
        <div class="border-b border-gray-100">
          <h4 class="text-lg font-semibold text-gray-900 mb-1">Informasi Pribadi</h4>
          <p class="text-sm text-gray-600">Data personal siswa</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- NIS -->
          <div class="space-y-2">
            <label for="student_id" class="block text-sm font-medium text-gray-700">
              NIS <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="text"
                id="student_id"
                v-model="formData.student_id"
                :disabled="!!student"
                class="block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                placeholder="Masukkan NIS siswa"
                required
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Nama Lengkap -->
          <div class="space-y-2">
            <label for="full_name" class="block text-sm font-medium text-gray-700">
              Nama Lengkap <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="text"
                id="full_name"
                v-model="formData.full_name"
                class="block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                placeholder="Masukkan nama lengkap"
                required
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Kelas -->
          <div class="space-y-2">
            <label for="class_id" class="block text-sm font-medium text-gray-700">
              Kelas <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <select
                id="class_id"
                v-model="formData.class_id"
                class="block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent appearance-none bg-white transition-all duration-200"
                required
              >
                <option value="" disabled>Pilih Kelas</option>
                <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                  {{ cls.class_name }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Gender -->
          <div class="space-y-2">
            <label for="gender" class="block text-sm font-medium text-gray-700">
              Jenis Kelamin <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <select
                id="gender"
                v-model="formData.gender"
                class="block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent appearance-none bg-white transition-all duration-200"
                required
              >
                <option value="" disabled>Pilih Jenis Kelamin</option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Tanggal Lahir -->
          <div class="space-y-2 md:col-span-2">
            <label for="birth_date" class="block text-sm font-medium text-gray-700">
              Tanggal Lahir
            </label>
            <div class="relative">
              <input
                type="date"
                id="birth_date"
                v-model="formData.birth_date"
                class="block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Information Section -->
      <div class="space-y-6">
        <div class="border-b border-gray-100 pb-4">
          <h4 class="text-lg font-semibold text-gray-900 mb-1">Informasi Kontak</h4>
          <p class="text-sm text-gray-600">Alamat dan nomor telepon</p>
        </div>

        <div class="space-y-6">
          <!-- Alamat -->
          <div class="space-y-2">
            <label for="address" class="block text-sm font-medium text-gray-700">
              Alamat Lengkap
            </label>
            <div class="relative">
              <textarea
                id="address"
                v-model="formData.address"
                rows="3"
                class="block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none transition-all duration-200"
                placeholder="Masukkan alamat lengkap siswa"
              ></textarea>
              <div class="absolute top-3 right-3 pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Telepon Siswa -->
            <div class="space-y-2">
              <label for="phone" class="block text-sm font-medium text-gray-700">
                Nomor Telepon Siswa
              </label>
              <div class="relative">
                <input
                  type="tel"
                  id="phone"
                  v-model="formData.phone"
                  class="block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                  placeholder="Contoh: 08123456789"
                />
                <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    class="h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Telepon Orang Tua -->
            <div class="space-y-2">
              <label for="parent_phone" class="block text-sm font-medium text-gray-700">
                Nomor Telepon Orang Tua
              </label>
              <div class="relative">
                <input
                  type="tel"
                  id="parent_phone"
                  v-model="formData.parent_phone"
                  class="block w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200"
                  placeholder="Contoh: 08123456789"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex items-center justify-end space-x-4 pt-6 border-t border-gray-100">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-6 py-3 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent transition-all duration-200"
        >
          Batal
        </button>
        <button
          type="submit"
          class="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <span>{{ student ? 'Perbarui Data' : 'Simpan Data' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  student: Object,
  classes: Array,
})

const emit = defineEmits(['submitForm', 'cancel'])

const formData = ref({
  id: null,
  student_id: '',
  full_name: '',
  class_id: '',
  gender: '',
  birth_date: '',
  address: '',
  phone: '',
  parent_phone: '',
})

watchEffect(() => {
  if (props.student) {
    formData.value = {
      ...props.student,
      // Format birth_date to YYYY-MM-DD for date input
      birth_date: props.student.birth_date
        ? new Date(props.student.birth_date).toISOString().split('T')[0]
        : '',
    }
  } else {
    // Reset form for new student
    formData.value = {
      id: null,
      student_id: '',
      full_name: '',
      class_id: '',
      gender: '',
      birth_date: '',
      address: '',
      phone: '',
      parent_phone: '',
    }
  }
})

const submitForm = () => {
  emit('submitForm', formData.value)
}
</script>
