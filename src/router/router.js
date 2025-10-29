import { createRouter, createWebHistory } from "vue-router";
import HomeViews from '@/views/HomeViews.vue';
import JobViews from '@/views/JobViews.vue';
import NotFound from "@/views/NotFound.vue";
import JobsView from "@/views/JobsView.vue";
import AddJobsView from "@/views/AddJobsView.vue";
import EditJobView from "@/views/EditJobView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'home',
        component: HomeViews 
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: JobViews
    },
    {
      path: '/jobs/:id',
      name: 'job',
      component: JobsView,
    },
    {
      path: '/add/job',
      name: 'AddJobView',
      component: AddJobsView
    },
     {
      path: '/jobs/edit/:id',
      name: 'edit-job',
      component: EditJobView,
    },
    {
      path: '/:catchall(.*)',
      name: 'NotFound',
      // redirect: '/',
      component: NotFound
    },
  ]});

  export default router;