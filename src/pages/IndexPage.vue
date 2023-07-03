<template>
  <q-page class="flex flex-center">
    <h1>Home page</h1>
    <q-btn class="q-mt-xl" color="white" text-color="blue" unelevated to="/admin-login" label="Admin login" no-caps />

    <q-btn class="q-mt-xl" color="secondary" fill label="Get data" @click="getData" />

    <div>{{ data }}</div>
  </q-page>
</template>

<script>
import { ref, defineComponent } from 'vue'
import { useHomeStore } from "../stores/home/home";

export default defineComponent({
  name: 'IndexPage',

  setup() {

    const homeStore = useHomeStore();
    const data = ref(null)

    async function getData() {

      try {

        data.value = await homeStore.getData()

      } catch (error) {
        console.log('failed to get data');
      }
    }

    return {
      data,
      getData
    }
  }
})
</script>
