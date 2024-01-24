<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const back = () => {
  history.go(-1);
};

onMounted(() => {
  console.log('DetailSubView mounted');
});

onUnmounted(() => {
  console.log('DetailSubView unmounted');
});
</script>

<template>
  <div>DetailSubView</div>
  <a href="javascript: void(0);" @click="back">返回上一页面</a>
</template>
