<script setup lang="ts">
import { KeepAlive, ref, watch } from 'vue';
import { useRoute, RouterView } from 'vue-router';

const route = useRoute();
</script>

<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <component
        :is="Component"
        v-if="route.meta.keepAlive"
        :key="route.name"
      />
    </KeepAlive>
    <component :is="Component" v-if="!route.meta.keepAlive" :key="route.name" />
  </RouterView>
</template>
