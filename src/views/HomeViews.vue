<script setup>
import Navbar from '@/components/Navbar.vue';
import Hero from '@/components/Hero.vue';
import HomeCards from '@/components/HomeCards.vue';
import Joblistings from '@/components/Joblistings.vue';
</script>

<template>
<Hero />
<HomeCards/>
<Joblistings :limit="3" :showButton/>
</template>