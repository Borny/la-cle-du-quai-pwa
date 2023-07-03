<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          La Clé Du Quai
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          Essential Links
        </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />

        <q-item clickable tag="a" target="_blank" :href="link">
          <q-item-section v-if="icon" avatar>
            <q-icon :name="icon" />
          </q-item-section>

          <q-item-section>
            <q-btn @click="logout">Logout</q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useAuthStore } from "../stores/auth/auth";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: 'Home Page',
    caption: 'La Clé Du Quai Accueil',
    icon: 'school',
    link: '/'
  },
  {
    title: 'Logout',
    caption: 'Logout from app',
    icon: 'power',
    link: '/'
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const leftDrawerOpen = ref(false)


    function logout(){
      console.log('logout');
      authStore.logout()
      router.push('/')
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      logout
    }
  }
})
</script>
