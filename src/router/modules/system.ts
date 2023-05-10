export default {
  path: "/system",
  redirect: "/system/index",
  meta: {
    icon: "informationLine",
    title: "System",
    // showLink: false,
    rank: 9
  },
  children: [
    {
      path: "/system/index",
      name: "SystemOverview",
      component: () => import("@/views/system/index.vue"),
      meta: {
        title: "overview",
        showParent: true
      }
    }
  ]
} as RouteConfigsTable;
