<template>
  <!-- TODO: set it up => v-if="mode === 'admin' && authStore.isAuthenticated" -->
  <q-item
    clickable
    tag="a"
    :to="link"
  >
    <!-- target="_blank" -->
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "../stores/auth/auth";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },
    mode: {
      type: String,
      default: "",
    },
  },

  setup() {
    const authStore = useAuthStore();

    return {
      authStore,
    };
  },
});
</script>
