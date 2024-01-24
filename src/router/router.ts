import { createRouter, createWebHashHistory } from 'vue-router';
import { createRouterGuard } from './guard';
import LayoutComponent from '../layout/LayoutComponent.vue';
import ListView from '../views/ListView.vue';
import DetailView from '../views/DetailView.vue';
import DetailSubView from '../views/DetailSubView.vue';

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
          meta: {
            keepAlive: true,
          },
        },
        {
          path: 'detail',
          name: 'detail',
          component: DetailView,
          meta: {
            keepAlive: true,
            beforeRouteEnter(router, to, from) {
              console.log(to);
              router.getRoutes().forEach((item) => {
                if (item.name === 'detail') {
                  item.meta.keepAlive = to.name === 'detail-sub';
                }
              });
            },
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
