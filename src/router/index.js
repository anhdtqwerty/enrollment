import Vue from "vue";
import VueRouter from "vue-router";

/* User Page */
import UserLayout from "@/views/homepage/UserLayout.vue";
import Home from "@/views/homepage/Home.vue";
import DocumentDetail from "@/views/document/DocumentDetail.vue";

/* Admin Page */
import MainLayout from "@/views/admin/MainLayout.vue";
import UserManagement from "@/views/admin/UserManagement.vue";
import AdminSigninDialog from "@/views/admin/AdminSigninDialog.vue";
import Dashboard from "@/views/admin/Dashboard.vue";
import ActiveCode from "@/modules/active-code/ActiveCode.vue";
import Document from "@/modules/cv/admin/Document.vue";
import Grade6ExamResult from "@/modules/cv/admin/Grade6ExamResult.vue";
import Grade10ExamResult from "@/modules/cv/admin/Grade10ExamResult.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: UserLayout,
    meta: {
      title: "Trang chủ",
    },
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
          title: "Hồ sơ",
        },
      },
      {
        path: "/document/:id",
        name: "DocumentDetail",
        component: DocumentDetail,
        meta: {
          title: "Hồ sơ",
        },
      },
    ],
  },
  {
    path: "/admin/signin",
    component: AdminSigninDialog,
    meta: {
      title: "Đăng nhập",
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
        path: "user",
        name: "User Management",
        component: UserManagement,
        meta: {
          title: "Quản lý tài khoản",
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
      {
        path: "document",
        name: "Document",
        component: Document,
        meta: {
          title: "Quản lý hồ sơ",
          auth: true,
        },
      },
      {
        path: "grade6-result",
        name: "Grade6ExamResult",
        component: Grade6ExamResult,
        meta: {
          title: "Kết quả thi Khối 6",
          auth: true,
        },
      },
      {
        path: "grade10-result",
        name: "Grade10ExamResult",
        component: Grade10ExamResult,
        meta: {
          title: "Kết quả thi Khối 10",
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
