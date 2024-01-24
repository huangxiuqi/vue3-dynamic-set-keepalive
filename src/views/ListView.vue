<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';

onMounted(() => {
  console.log('ListView mounted');
});

onUnmounted(() => {
  console.log('ListView unmounted');
});
</script>

<template>
  <div>ListView</div>
  <RouterLink to="/detail">进入详情页</RouterLink>
</template>
