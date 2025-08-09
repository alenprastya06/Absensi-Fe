<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Catat Absensi Harian</h2>

    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="flex-1">
        <label for="attendanceDate" class="block text-gray-700 text-sm font-bold mb-2"
          >Tanggal Absensi:</label
        >
        <input
          type="date"
          id="attendanceDate"
          v-model="selectedDate"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="flex-1" v-if="userRole === 'admin'">
        <label for="classSelect" class="block text-gray-700 text-sm font-bold mb-2"
          >Pilih Kelas:</label
        >
        <select
          id="classSelect"
          v-model="selectedClassId"
          @change="fetchAttendanceData"
          class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Pilih Kelas</option>
          <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.class_name }}</option>
        </select>
      </div>
      <div class="flex items-end">
        <button
          @click="fetchAttendanceData"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
        >
          Muat Data
        </button>
      </div>
    </div>

    <div v-if="attendanceList.length > 0">
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead class="bg-gray-200">
            <tr>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">NIS</th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Nama Siswa
              </th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Status
              </th>
              <th class="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
                Catatan
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="student in attendanceList"
              :key="student.student_id"
              class="border-b hover:bg-gray-50"
            >
              <td class="py-3 px-4 text-sm text-gray-700">{{ student.nis }}</td>
              <td class="py-3 px-4 text-sm text-gray-700">{{ student.full_name }}</td>
              <td class="py-3 px-4 text-sm text-gray-700">
                <select
                  v-model="student.status"
                  class="shadow border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="hadir">Hadir</option>
                  <option value="sakit">Sakit</option>
                  <option value="ijin">Ijin</option>
                  <option value="alfa">Alfa</option>
                </select>
              </td>
              <td class="py-3 px-4 text-sm text-gray-700">
                <input
                  type="text"
                  v-model="student.notes"
                  placeholder="Catatan (opsional)"
                  class="shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mt-6 flex justify-end">
        <button
          @click="submitAttendance"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition duration-300"
        >
          Simpan Absensi
        </button>
      </div>
    </div>
    <div v-else class="text-center text-gray-600 py-8">
      <p>Pilih kelas dan tanggal untuk memuat data absensi.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import moment from 'moment'

const selectedDate = ref(moment().format('YYYY-MM-DD'))
const selectedClassId = ref('')
const classes = ref([])
const attendanceList = ref([])
const userRole = ref('')
const userClassId = ref(null)

const fetchClasses = async () => {
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/classes`, {
      headers: { Authorization: `Bearer ${token}` },
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

const fetchAttendanceData = async () => {
  if (!selectedClassId.value) {
    alert('Pilih kelas terlebih dahulu.')
    return
  }
  const token = localStorage.getItem('token')
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/attendances/date/${selectedDate.value}?class_id=${selectedClassId.value}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    if (response.ok) {
      attendanceList.value = await response.json()
      // Ensure each student has a 'notes' property
      attendanceList.value.forEach((student) => {
        if (!student.notes) {
          student.notes = ''
        }
      })
    } else {
      console.error('Failed to fetch attendance data')
      attendanceList.value = [] // Clear previous data
    }
  } catch (error) {
    console.error('Error fetching attendance data:', error)
    attendanceList.value = [] // Clear previous data
  }
}

const submitAttendance = async () => {
  if (attendanceList.value.length === 0) {
    alert('Tidak ada data absensi untuk disimpan.')
    return
  }

  const token = localStorage.getItem('token')
  const payload = {
    attendance_date: selectedDate.value,
    attendances: attendanceList.value.map((student) => ({
      student_id: student.student_id,
      status: student.status,
      notes: student.notes || null,
    })),
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/attendances`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      alert('Absensi berhasil disimpan!')
      fetchAttendanceData() // Refresh data to show updated statuses
    } else {
      const errorData = await response.json()
      alert(`Gagal menyimpan absensi: ${errorData.message || response.statusText}`)
    }
  } catch (error) {
    console.error('Error submitting attendance:', error)
    alert('Terjadi kesalahan saat menyimpan absensi.')
  }
}

onMounted(async () => {
  const user = JSON.parse(localStorage.getItem('user'))
  userRole.value = user.role
  userClassId.value = user.class_id

  await fetchClasses()

  // If secretary, auto-select their class
  if (userRole.value === 'secretary' && userClassId.value) {
    selectedClassId.value = userClassId.value
    fetchAttendanceData()
  }
})
</script>
