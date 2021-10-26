import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import helper from "../utils/helper";

Vue.use(VueRouter);

const checkUserAccess = (to, from, next) => {
  if (!helper.isEmpty(store.state.user.id)) {
    return next();
  } else {
    return next("/");
  }
};

const checkAdminAccess = (to, from, next) => {
  if (!helper.isEmpty(store.state.user.id) && store.state.user.isAdmin) {
    return next();
  } else {
    return next("/");
  }
};

const routes = [
  {
    path: "*",
    component: () => import("../views/Page404"),
  },
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/task",
    name: "Task",
    component: () => import("../views/Task.vue"),
    beforeEnter: checkUserAccess,
  },
  {
    path: "/location",
    name: "Location",
    component: () => import("../views/Location.vue"),
    beforeEnter: checkUserAccess,
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/User.vue"),
    beforeEnter: checkAdminAccess,
  },
  {
    path: "/user/:id",
    name: "UserDetail",
    component: () => import("../views/UserDetail.vue"),
    beforeEnter: checkAdminAccess,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
