import type { Router } from 'vue-router';

export const createRouterGuard = (router: Router): Router => {
  router.beforeEach((to, from) => {
    // TODO 路由守卫
    return true;
  });

  return router;
};
