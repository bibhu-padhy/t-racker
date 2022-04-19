const routes = [
  {
    path: "/",

    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "explore",
        name: "explore",
        component: () => import("pages/Explore.vue"),
      },
    ],
    redirect: "/explore",
  },
];

export default routes;
