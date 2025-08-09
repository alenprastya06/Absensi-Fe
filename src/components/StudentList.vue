<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Daftar Siswa</h2>
      <button
        @click="openAddStudentModal"
        v-if="userRole === 'admin'"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
      >
        Tambah Siswa Baru
      </button>
    </div>

    <div v-if="students.length > 0">
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead class="bg-gray-200">
            <tr>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">NIS</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Nama Lengkap
              </th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Kelas
              </th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Gender
              </th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Tanggal Lahir
              </th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Alamat
              </th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Telepon
              </th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Telepon Ortu
              </th>
              <th
                v-if="userRole === 'admin'"
                class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b"
              >
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in students" :key="student.id" class="border-b hover:bg-gray-50">
              <td class="py-3 px-4 text-sm text-gray-700">{{ student.student_id }}</td>
              <td class="py-3 px-4 text-sm text-gray-700">{{ student.full_name }}</td>
              <td class="py-3 px-4 text-sm text-gray-700">{{ student.class_name }}</td>
              <td class="py-3 px-4 text-sm text-gray-700">
                {{ student.gender === 'L' ? 'Laki-laki' : 'Perempuan' }}
              </td>
              <td class="py-3 px-4 text-sm text-gray-700">
                {{ student.birth_date ? new Date(student.birth_date).toLocaleDateString() : '-' }}
              </td>
              <td class="py-3 px-4 text-sm text-gray-700">{{ student.address || '-' }}</td>
              <td class="py-3 px-4 text-sm text-gray-700">{{ student.phone || '-' }}</td>
              <td class="py-3 px-4 text-sm text-gray-700">{{ student.parent_phone || '-' }}</td>
              <td
                v-if="userRole === 'admin'"
                class="py-3 px-4 text-sm text-gray-700 whitespace-nowrap"
              >
                <button
                  @click="openEditStudentModal(student)"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-xs mr-2 transition duration-300"
                >
                  Edit
                </button>
                <button
                  @click="deleteStudent(student.id)"
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs transition duration-300"
                >
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else class="text-center text-gray-600 py-8">
      <p>Belum ada data siswa.</p>
    </div>

    <teleport to="body">
      <div
        v-if="showStudentModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
          <button
            @click="closeStudentModal"
            class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
          >
            &times;
          </button>
          <StudentForm
            :student="currentStudent"
            :classes="classes"
            @submit-form="handleStudentFormSubmit"
            @cancel="closeStudentModal"
          />
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StudentForm from './StudentForm.vue'

const students = ref([])
const userRole = ref('')
const showStudentModal = ref(false)
const currentStudent = ref(null)
const classes = ref([])

const fetchStudents = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.ok) {
      students.value = await response.json()
    } else {
      console.error('Failed to fetch students')
    }
  } catch (error) {
    console.error('Error fetching students:', error)
  }
}

const fetchClasses = async () => {
  const token = localStorage.getItem('token')
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
    }
  } catch (error) {
    console.error('Error fetching classes:', error)
  }
}

const openAddStudentModal = () => {
  currentStudent.value = null // Clear for new student
  showStudentModal.value = true
}

const openEditStudentModal = (student) => {
  currentStudent.value = { ...student } // Clone student data for editing
  showStudentModal.value = true
}

const closeStudentModal = () => {
  showStudentModal.value = false
  currentStudent.value = null
}

const handleStudentFormSubmit = async (formData) => {
  const token = localStorage.getItem('token')
  try {
    let response
    if (formData.id) {
      // Update existing student
      response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
    } else {
      // Create new student
      response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
    }

    if (response.ok) {
      alert(`Siswa berhasil ${formData.id ? 'diupdate' : 'ditambahkan'}.`)
      closeStudentModal()
      fetchStudents() // Refresh the list
    } else {
      const errorData = await response.json()
      alert(
        `Gagal ${formData.id ? 'mengupdate' : 'menambah'} siswa: ${errorData.message || response.statusText}`,
      )
    }
  } catch (error) {
    console.error('Error submitting student form:', error)
    alert('Terjadi kesalahan saat menyimpan data siswa.')
  }
}

const deleteStudent = async (id) => {
  if (!confirm('Apakah Anda yakin ingin menghapus siswa ini?')) {
    return
  }
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/students/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.ok) {
      alert('Siswa berhasil dihapus.')
      fetchStudents() // Refresh the list
    } else {
      const errorData = await response.json()
      alert(`Gagal menghapus siswa: ${errorData.message || response.statusText}`)
    }
  } catch (error) {
    console.error('Error deleting student:', error)
    alert('Terjadi kesalahan saat menghapus siswa.')
  }
}

onMounted(() => {
  userRole.value = JSON.parse(localStorage.getItem('user')).role
  fetchStudents()
  fetchClasses() // Fetch classes for the form
})
</script>
