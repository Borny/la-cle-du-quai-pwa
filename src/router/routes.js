
const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // meta: {requiresAuth: true},
    children: [
      { path: '/home', component: () => import('pages/IndexPage.vue') },
      { path: '/admin',
        component: () => import('pages/AdminPage.vue'),
        meta: {requiresAuth: true}
      },
    ]
  },

  // Log in
  {
    path: '/admin-login',
    component: () => import('pages/AdminLogin.vue'),
    meta: {requiresUnAuth: true}
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
