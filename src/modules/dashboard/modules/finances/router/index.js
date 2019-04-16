const RecordsAdd = () => import('./../views/RecordsAdd.vue')
const RecordsHome = () => import('./../views/RecordsHome.vue')

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
  }
]
