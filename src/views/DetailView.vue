<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter();
const inputValue = ref('');
const counter = ref(0);

const back = () => {
  history.go(-1);
};

onBeforeRouteLeave(to => {
  router.getRoutes().forEach(item => {
    if (item.name === 'detail' && item.meta.keepAlive) {
      // 前往DetailSub页面，缓存Detail页面，否则取消缓存
      item.meta.keepAlive.value = to.name === 'detail-sub';
    }
  });
});

let timer: number;
onMounted(() => {
  timer = setInterval(() => {
    counter.value++;
  }, 100);
  console.log('DetailView mounted');
});

onUnmounted(() => {
  clearInterval(timer);
  console.log('DetailView unmounted');
});
</script>

<template>
  <div>DetailView</div>
  <div><input v-model="inputValue" /></div>
  <div>计数器：{{ counter }}</div>
  <div><RouterLink to="/detail/sub">进入二级子页面</RouterLink></div>
  <a href="javascript: void(0);" @click="back">返回上一页面</a>
</template>
