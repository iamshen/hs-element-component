import { createRouter, createWebHistory } from 'vue-router'

import FormView from '~/views/Form/index.vue'
import TableView from '~/views/Table/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/table?terminalCode=851720169442079',
    displayName: 'dashboard',
    name: 'dashboard',
  },
  { path: '/form', component: FormView },
  { path: '/table', component: TableView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
