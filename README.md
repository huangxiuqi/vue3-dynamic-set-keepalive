# Vue3 动态修改 KeepAlive

## 应用场景

当从列表页进入详情页时，重新实例化详情页，当从详情页进入子页面时，缓存详情页，例如

/list -> /detail 时重新实例化 DetailView

/detail -> /detail/sub 时缓存 DetailView

但是不能处理嵌套，即 /detail -> /detail/sub -> /detail 的情况，暂时没有这个需求，不考虑了。

## 实现原理

关键点是路由配置 meta 里的 keepAlive 字段设置为响应式，参考 src/router/router.ts

```javascript
{
   path: 'detail',
   name: 'detail',
   component: () => import('../views/DetailView.vue'),
   meta: {
      keepAlive: ref(false),
   },
},
```

这样当 keepAlive 字段变动时，可以通过 effect 监听到

再使用 effect 收集所有 keepAlive 为 true 的路由组件名称，然后传给 KeepAlive 组件即可，参考 src/layout/LayoutComponent.vue

```javascript
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
```

```html
<RouterView v-slot="{ Component }">
  <KeepAlive :include="keepAliveIncludes">
    <component :is="Component" :key="route.name" />
  </KeepAlive>
</RouterView>
```

在 DetailView 页面动态修改 keepAlive，参考 src/views/DetailView.vue

```javascript
const router = useRouter();
onBeforeRouteLeave(to => {
  router.getRoutes().forEach(item => {
    if (item.name === 'detail' && item.meta.keepAlive) {
      // 前往DetailSub页面，缓存Detail页面，否则取消缓存
      item.meta.keepAlive.value = to.name === 'detail-sub';
    }
  });
});
```
