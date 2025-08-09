<template>
  <div class="create-user-view">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Buat Pengguna Baru</h1>
    <UserForm :classes="classes" @submit-form="handleCreateUser" @cancel="goToDashboard" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import UserForm from '../components/UserForm.vue' // Pastikan path ini benar

const router = useRouter()
const classes = ref([])

const fetchClasses = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/classes`, {
      // Ganti URL API sesuai setup Anda
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.ok) {
      classes.value = await response.json()
    } else {
      console.error('Gagal mengambil daftar kelas.')
      alert('Gagal mengambil daftar kelas.')
    }
  } catch (error) {
    console.error('Error fetching classes:', error)
    alert('Terjadi kesalahan saat mengambil daftar kelas.')
  }
}

const handleCreateUser = async (userData) => {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users`, {
      // Ini akan jadi API endpoint baru
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    })

    if (response.ok) {
      alert('Pengguna berhasil ditambahkan!')
      router.push('/dashboard') // Atau ke halaman daftar pengguna jika ada
    } else {
      const errorData = await response.json()
      alert(`Gagal menambahkan pengguna: ${errorData.message || response.statusText}`)
    }
  } catch (error) {
    console.error('Error creating user:', error)
    alert('Terjadi kesalahan saat menambahkan pengguna.')
  }
}

const goToDashboard = () => {
  router.push('/dashboard')
}

onMounted(() => {
  fetchClasses()
})
</script>
