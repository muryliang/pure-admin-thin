export default {
  path: "/authority",
  redirect: "/authority/index",
  meta: {
    icon: "informationLine",
    title: "Authority",
    // showLink: false,
    rank: 10
  },
  children: [
    {
      path: "/authority/index",
      name: "Authority",
      component: () => import("@/views/authority/index.vue"),
      meta: {
        title: "overview",
        showParent: true
      }
    }
  ]
} as RouteConfigsTable;
