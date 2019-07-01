import Vue from "vue";
import Router from "vue-router";
import store from "./store";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Index",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Index.vue")
    },
    {
      path: "/categories",
      name: "Categories",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Categories.vue")
    },
    {
      path: "/shoppingcart",
      name: "ShoppingCart",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/ShoppingCart.vue"),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/my",
      name: "My",
      component: () => import(/* webpackChunkName: "about" */ "./views/My.vue"),
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/signin",
      name: "SignIn",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/SignIn.vue")
    },
    {
      path: "/signup",
      name: "SignUp",
      component: () => import("./views/SignUp.vue")
    }
  ]
});

//路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next();
    } else {
      next({
        path: "/signin",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

export default router;
