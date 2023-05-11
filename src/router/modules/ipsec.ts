export default {
  path: "/ipsec",
  redirect: "/ipsec/index",
  meta: {
    icon: "informationLine",
    title: "Ipsec",
    // showLink: false,
    rank: 10
  },
  children: [
    {
      path: "/ipsec/index",
      name: "IpsecOverview",
      component: () => import("@/views/ipsec/index.vue"),
      meta: {
        title: "ipsec overview",
        showParent: true
      }
    }
  ]
} as RouteConfigsTable;
