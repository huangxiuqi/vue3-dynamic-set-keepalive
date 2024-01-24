import { createRouter, createWebHashHistory } from 'vue-router';
import { createRouterGuard } from './guard';
import LayoutComponent from '../layout/LayoutComponent.vue';
import ListView from '../views/ListView.vue';
import DetailSubView from '../views/DetailSubView.vue';
import { Ref, ref } from 'vue';

declare module 'vue-router' {
  interface RouteMeta {
    keepAlive?: Ref<boolean>;
  }
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: LayoutComponent,
      children: [
        {
          path: '',
          name: 'list',
          component: ListView,
        },
        {
          path: 'detail',
          name: 'detail',
          component: () => import('../views/DetailView.vue'),
          meta: {
            keepAlive: ref(false),
          },
        },
        {
          path: 'detail/sub',
          name: 'detail-sub',
          component: DetailSubView,
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default createRouterGuard(router);
