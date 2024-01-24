import type { Router } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    keepAlive?: boolean;
    beforeRouteEnter?: (
      router: Router,
      to: RouteLocationNormalized,
      from: RouteLocationNormalized
    ) => void;
  }
}

export const createRouterGuard = (router: Router): Router => {
  router.beforeEach((to, from) => {
    from.meta.beforeRouteEnter?.(router, to, from);
    to.meta.beforeRouteEnter?.(router, to, from);
    return true;
  });

  return router;
};
