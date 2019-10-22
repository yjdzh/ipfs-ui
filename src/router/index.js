import Vue from 'vue'
import VueRouter from 'vue-router'
import iView from 'iview'
import Util from '../common/util'
import {routers, appRouter, error401} from './router'

Vue.use(VueRouter)

const RouterConfig = {
  // mode: 'history',
  routes: routers,
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  Util.title(to.meta.title)
  if (Util.session.get('wtcp-lock-state') === 1 && to.name !== 'Locking') {
    next({
      replace: true,
      name: 'Locking'
    });
  } else if (Util.session.get('wtcp-lock-state') === 0 && to.name === 'Locking') {
    next(false);
  } else {
    next()
  }
})

router.afterEach((to) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
})

export default router
