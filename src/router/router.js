import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "首页",
        showFooter: true
      }
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    },
    {
      path: "/membership",
      name: "membership",
      component: () => import("../views/Membership_center.vue"),
      meta: {
        title: "会员中心",
        showFooter: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login/Login.vue"),
      meta: {
        title: "登录/注册",
        showFooter: false
      }
    }
  ]
});
router.beforeEach((to,from,next) => {
  next()
  if (to.meta.title) {
    document.title = to.meta.title
  }
})
export default router
