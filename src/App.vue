<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useAuthStore } from './stores/auth/auth';
import { api } from "boot/axios";
import router from './router';

export default defineComponent({
  name: 'App',
  setup() {
    const authStore = useAuthStore()

    api.interceptors.response.use((response) => response, (error) => {
      console.error(error)
      if (error.response.data.statusCode === 401 && error.response.data.message === 'invalidToken') {
        authStore.logout();
        window.location.reload()
      }

      return Promise.reject(error)
    })

    router.beforeEach((to, from, next) => {

      console.log({to});
      console.log(to.meta.requiresAuth, authStore.isAuthenticated);
      if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        console.log('If beforeEach');
        next('/admin-login');
      } else {
        // console.log('ELSE beforeEach');
        next();
      }
    });

    authStore.autoLogin();
  }
})
</script>
