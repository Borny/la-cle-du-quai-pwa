<template>
  <q-layout view="lHr Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ appStore.appTitle }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      class="bg-primary text-white"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      side="right"
    >
      <q-list>
        <!-- <q-item-label header>
          Essential Links
        </q-item-label> -->

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <q-list v-if="authStore.isAuthenticated" class="absolute-bottom">
        <q-item clickable tag="a" to="/admin">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Admin page</q-item-label>
            <q-item-label caption>Admin page</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" :to="link">
          <q-item-section v-if="icon" avatar>
            <q-icon :name="icon" />
          </q-item-section>

          <q-item-section>
            <q-btn color="negative" @click="logout">Logout</q-btn>
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
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useAuthStore } from "../stores/auth/auth";
import { useAppStore } from "../stores/app/app";
import { useRouter } from "vue-router";

const linksList = [
  {
    title: "Accueil",
    icon: "home",
    link: "/",
  },
  {
    title: "Cours",
    icon: "emoji_people",
    link: "/cours",
  },
  {
    title: "Stages",
    icon: "emoji_people",
    link: "/stages",
  },
  {
    title: "Actions Artistiques",
    icon: "emoji_people",
    link: "/actions-artistiques",
  },
  {
    title: "Accueil en résidence",
    icon: "emoji_people",
    link: "/accueil-en-residence",
  },
  {
    title: "Galerie",
    icon: "emoji_people",
    link: "/galerie",
  },
  {
    title: "Admin Login",
    caption: "Admin login",
    icon: "key",
    link: "/admin-login",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const authStore = useAuthStore();
    const appStore = useAppStore();
    const router = useRouter();

    const leftDrawerOpen = ref(false);

    function logout() {
      console.log("logout");
      authStore.logout();
      router.push("/");
    }

    return {
      appStore,
      authStore,
      essentialLinks: linksList,

      // TODO: get rid of this
      link: null,
      icon: null,
      // TODO: end get rid of this

      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logout,
    };
  },
});
</script>
