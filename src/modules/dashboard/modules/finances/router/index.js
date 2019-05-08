const RecordsAdd = () => import('./../views/RecordsAdd.vue')
const RecordsHome = () => import('./../views/RecordsHome.vue')
const ReportsHome = () => import('./../views/ReportsHome.vue')

export default [
  {
    path: 'records',
    component: RecordsHome,
    meta: { requiresAuth: true },
    alias: ['home', '']
  },
  {
    path: 'records/add',
    component: RecordsAdd,
    meta: { requiresAuth: true },
    name: 'recordsAdd'
  },
  {
    path: 'reports',
    component: ReportsHome,
    meta: { requiresAuth: true }
  }
]
