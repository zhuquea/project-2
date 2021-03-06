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
    },
    {
      path: "/classification",
      name: "classification",
      component: () => import("../views/Classification.vue"),
      meta: {
        title: "商品分类",
        showFooter: true
      }
    },
    {
      path: "/details",
      name: "details",
      component: () => import("../views/details/Details.vue"),
      meta: {
        title: "商品详情",
        showFooter: false
      }
    },
    {
      path: "/personal",
      name: "personal",
      component: () => import("../views/personalData/PersonalData.vue"),
      meta: {
        title: "个人资料",
        showFooter: false
      }
    },
    {
      path: "/orderSettlement",
      name: "orderSettlement",
      component: () => import("../views/order_settlement/OrderSettlement.vue"),
      meta: {
        title: "订单结算",
        showFooter: false
      }
    },
    {
      path: "/addressList",
      name: "addressList",
      component: () => import("../views/addressList/AddressList.vue"),
      meta: {
        title: "地址列表",
        showFooter: false
      }
    },
    {
      path: "/editAddress",
      name: "editAddress",
      component: () => import("../views/editAddress/EditAddress.vue"),
      meta: {
        title: "编辑地址",
        showFooter: false
      }
    },
    {
      path: "/shoppingCart",
      name: "shoppingCart",
      component: () => import("../views/shoppingCart/ShoppingCart.vue"),
      meta: {
        title: "购物车",
        showFooter: true
      }
    },
    {
      path: "/evaluation",
      name: "evaluation",
      component: () => import("../views/evaluation_Center/EvaluationCenter.vue"),
      meta: {
        title: "评价中心",
        showFooter: false
      }
    },
    {
      path: "/myCollection",
      name: "myCollection",
      component: () => import("../views/myCollection/MyCollection.vue"),
      meta: {
        title: "我的收藏",
        showFooter: false
      }
    },
    {
      path: "/orderQuery",
      name: "orderQuery",
      component: () => import("../views/orderQuery/OrderQuery.vue"),
      meta: {
        title: "我的订单",
        showFooter: false
      }
    },
    {
      path: "/toEvaluate",
      name: "toEvaluate",
      component: () => import("../views/toEvaluate/ToEvaluate.vue"),
      meta: {
        title: "评价商品",
        showFooter: false
      }
    },
    {
      path: "/evaluateDetails",
      name: "evaluateDetails",
      component: () => import("../views/evaluateDetails/EvaluateDetails.vue"),
      meta: {
        title: "评价详情",
        showFooter: false
      }
    },
    {
      path: "/recentBrowsing",
      name: "recentBrowsing",
      component: () => import("../views/recentBrowsing/RecentBrowsing.vue"),
      meta: {
        title: "最近浏览",
        showFooter: false
      }
    },
    {
      path: "/cityList",
      name: "cityList",
      component: () => import("../views/cityList/CityList.vue"),
      meta: {
        title: "城市列表",
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
