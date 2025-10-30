<script setup>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import BackButton from '@/components/BackButton.vue'
import { reactive, onMounted } from 'vue'
import { useRoute, RouterLink, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const jobId = route.params.id

const state = reactive({
  job: null,
  isLoading: true,
})

const deleteJob = async () => {
  try {
    const confirmDelete = window.confirm('Are you sure you want to delete this job?')
    if (confirmDelete) {
      await axios.delete(`/api/jobs/${jobId}`)
      toast.success('Job Deleted Successfully')
      router.push('/jobs')
    }
  } catch (error) {
    console.error('Error deleting job', error)
    toast.error('Job Not Deleted')
  }
}

onMounted(async () => {
  try {
    console.log('Fetching job with ID:', jobId)
    const response = await axios.get(`https://jsonfakery.com/jobs/random/${jobId}`)

    // Fix: Assign the first object in the array
    state.job = Array.isArray(response.data) ? response.data[0] : response.data
    console.log('Fetched job:', state.job)
  } catch (error) {
    console.error('Error fetching job', error)
    toast.error('Failed to fetch job')
  } finally {
    state.isLoading = false
  }
})
</script>

<template>
  <BackButton />

  <!-- Show loading spinner -->
  <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
    <PulseLoader />
  </div>

  <!-- Job content -->
  <section v-else class="bg-green-50">
    <div class="container m-auto py-10 px-6">
      <div class="grid grid-cols-1 md:grid-cols-[70%_30%] w-full gap-6">
        <!-- Main Job Section -->
        <main>
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="text-gray-500 mb-2">{{ state.job.employment_type }}</div>
            <h1 class="text-3xl font-bold mb-2">{{ state.job.title }}</h1>
            <p class="text-gray-500 mb-4">{{ state.job.job_category }}</p>

            <div class="text-gray-500 mb-4 flex items-center justify-center md:justify-start">
              <i class="pi pi-map-marker text-xl text-orange-700 mr-2"></i>
              <p class="text-orange-700">
                {{ state.job.location }}
                <span v-if="state.job.is_remote_work" class="ml-2 text-green-600 text-sm">(Remote)</span>
              </p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-4">Job Description</h3>
            <p class="mb-4">{{ state.job.description }}</p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>
            <p class="mb-4">
              {{ state.job.salary_from?.toLocaleString() }} -
              {{ state.job.salary_to?.toLocaleString() }} / Year
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Qualifications</h3>
            <ul class="list-disc list-inside mb-4">
              <li
                v-for="(qual, index) in JSON.parse(state.job.qualifications || '[]')"
                :key="index"
                class="text-gray-600"
              >
                {{ qual }}
              </li>
            </ul>

            <p><strong>Deadline:</strong> {{ state.job.application_deadline }}</p>
            <p><strong>Openings:</strong> {{ state.job.number_of_opening }}</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-4">Company Info</h3>

            <h2 class="text-2xl font-semibold mb-2">
              {{ state.job.company || 'N/A' }}
            </h2>

            <p class="text-gray-600 mb-2">
              <strong>Contact:</strong> {{ state.job.contact || 'Not provided' }}
            </p>

            <p class="text-gray-600 mb-2">
              <strong>Category:</strong> {{ state.job.job_category }}
            </p>
          </div>

          <!-- Manage Job -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-4">Manage Job</h3>

            <RouterLink
              :to="`/jobs/edit/${state.job.id}`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full block"
            >
              Edit Job
            </RouterLink>

            <button
              @click="deleteJob"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full mt-4 block"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
