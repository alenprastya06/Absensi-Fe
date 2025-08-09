<template>
  <div class="bg-white p-6 rounded-lg shadow-lg max-w-8xl mx-auto my-8 font-inter">
    <h2 class="text-3xl font-extrabold text-gray-800 mb-8 text-center">Laporan Absensi</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label for="reportType" class="block text-gray-700 text-sm font-semibold mb-2"
          >Jenis Laporan:</label
        >
        <select
          id="reportType"
          v-model="reportType"
          class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
        >
          <option value="daily">Harian / Rentang Tanggal</option>
          <option value="monthly_single">Bulanan (Satu Bulan)</option>
          <option value="monthly_range">Bulanan (Rentang Bulan)</option>
        </select>
      </div>

      <div v-if="userRole === 'admin' || userRole === 'secretary'">
        <label for="classSelectReport" class="block text-gray-700 text-sm font-semibold mb-2"
          >Pilih Kelas:</label
        >
        <select
          id="classSelectReport"
          v-model="selectedClassId"
          :disabled="userRole === 'secretary'"
          class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out disabled:bg-gray-100 disabled:text-gray-500"
        >
          <option value="">Semua Kelas (Admin)</option>
          <option v-for="cls in classes" :key="cls.id" :value="cls.id">{{ cls.class_name }}</option>
        </select>
      </div>
    </div>

    <!-- Daily Report Date Pickers -->
    <div v-if="reportType === 'daily'" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label for="startDate" class="block text-gray-700 text-sm font-semibold mb-2"
          >Tanggal Mulai:</label
        >
        <input
          type="date"
          id="startDate"
          v-model="startDate"
          class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
        />
      </div>
      <div>
        <label for="endDate" class="block text-gray-700 text-sm font-semibold mb-2"
          >Tanggal Akhir:</label
        >
        <input
          type="date"
          id="endDate"
          v-model="endDate"
          class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
        />
      </div>
    </div>

    <!-- Single Monthly Report Selectors -->
    <div v-if="reportType === 'monthly_single'" class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label for="monthSelect" class="block text-gray-700 text-sm font-semibold mb-2"
          >Bulan:</label
        >
        <select
          id="monthSelect"
          v-model="selectedMonth"
          class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
        >
          <option v-for="m in months" :key="m.value" :value="m.value">{{ m.name }}</option>
        </select>
      </div>
      <div>
        <label for="yearSelect" class="block text-gray-700 text-sm font-semibold mb-2"
          >Tahun:</label
        >
        <input
          type="number"
          id="yearSelect"
          v-model="selectedYear"
          class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
        />
      </div>
    </div>

    <!-- Monthly Range Report Selectors -->
    <div v-if="reportType === 'monthly_range'" class="space-y-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="startMonthSelect" class="block text-gray-700 text-sm font-semibold mb-2"
            >Bulan Mulai:</label
          >
          <select
            id="startMonthSelect"
            v-model="startMonth"
            class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
          >
            <option v-for="m in months" :key="m.value" :value="m.value">{{ m.name }}</option>
          </select>
        </div>
        <div>
          <label for="startYearSelect" class="block text-gray-700 text-sm font-semibold mb-2"
            >Tahun Mulai:</label
          >
          <input
            type="number"
            id="startYearSelect"
            v-model="startYear"
            class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="endMonthSelect" class="block text-gray-700 text-sm font-semibold mb-2"
            >Bulan Akhir:</label
          >
          <select
            id="endMonthSelect"
            v-model="endMonth"
            class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
          >
            <option v-for="m in months" :key="m.value" :value="m.value">{{ m.name }}</option>
          </select>
        </div>
        <div>
          <label for="endYearSelect" class="block text-gray-700 text-sm font-semibold mb-2"
            >Tahun Akhir:</label
          >
          <input
            type="number"
            id="endYearSelect"
            v-model="endYear"
            class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
          />
        </div>
      </div>

      <div class="flex items-center">
        <input
          type="checkbox"
          id="detailReport"
          v-model="detailReport"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label for="detailReport" class="ml-2 block text-sm text-gray-700 cursor-pointer">
          Tampilkan detail per bulan
        </label>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-4 mb-8">
      <button
        @click="fetchReport"
        :disabled="loading"
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out"
      >
        <svg
          v-if="loading"
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
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
        {{ loading ? 'Memproses...' : 'Generate Laporan' }}
      </button>
      <button
        @click="downloadReport"
        v-if="reportData && reportData.length > 0 && !loading"
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-60 disabled:cursor-not-allowed transition duration-150 ease-in-out"
      >
        <svg
          class="-ml-1 mr-3 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M.5 8.25a.75.75 0 01.75.75v3.69l-.72.72a.75.75 0 01-1.06-1.06L.5 8.25zm19 0a.75.75 0 01-.75.75v3.69l.72.72a.75.75 0 011.06-1.06L19.5 8.25zM12 2.25a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM8 2.25a.75.75 0 01.75.75v6.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM10.5 11.25a.75.75 0 00-1.5 0v6.5a.75.75 0 001.5 0v-6.5zm-5.78 2.22a.75.75 0 010-1.06L7.22 9.22a.75.75 0 011.06 1.06L5.78 13.47zM14.22 13.47a.75.75 0 01-1.06 0L10.5 10.56l2.69-2.69a.75.75 0 011.06 1.06l-2.69 2.69z"
            clip-rule="evenodd"
          />
        </svg>
        Unduh Laporan (XLSX)
      </button>
    </div>

    <!-- Report Results Display -->
    <div v-if="reportResult">
      <div class="mb-6">
        <h3 class="text-2xl font-bold text-gray-800 mb-2">Hasil Laporan</h3>
        <div v-if="reportResult.period" class="text-base text-gray-600">
          <p><strong>Periode:</strong> {{ formatPeriod(reportResult.period) }}</p>
        </div>
      </div>

      <!-- Daily Report Table -->
      <div
        v-if="reportType === 'daily'"
        class="overflow-x-auto shadow-md rounded-lg border border-gray-200"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tanggal
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                NIS
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nama Siswa
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kelas
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Catatan
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Dicatat Oleh
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="entry in reportData" :key="entry.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(entry.attendance_date).toLocaleDateString('id-ID') }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ entry.nis }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ entry.full_name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ entry.class_name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="getStatusClass(entry.status)"
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                >
                  {{ entry.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ entry.notes || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ entry.recorded_by_name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Monthly Single / Monthly Range (Summary) Table -->
      <div
        v-else-if="
          reportType === 'monthly_single' || (reportType === 'monthly_range' && !detailReport)
        "
        class="overflow-x-auto shadow-md rounded-lg border border-gray-200"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                NIS
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nama Siswa
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Hadir
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sakit
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ijin
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Alfa
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="entry in reportData" :key="entry.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ entry.nis }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ entry.full_name }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-center text-green-700 font-medium"
              >
                {{ entry.hadir || 0 }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-center text-yellow-700 font-medium"
              >
                {{ entry.sakit || 0 }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-blue-700 font-medium">
                {{ entry.ijin || 0 }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-red-700 font-medium">
                {{ entry.alfa || 0 }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900 font-medium">
                {{ entry.total_recorded || 0 }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Monthly Range (Detailed) Display -->
      <div v-else-if="reportType === 'monthly_range' && detailReport" class="space-y-8">
        <div
          v-for="student in reportData"
          :key="student.id"
          class="border border-gray-200 rounded-lg p-6 shadow-sm bg-white"
        >
          <div class="mb-4 pb-4 border-b border-gray-200">
            <h4 class="text-xl font-bold text-gray-800">{{ student.full_name }}</h4>
            <p class="text-sm text-gray-600">NIS: {{ student.nis }}</p>
          </div>

          <div v-if="student.months && student.months.length > 0" class="overflow-x-auto mb-6">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Bulan
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Hadir
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Sakit
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ijin
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Alfa
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="month in student.months"
                  :key="`${month.year}-${month.month}`"
                  class="hover:bg-gray-50"
                >
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                    {{ month.month_name }} {{ month.year }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-center text-green-700">
                    {{ month.hadir }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-center text-yellow-700">
                    {{ month.sakit }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-center text-blue-700">
                    {{ month.ijin }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-center text-red-700">
                    {{ month.alfa }}
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-sm text-center text-gray-900">
                    {{ month.total_recorded }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="student.totals" class="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h5 class="font-bold text-base text-gray-800 mb-3">Total Keseluruhan:</h5>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 text-sm">
              <div class="text-center p-2 bg-white rounded-md shadow-sm border border-gray-100">
                <span class="text-green-700 font-semibold text-lg">{{ student.totals.hadir }}</span>
                <div class="text-xs text-gray-600">Hadir</div>
              </div>
              <div class="text-center p-2 bg-white rounded-md shadow-sm border border-gray-100">
                <span class="text-yellow-700 font-semibold text-lg">{{
                  student.totals.sakit
                }}</span>
                <div class="text-xs text-gray-600">Sakit</div>
              </div>
              <div class="text-center p-2 bg-white rounded-md shadow-sm border border-gray-100">
                <span class="text-blue-700 font-semibold text-lg">{{ student.totals.ijin }}</span>
                <div class="text-xs text-gray-600">Ijin</div>
              </div>
              <div class="text-center p-2 bg-white rounded-md shadow-sm border border-gray-100">
                <span class="text-red-700 font-semibold text-lg">{{ student.totals.alfa }}</span>
                <div class="text-xs text-gray-600">Alfa</div>
              </div>
              <div class="text-center p-2 bg-white rounded-md shadow-sm border border-gray-100">
                <span class="text-gray-900 font-semibold text-lg">{{
                  student.totals.total_recorded
                }}</span>
                <div class="text-xs text-gray-600">Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Initial State / Loading / No Data Messages -->
    <div
      v-else-if="!loading"
      class="text-center text-gray-500 py-12 bg-gray-50 rounded-lg border border-gray-200"
    >
      <p class="text-lg">
        Silakan pilih parameter laporan dan klik "Generate Laporan" untuk melihat hasilnya.
      </p>
    </div>

    <div
      v-if="loading"
      class="text-center text-blue-600 py-12 bg-blue-50 rounded-lg border border-blue-200"
    >
      <p class="text-lg flex items-center justify-center">
        <svg
          class="animate-spin -ml-1 mr-3 h-6 w-6 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
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
        Memproses laporan...
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import moment from 'moment'
import Swal from 'sweetalert2' // Import SweetAlert2

// Reactive variables for report parameters
const reportType = ref('daily')
const startDate = ref(moment().subtract(7, 'days').format('YYYY-MM-DD'))
const endDate = ref(moment().format('YYYY-MM-DD'))
const selectedMonth = ref(moment().format('MM'))
const selectedYear = ref(moment().format('YYYY'))
const startMonth = ref('01')
const endMonth = ref('12')
const startYear = ref(moment().format('YYYY'))
const endYear = ref(moment().format('YYYY'))
const detailReport = ref(false)

// Reactive variables for data and state
const selectedClassId = ref('')
const classes = ref([])
const reportResult = ref(null) // Stores the full report object, including period
const reportData = ref([]) // Stores the actual data array to be displayed in tables
const userRole = ref('')
const userClassId = ref(null)
const loading = ref(false)

// Month options for select dropdowns
const months = [
  { value: '01', name: 'Januari' },
  { value: '02', name: 'Februari' },
  { value: '03', name: 'Maret' },
  { value: '04', name: 'April' },
  { value: '05', name: 'Mei' },
  { value: '06', name: 'Juni' },
  { value: '07', name: 'Juli' },
  { value: '08', name: 'Agustus' },
  { value: '09', name: 'September' },
  { value: '10', name: 'Oktober' },
  { value: '11', name: 'November' },
  { value: '12', name: 'Desember' },
]

/**
 * Determines the Tailwind CSS classes for attendance status display.
 * @param {string} status - The attendance status (e.g., 'hadir', 'sakit', 'ijin', 'alfa').
 * @returns {string} Tailwind CSS classes.
 */
const getStatusClass = (status) => {
  switch (status) {
    case 'hadir':
      return 'bg-green-100 text-green-800' // Lighter background for badge
    case 'sakit':
      return 'bg-yellow-100 text-yellow-800' // Lighter background for badge
    case 'ijin':
      return 'bg-blue-100 text-blue-800' // Lighter background for badge
    case 'alfa':
      return 'bg-red-100 text-red-800' // Lighter background for badge
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

/**
 * Formats the report period for display.
 * @param {object} period - Object containing start and end month/year.
 * @returns {string} Formatted period string.
 */
const formatPeriod = (period) => {
  if (period.start && period.end) {
    // Assuming period.start and period.end are in 'YYYY-MM' format
    const startDateFormatted = moment(period.start + '-01').format('MMMM YYYY')
    const endDateFormatted = moment(period.end + '-01').format('MMMM YYYY')
    return `${startDateFormatted} - ${endDateFormatted}`
  }
  // For daily reports, period might not be set or might be different
  if (reportType.value === 'daily' && startDate.value && endDate.value) {
    return `${moment(startDate.value).format('DD MMMM YYYY')} - ${moment(endDate.value).format('DD MMMM YYYY')}`
  }
  if (reportType.value === 'monthly_single' && selectedMonth.value && selectedYear.value) {
    return moment(`${selectedYear.value}-${selectedMonth.value}-01`).format('MMMM YYYY')
  }
  return ''
}

/**
 * Handles the download of the report as an XLSX file.
 */
const downloadReport = async () => {
  const token = localStorage.getItem('token')
  let url = `${import.meta.env.VITE_API_BASE_URL}/api/attendances/download/`
  let filename = 'Laporan_Absensi'

  // Determine the class ID to use for the report
  let currentClassId = selectedClassId.value
  if (userRole.value === 'secretary' && userClassId.value) {
    currentClassId = userClassId.value
  }

  try {
    if (reportType.value === 'daily') {
      // Validate dates for daily report download
      if (!startDate.value || !endDate.value) {
        Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Rentang tanggal diperlukan untuk mengunduh laporan harian.',
        })
        return
      }
      url += `date-range?start_date=${startDate.value}&end_date=${endDate.value}`
      if (currentClassId) {
        url += `&class_id=${currentClassId}`
      }
      filename = `Laporan_Absensi_Harian_${startDate.value}_${endDate.value}`
      if (currentClassId) filename += `_Kelas_${currentClassId}`
      filename += '.xlsx'
    } else if (reportType.value === 'monthly_single') {
      // Validate parameters for single monthly report download
      if (!selectedMonth.value || !selectedYear.value || !currentClassId) {
        Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Bulan, tahun, dan kelas diperlukan untuk mengunduh laporan bulanan.',
        })
        return
      }
      url += `month-range?class_id=${currentClassId}&start_month=${selectedMonth.value}&start_year=${selectedYear.value}&end_month=${selectedMonth.value}&end_year=${selectedYear.value}`
      filename = `Laporan_Absensi_Bulanan_${selectedMonth.value}-${selectedYear.value}_Kelas_${currentClassId}.xlsx`
    } else if (reportType.value === 'monthly_range') {
      // Validate parameters for monthly range report download
      if (
        !startMonth.value ||
        !endMonth.value ||
        !startYear.value ||
        !endYear.value ||
        !currentClassId
      ) {
        Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Parameter rentang bulan dan kelas diperlukan untuk mengunduh laporan.',
        })
        return
      }

      const validationError = validateMonthRange()
      if (validationError) {
        Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: validationError,
        })
        return
      }

      url += `month-range?class_id=${currentClassId}&start_month=${startMonth.value}&start_year=${startYear.value}&end_month=${endMonth.value}&end_year=${endYear.value}`
      if (detailReport.value) {
        url += `&detailed=true`
        filename = `Laporan_Absensi_Detail_Rentang_Bulan_${currentClassId}_${startMonth.value}-${startYear.value}_${endMonth.value}-${endYear.value}.xlsx`
      } else {
        filename = `Laporan_Absensi_Rentang_Bulan_${currentClassId}_${startMonth.value}-${startYear.value}_${endMonth.value}-${endYear.value}.xlsx`
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Peringatan',
        text: 'Pilih jenis laporan yang valid untuk diunduh.',
      })
      return
    }

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (response.ok) {
      const blob = await response.blob() // Get the response as a Blob
      const fileUrl = window.URL.createObjectURL(blob) // Create a URL for the Blob
      const a = document.createElement('a') // Create a temporary anchor element
      a.href = fileUrl
      a.download = filename // Set the download filename
      document.body.appendChild(a)
      a.click() // Programmatically click the anchor to trigger download
      a.remove() // Clean up the temporary anchor
      window.URL.revokeObjectURL(fileUrl) // Release the object URL
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Laporan berhasil diunduh!',
      })
    } else {
      const errorData = await response.json() // Parse error message from response
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: `Gagal mengunduh laporan: ${errorData.message || response.statusText}`,
      })
    }
  } catch (error) {
    console.error('Error downloading report:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Terjadi kesalahan saat mengunduh laporan.',
    })
  }
}

/**
 * Fetches the list of classes from the API.
 */
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
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Gagal mengambil data kelas.',
      })
    }
  } catch (error) {
    console.error('Error fetching classes:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Terjadi kesalahan saat mengambil data kelas.',
    })
  }
}

/**
 * Validates the selected month range for monthly reports.
 * @returns {string|null} An error message if validation fails, otherwise null.
 */
const validateMonthRange = () => {
  const startYearInt = parseInt(startYear.value)
  const endYearInt = parseInt(endYear.value)
  const startMonthInt = parseInt(startMonth.value)
  const endMonthInt = parseInt(endMonth.value)

  if (startYearInt > endYearInt) {
    return 'Tahun mulai tidak boleh lebih besar dari tahun akhir.'
  }

  if (startYearInt === endYearInt && startMonthInt > endMonthInt) {
    return 'Dalam tahun yang sama, bulan mulai tidak boleh lebih besar dari bulan akhir.'
  }

  return null
}

/**
 * Fetches the attendance report based on selected parameters.
 */
const fetchReport = async () => {
  const token = localStorage.getItem('token')
  let url = `${import.meta.env.VITE_API_BASE_URL}/api/attendances/report?`
  let params = {}

  loading.value = true // Set loading state to true
  reportResult.value = null // Clear previous report results
  reportData.value = [] // Clear previous report data

  try {
    // Determine the class ID to use for the report based on user role
    let currentClassId = selectedClassId.value
    if (userRole.value === 'secretary' && userClassId.value) {
      currentClassId = userClassId.value
    }

    // Validate class selection for monthly reports
    if (
      (reportType.value === 'monthly_single' || reportType.value === 'monthly_range') &&
      !currentClassId
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Peringatan',
        text: 'Pilih kelas untuk laporan bulanan atau rentang bulan.',
      })
      loading.value = false // Set loading to false on validation error
      return
    }

    // Construct parameters based on report type
    if (reportType.value === 'daily') {
      if (!startDate.value || !endDate.value) {
        Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Rentang tanggal diperlukan untuk laporan harian.',
        })
        loading.value = false
        return
      }
      params.start_date = startDate.value
      params.end_date = endDate.value
      if (currentClassId) {
        params.class_id = currentClassId
      }
    } else if (reportType.value === 'monthly_single') {
      if (!selectedMonth.value || !selectedYear.value) {
        Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Bulan dan tahun diperlukan untuk laporan bulanan.',
        })
        loading.value = false
        return
      }
      params.month = selectedMonth.value
      params.year = selectedYear.value
      params.class_id = currentClassId
    } else if (reportType.value === 'monthly_range') {
      if (!startMonth.value || !endMonth.value || !startYear.value || !endYear.value) {
        Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Bulan mulai, bulan akhir, dan tahun diperlukan untuk laporan rentang bulan.',
        })
        loading.value = false
        return
      }

      const validationError = validateMonthRange()
      if (validationError) {
        Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: validationError,
        })
        loading.value = false
        return
      }

      params.start_month = startMonth.value
      params.start_year = startYear.value
      params.end_month = endMonth.value
      params.end_year = endYear.value
      params.class_id = currentClassId

      if (detailReport.value) {
        params.detailed = 'true'
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Peringatan',
        text: 'Pilih jenis laporan yang valid.',
      })
      loading.value = false
      return
    }

    // Build the full URL with query parameters
    const queryString = new URLSearchParams(params).toString()
    url += queryString

    // Fetch the report data
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (response.ok) {
      const result = await response.json()

      // Adapt to different API response structures
      if (Array.isArray(result)) {
        // If the API directly returns an array (e.g., daily report)
        reportResult.value = { data: result }
        reportData.value = result
      } else if (result.data) {
        // If the API returns an object with a 'data' property
        reportResult.value = result
        reportData.value = result.data
      } else {
        // Fallback for other structures, assuming 'result' itself is the data
        // And construct a period object for display if not provided by API
        reportResult.value = {
          period: {
            start: `${startYear.value}-${startMonth.value.padStart(2, '0')}`,
            end: `${endYear.value}-${endMonth.value.padStart(2, '0')}`,
            start_month: startMonth.value,
            start_year: startYear.value,
            end_month: endMonth.value,
            end_year: endYear.value,
          },
          data: result,
        }
        reportData.value = result
      }
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Laporan berhasil dimuat.',
      })
    } else {
      const error = await response.json()
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: `Gagal mengambil laporan: ${error.message || response.statusText}`,
      })
    }
  } catch (error) {
    console.error('Error fetching report data:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Terjadi kesalahan saat mengambil laporan.',
    })
  } finally {
    loading.value = false // Always set loading to false after fetch attempt
  }
}

// Lifecycle hook: runs when the component is mounted
onMounted(async () => {
  // Retrieve user role and class ID from local storage
  const user = JSON.parse(localStorage.getItem('user'))
  userRole.value = user.role
  userClassId.value = user.class_id

  // Fetch the list of classes
  await fetchClasses()

  // If the user is a secretary, pre-select their assigned class
  if (userRole.value === 'secretary' && userClassId.value) {
    selectedClassId.value = userClassId.value
  }
})
</script>

<style>
/* You can add custom styles here if needed, but Tailwind is preferred */
/* Ensure Inter font is used (Tailwind default, but can be explicitly set if needed) */
.font-inter {
  font-family: 'Inter', sans-serif;
}
</style>
