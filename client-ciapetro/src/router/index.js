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
    meta: { title: "Conversao" },

    component: () =>
      import(
        /* webpackChunkName: "convertermoeda" */ "../views/convertermoeda.vue"
      ),
  },
  {
    path: "/consultarhistorico",
    name: "consultarhistorico",
    meta: { title: "Historico" },

    component: () =>
      import(
        /* webpackChunkName: "consultarhistorico" */ "../views/consultarhistorico.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
