import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), name: 'login', hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/', component: Layout, name: '首页', hidden: true,
    children: [
      { path: 'index', component: () => import('@/views/index/index'), meta: { title: '首页', icon: 'index' }}
    ]
  },
  {
    path: '/index', component: Layout, redirect: '/work_order', name: '首页',
    children: [
      { path: 'index', component: () => import('@/views/index/index'), meta: { title: '首页', icon: 'index' }}
    ]
  },
  {
    path: '/statistics', component: Layout, redirect: 'noredirect', name: '统计中心', meta: { title: '统计中心', icon: 'stats' },
    children: [
      { path: 'project', name: '项目统计', component: () => import('@/views/statistics/project'), meta: { title: '项目统计', icon: 'project' }},
      { path: 'task', name: '作业统计', component: () => import('@/views/statistics/task'), meta: { title: '作业统计', icon: 'task' }},
      { path: 'report', name: '日报统计', component: () => import('@/views/statistics/report'), meta: { title: '日报统计', icon: 'report' }},
      { path: 'member', name: '人员统计', component: () => import('@/views/statistics/member'), meta: { title: '人员统计', icon: 'member' }},
      { path: 'customer', name: '客户统计', component: () => import('@/views/statistics/customer'), meta: { title: '客户统计', icon: 'customer' }}
    ]
  },
  {
    path: '/worker_order', component: Layout, redirect: 'noredirect', name: '工单中心', meta: { title: '工单中心', icon: 'work' },
    children: [
      { path: 'list', name: '工单列表', component: () => import('@/views/worker_order/list'), meta: { title: '我的工单', icon: 'mywork' }},
      { path: 'design', name: 'design', component: () => import('@/views/worker_order/design'), hidden: true },
      { path: 'design_info', name: '查看工单', component: () => import('@/views/worker_order/design_info'), hidden: true },
      { path: 'copywriter', name: '新建文案工单', component: () => import('@/views/worker_order/copywriter'), hidden: true },
      { path: 'technical_order', name: '新建技术工单', component: () => import('@/views/worker_order/technical_order'), hidden: true }
    ]
  },
  {
    path: '/daily', component: Layout, name: '日报中心', meta: { title: '日报中心', icon: 'daily' },
    children: [
      { path: 'monthly', name: '月度总览', component: () => import('@/views/daily/monthly'), meta: { title: '月度总览', icon: 'monthly' }},
      { path: 'dailylist', name: '日报列表', component: () => import('@/views/daily/dailylist'), meta: { title: '日报列表', icon: 'dailylist' }},
      { path: 'submitdaily', name: '提交日报', component: () => import('@/views/daily/submitdaily'), meta: { title: '提交日报', icon: 'submitdaily' }}
    ]
  },
  {
    path: '/staff', component: Layout, redirect: 'noredirect', name: '人员管理', meta: { title: '人员管理', icon: 'staff' },
    children: [
      { path: 'stafflist', name: '人员列表', component: () => import('@/views/staff/stafflist'), meta: { title: '人员列表', icon: 'stafflist' }},
      { path: 'userInfo', name: '查看用户', component: () => import('@/views/staff/userInfo'), hidden: true },
      { path: 'grouping', name: '部门分组', component: () => import('@/views/staff/grouping'), meta: { title: '部门分组', icon: 'grouping' }},
      { path: 'roles', name: '角色管理', component: () => import('@/views/staff/roles'), meta: { title: '角色管理', icon: 'role' }}
    ]
  },
  {
    path: '/provider', component: Layout, name: '供应商管理', meta: { title: '供应商管理', icon: 'provider' },
    children: [
      { path: 'providerlist', name: '供应商列表', component: () => import('@/views/provider/providerlist'), meta: { title: '供应商列表', icon: 'providerlist' }},
      { path: 'entering', name: '供应商录入', component: () => import('@/views/provider/entering'), meta: { title: '供应商录入', icon: 'entering' }},
      { path: 'statistical', name: '供应商统计', component: () => import('@/views/provider/statistical'), meta: { title: '供应商统计', icon: 'statistical' }}
    ]
  },
  {
    path: '/settings', component: Layout, name: '设置', meta: { title: '设置', icon: 'settings' },
    children: [
      { path: 'customerset', name: '客户设置', component: () => import('@/views/settings/customerset'), meta: { title: '客户设置', icon: 'customerset' }},
      { path: 'typeset', name: '类型设置', component: () => import('@/views/settings/typeset'), meta: { title: '类型设置', icon: 'typeset' }},
      { path: 'positionset', name: '职位设置', component: () => import('@/views/settings/positionset'), meta: { title: '职位设置', icon: 'positionset' }},
      { path: 'systemset', name: '系统设置', component: () => import('@/views/settings/systemset'), meta: { title: '系统设置', icon: 'systemset' }}
    ]
  },
  {
    path: '/system', component: Layout, name: '系统', nochildren: true, meta: { title: '系统', icon: 'system' },
    children: [
      { path: 'system', name: '系统', component: () => import('@/views/system/index'), meta: { title: '系统', icon: 'system' }}
    ]
  },
  // {
  //   path: '/stats',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'stats',
  //       name: '统计中心',
  //       component: () => import('@/views/stats/index'),
  //       meta: { title: '统计中心', icon: 'stats' }
  //     }
  //   ]
  // },
  // {
  //   path: '/work',
  //   component: Layout,
  //   redirect: '/work/mywork',
  //   name: 'work',
  //   meta: { title: '工单中心', icon: 'work' },
  //   children: [
  //     {
  //       path: 'mywork',
  //       name: 'mywork',
  //       component: () => import('@/views/mywork/index'),
  //       meta: { title: '我的工单', icon: 'mywork' }
  //     },
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/daily',
  //   component: Layout,
  //   redirect: '/daily/monthly',
  //   name: 'daily',
  //   meta: { title: '日报中心', icon: 'daily' },
  //   children: [
  //     {
  //       path: 'monthly',
  //       name: 'monthly',
  //       component: () => import('@/views/monthly/index'),
  //       meta: { title: '月度总览', icon: 'monthly' }
  //     },
  //     {
  //       path: 'dailylist',
  //       name: 'dailylist',
  //       component: () => import('@/views/dailylist/index'),
  //       meta: { title: '日报列表', icon: 'dailylist' }
  //     },
  //     {
  //       path: 'submitdaily',
  //       name: 'submitdaily',
  //       component: () => import('@/views/submitdaily/index'),
  //       meta: { title: '提交日报', icon: 'submitdaily' }
  //     }
  //   ]
  // },
  // {
  //   path: '/staff',
  //   component: Layout,
  //   redirect: '/staff/allstaff',
  //   name: 'staff',
  //   meta: { title: '人员管理', icon: 'staff' },
  //   children: [
  //     {
  //       path: 'allstaff',
  //       name: 'allstaff',
  //       component: () => import('@/views/allstaff/index'),
  //       meta: { title: '所有人员', icon: 'allstaff' }
  //     },
  //     {
  //       path: 'grouping',
  //       name: 'grouping',
  //       component: () => import('@/views/grouping/index'),
  //       meta: { title: '部门分组', icon: 'grouping' }
  //     },
  //     {
  //       path: 'role',
  //       name: 'role',
  //       component: () => import('@/views/role/index'),
  //       meta: { title: '角色管理', icon: 'role' }
  //     }
  //   ]
  // },
  // {
  //   path: '/provider',
  //   component: Layout,
  //   redirect: '/provider/providerlist',
  //   name: 'provider',
  //   meta: { title: '供应商管理', icon: 'provider' },
  //   children: [
  //     {
  //       path: 'providerlist',
  //       name: 'providerlist',
  //       component: () => import('@/views/providerlist/index'),
  //       meta: { title: '供应商列表', icon: 'providerlist' }
  //     },
  //     {
  //       path: 'entering',
  //       name: 'entering',
  //       component: () => import('@/views/entering/index'),
  //       meta: { title: '供应商录入', icon: 'entering' }
  //     },
  //     {
  //       path: 'statistical',
  //       name: 'statistical',
  //       component: () => import('@/views/statistical/index'),
  //       meta: { title: '供应商统计', icon: 'statistical' }
  //     }
  //   ]
  // },
  // {
  //   path: '/settings',
  //   component: Layout,
  //   redirect: '/settings/tempset',
  //   name: 'settings',
  //   meta: { title: '设置', icon: 'settings' },
  //   children: [
  //     {
  //       path: 'tempset',
  //       name: 'tempset',
  //       component: () => import('@/views/tempset/index'),
  //       meta: { title: '模板设置', icon: 'tempset' }
  //     },
  //     {
  //       path: 'customerset',
  //       name: 'customerset',
  //       component: () => import('@/views/customerset/index'),
  //       meta: { title: '客户设置', icon: 'customerset' }
  //     },
  //     {
  //       path: 'workset',
  //       name: 'workset',
  //       component: () => import('@/views/workset/index'),
  //       meta: { title: '工单设置', icon: 'workset' }
  //     },
  //     {
  //       path: 'dailyset',
  //       name: 'dailyset',
  //       component: () => import('@/views/dailyset/index'),
  //       meta: { title: '日报设置', icon: 'dailyset' }
  //     },
  //     {
  //       path: 'positionset',
  //       name: 'positionset',
  //       component: () => import('@/views/positionset/index'),
  //       meta: { title: '职位设置', icon: 'positionset' }
  //     }
  //   ]
  // },
  // {
  //   path: '/system',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'system',
  //       name: 'system',
  //       component: () => import('@/views/system/index'),
  //       meta: { title: '系统', icon: 'system' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

