<script setup lang="ts">
import { KeepAlive, Ref, ref, effect } from 'vue';
import { useRoute, RouterView, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const keepAliveIncludes: Ref<string[]> = ref([]);

effect(() => {
  // 收集所有keepAlive为true的路由组件名称
  const routes = router
    .getRoutes()
    .filter(i => i.meta.keepAlive?.value)
    .map(i => i.components?.default)
    .filter(i => i?.constructor === Object)
    .map(i => i!.name || (i as { __name: string }).__name);
  keepAliveIncludes.value = routes;
});
</script>

<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="keepAliveIncludes">
      <component :is="Component" :key="route.name" />
    </KeepAlive>
  </RouterView>
</template>
