import Vue from "vue";
import VueRouter from "vue-router";

/* User Page */
import UserLayout from "@/views/homepage/UserLayout.vue";
import DocumentDetail from "@/views/document/DocumentDetail.vue";

/* Admin Page */
import MainLayout from "@/views/admin/MainLayout.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import ActiveCode from "@/modules/active-code/ActiveCode.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: UserLayout,
    meta: {
      title: "Trang chủ",
    },
  },
  {
    path: "/document",
    name: "DocumentDetail",
    component: DocumentDetail,
    meta: {
      title: "Hồ sơ",
    },
  },
  {
    path: "/admin",
    component: MainLayout,
    meta: {
      title: "Trang chủ",
    },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
          title: "Trang chủ",
          auth: true,
        },
      },
      {
        path: "active-code",
        name: "Active Code",
        component: ActiveCode,
        meta: {
          title: "Quản lý mã kích hoạt",
          auth: true,
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
