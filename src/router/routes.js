
const routes = [
  {
    path: '/',
    redirect: '/accueil',
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // meta: {requiresAuth: true},
    children: [
      { path: '/accueil', component: () => import('pages/IndexPage.vue') },
      { path: '/cours', component: () => import('pages/CoursesPage.vue') },
      { path: '/stages', component: () => import('pages/StagesPage.vue') },
      { path: '/actions-artistiques', component: () => import('pages/ActionsArtistiquesPage.vue') },
      { path: '/accueil-en-residence', component: () => import('pages/ResidencePage.vue') },
      { path: '/galerie', component: () => import('pages/GalleryPage.vue') },
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
