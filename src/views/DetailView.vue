<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const back = () => {
  history.go(-1);
};
const inputValue = ref('');

onMounted(() => {
  console.log('DetailView mounted');
});

onUnmounted(() => {
  console.log('DetailView unmounted');
});
</script>

<template>
  <div>DetailView</div>
  <div><input v-model="inputValue" /></div>
  <div><RouterLink to="/detail/sub">进入二级子页面</RouterLink></div>
  <a href="javascript: void(0);" @click="back">返回上一页面</a>
</template>
