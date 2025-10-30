<script setup>
import { defineProps, ref, computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps({
  job: Object
});

const showFullDes = ref(false);
const toggleDes = () => {
  showFullDes.value = !showFullDes.value;
}
const truncatedDes = computed(() => {
  let description = props.job.description;
  if (!showFullDes.value) {
    description = description.substring(0, 90) + '...'
  }
  return description
})

</script>

<template>

  <!-- Job Listing 1 -->
  <div class="bg-white rounded-xl shadow-md relative">
    <div class="p-4">
      <!-- Job Type and Title -->
      <div class="mb-6">
        <div class="text-gray-600 my-2">{{ job.employment_type }}</div>
        <h3 class="text-xl font-bold">{{ job.title }}</h3>
        <p class="text-gray-500 text-sm">{{ job.company }}</p>
      </div>

      <!-- Description -->
      <div class="mb-5">
        <div>{{ truncatedDes }}</div>
        <button @click="toggleDes" class="text-green-500 hover:text-green-600 mb-5">
          {{ showFullDes ? 'Less' : 'More' }}
        </button>
      </div>

      <!-- Salary Range -->
      <h3 class="text-green-500 mb-2">
        <span class="text-gray-600">
          Salary
        </span>
        {{ job.salary_from.toLocaleString() }} - {{ job.salary_to.toLocaleString() }} / Year
      </h3>

      <!-- Divider -->
      <div class="border border-gray-100 mb-5"></div>

      <!-- Location and Read More -->
      <div class="flex flex-col lg:flex-row justify-between mb-4">
        <div class="text-orange-700 mb-3">
          <i class="pi pi-map-marker text-lg text-orange-700"></i>
          {{ job.location }}
          <span v-if="job.is_remote_work" class="text-sm text-green-600 ml-2">(Remote)</span>
        </div>

        <RouterLink :to="`/jobs/${Math.floor(Math.random() * 0) + 1}`"
          class="h-[36px] bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-center text-sm">
          Read More
        </RouterLink>

      </div>

      <!-- Additional info (optional) -->
      <div class="text-sm text-gray-500">
        <p><strong>Deadline:</strong> {{ job.application_deadline }}</p>
        <p><strong>Openings:</strong> {{ job.number_of_opening }}</p>
      </div>
    </div>
  </div>


</template>