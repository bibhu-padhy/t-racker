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
  },
  {
    path: "/auth",
    component: () => import("pages/Auth.vue"),
  },
];

export default routes;
