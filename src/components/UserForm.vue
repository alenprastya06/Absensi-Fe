<template>
  <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
    <!-- Header -->
    <div class="bg-gray-50 px-6 py-4 border-b border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900">
        {{ user ? 'Edit Pengguna' : 'Tambah Pengguna Baru' }}
      </h3>
      <p class="text-sm text-gray-600 mt-1">
        {{ user ? 'Perbarui informasi pengguna' : 'Lengkapi form untuk menambah pengguna baru' }}
      </p>
    </div>

    <!-- Form Content -->
    <div class="p-6">
      <form @submit.prevent="submitForm" class="space-y-5">
        <!-- Username Field -->
        <div class="space-y-2">
          <label for="username" class="block text-sm font-medium text-gray-900">
            Username
            <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="username"
            v-model="formData.username"
            class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100 disabled:text-gray-500"
            :disabled="!!user"
            placeholder="Masukkan username"
            required
          />
          <p v-if="!!user" class="text-xs text-gray-500">Username tidak dapat diubah</p>
        </div>

        <!-- Full Name Field -->
        <div class="space-y-2">
          <label for="full_name" class="block text-sm font-medium text-gray-900">
            Nama Lengkap
            <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="full_name"
            v-model="formData.full_name"
            class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>

        <!-- Email Field -->
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-900">
            Email
            <span class="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="contoh@email.com"
            required
          />
        </div>

        <!-- Password Field (only for new user) -->
        <div v-if="!user" class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-900">
            Password
            <span class="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Masukkan password"
            required
          />
          <p class="text-xs text-gray-500">Minimal 8 karakter</p>
        </div>

        <!-- Role Field -->
        <div class="space-y-2">
          <label for="role" class="block text-sm font-medium text-gray-900">
            Role
            <span class="text-red-500">*</span>
          </label>
          <select
            id="role"
            v-model="formData.role"
            class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
            required
          >
            <option value="" disabled>Pilih Role</option>
            <option value="admin">Admin</option>
            <option value="secretary">Sekretaris Kelas</option>
          </select>
        </div>

        <!-- Class Selection (conditional) -->
        <div v-if="formData.role === 'secretary'" class="space-y-2">
          <label for="class_id" class="block text-sm font-medium text-gray-900">
            Kelas
            <span class="text-red-500">*</span>
          </label>
          <select
            id="class_id"
            v-model="formData.class_id"
            class="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
            :required="formData.role === 'secretary'"
          >
            <option value="" disabled>Pilih Kelas</option>
            <option v-for="cls in classes" :key="cls.id" :value="cls.id">
              {{ cls.class_name }}
            </option>
          </select>
          <p class="text-xs text-gray-500">Pilih kelas yang akan dikelola</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            @click="$emit('cancel')"
            class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 transition-all duration-200"
          >
            Batal
          </button>
          <button
            type="submit"
            class="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
          >
            {{ user ? 'Perbarui' : 'Simpan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({
  user: Object, // Prop for existing user data if editing
  classes: Array, // Prop for list of classes
})

const emit = defineEmits(['submitForm', 'cancel'])

const formData = ref({
  id: null,
  username: '',
  full_name: '',
  email: '',
  password: '', // Only for creation
  role: '',
  class_id: null,
})

watchEffect(() => {
  if (props.user) {
    formData.value = { ...props.user, password: '' } // Don't pre-fill password
  } else {
    formData.value = {
      id: null,
      username: '',
      full_name: '',
      email: '',
      password: '',
      role: '',
      class_id: null,
    }
  }
})

const submitForm = () => {
  if (formData.value.role !== 'secretary') {
    formData.value.class_id = null
  }
  emit('submitForm', formData.value)
}
</script>
