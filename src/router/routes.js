const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("../pages/HomePage.vue"),
        children: [
          {
            path: "/dashboard/:id",
            component: () => import("../pages/AssetsDetailsPage.vue"),
          },
          {
            path: "/dashboard/report",
            name: "report",
            component: () => import("../pages/ReportPage.vue"),
          },
        ],
      },
      {
        path: "/explore",
        name: "explore",
        component: () => import("pages/Explore.vue"),
      },
      {
        path: "/report",
        name: "mobile-report",
        component: () => import("../pages/ReportPage.vue"),
      },
    ],
  },
  {
    path: "/auth",
    name: "auth",
    component: () => import("pages/Auth.vue"),
  },
];

export default routes;
