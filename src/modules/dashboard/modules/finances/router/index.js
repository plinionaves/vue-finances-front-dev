const RecordsHome = () => import('./../views/RecordsHome.vue')

export default [
  {
    path: 'records',
    component: RecordsHome,
    meta: { requiresAuth: true },
    alias: ['home', '']
  }
]
