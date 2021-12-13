import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "convertermoeda" },
  },
  {
    path: "/convertermoeda",
    name: "convertermoeda",

    component: () =>
      import(
        /* webpackChunkName: "convertermoeda" */ "../views/convertermoeda.vue"
      ),
  },
  {
    path: "/consultarhistorico",
    name: "consultarhistorico",

    component: () =>
      import(
        /* webpackChunkName: "consultarhistorico" */ "../views/consultarhistorico.vue"
      ),
  },
  {
    path: "/dadoscotacao/:id",
    name: "dadoscotacao",

    component: () =>
      import(
        /* webpackChunkName: "dadoscotacao" */ "../views/dadoscotacao.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
