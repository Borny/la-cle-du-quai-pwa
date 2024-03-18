<template>
  <q-page class="">
    <square-shape-svg :title="'La Clé Du Quai'"></square-shape-svg>
  </q-page>
</template>

<script>
import { onMounted, ref, defineComponent } from 'vue'
import { useHomeStore } from "../stores/home/home";
import { useAppStore } from "../stores/app/app";
import squareShapeSvg from 'src/components/square-shape-svg.vue';

export default defineComponent({
  name: 'IndexPage',

  components: { squareShapeSvg },

  setup() {
    const appStore = useAppStore();
    const homeStore = useHomeStore();
    const data = ref(null)

    function init() {
      appStore.$patch({ appTitle: "Accueil" });
    }

    onMounted(async () => {
      init();
    });

    async function getData() {

      try {

        data.value = await homeStore.getData()

      } catch (error) {
        console.log('failed to get data');
      }
    }

    return {
      data,
      getData,
    }
  }
})
</script>
