import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layouts/index.vue';
import i18n from '@/locales';
const { global } = i18n;
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/errorPage/401.vue'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true,
  },
];

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'Root',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/index/index.vue'),
        meta: {
          title: global.t('route.home'),
          icon: 'icon-home',
          affix: true,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/comp',
    component: Layout,
    name: 'Comp',
    meta: { title: global.t('route.components'), icon: 'icon-code' },
    children: [
      {
        path: '/element',
        name: 'ElementComp',
        component: () => import('@/views/element/index.vue'),
        meta: {
          title: global.t('route.eleComponents'),
          icon: 'icon-code',
        },
      },
      {
        path: '/iconPark',
        name: 'IconPark',
        component: () => import('@/views/icon/index.vue'),
        meta: {
          title: global.t('route.icons'),
          icon: 'icon-like',
        },
      },
      {
        path: '/chart',
        name: 'Chart',
        component: () => import('@/views/echarts/index.vue'),
        meta: {
          title: global.t('route.charts'),
          icon: 'icon-chart-line',
        },
        children: [
          {
            path: '/line',
            name: 'Line',
            component: () => import('@/views/echarts/line.vue'),
            meta: {
              title: global.t('route.lineChart'),
            },
          },
          {
            path: '/bar',
            name: 'Bar',
            component: () => import('@/views/echarts/bar.vue'),
            meta: {
              title: global.t('route.barChart'),
            },
          },
          {
            path: '/otherChart',
            name: 'OtherChart',
            component: () => import('@/views/echarts/other.vue'),
            meta: {
              title: global.t('route.mixedChart'),
            },
          },
        ],
      },
    ],
  },

  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true,
  // },
  {
    path: '/volunteerprogram',
    name: 'Volunteerprogram',
    component: Layout,
    meta: {
      title:"志愿项目",
      icon: 'icon-peoples',
    },
    children: [
      {
        path: '/volunteerprogram',
        name: 'Volunteerprogram',
        component: () => import('../views/volunteerprogram/volunteerprogram.vue'),
        meta: {
          title: "已过审",
          icon: 'icon-personal-collection',
        },
      },
      {
        path: '/programExamine',
        name: 'ProgramExamine',
        component: () => import('../views/volunteerprogram/programExamine.vue'),
        meta: {
          title: "待审批",
          icon: 'icon-people',
        },
      },
    ],
  },
  {
    path: '/volunteerteam',
    name: 'Volunteerteam',
    component: Layout,
    meta: {
      title:"志愿队伍",
      icon: 'icon-peoples',
    },
    children: [
      {
        path: '/volunteer',
        name: 'Volunteer',
        component: () => import('../views/volunteerteam/volunteerteam.vue'),
        meta: {
          title: "正式队员",
          icon: 'icon-personal-collection',
        },
      },
      {
        path: '/volunteerExamine',
        name: 'VolunteerExamine',
        component: () => import('../views/volunteerteam/volunteerExamine.vue'),
        meta: {
          title: "志愿者审核",
          icon: 'icon-people',
        },
      },
    ],
  },
  {
    path: '/userPage',
    name: 'UserPage',
    component: Layout,
    meta: {
      title: '个人中心',
      icon: 'icon-link-cloud-faild',
    },
    children: [
      {
        path: '/information',
        name: 'Information',
        component: () => import('@/views/user/information.vue'),
        meta: {
          title: '个人中心',
          icon: 'icon-link-cloud-faild',
        },
      },
    ],
  },


];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;
