<template>
  <q-page>
    <square-shape-svg :title="'Programme des ateliers hebdomadaires'"></square-shape-svg>

    <div class="row" v-if="isLoading">
      <q-spinner-tail color="primary" size="2em" />
    </div>
    <!-- COURS -->
    <p
      class="text-h1 text-primary-dark text-h4 font-oswald text-center q-pa-xl"
    >
      Programme des ateliers hebdomadaires
    </p>

    <q-card v-if="!isLoading">
      <q-card-section class="row">
        <!-- MARDI -->
        <div class="col-4 column">
          <p class="text-primary text-weight-bold text-h6 q-mb-sm">Mardi</p>

          <p class="text-weight-bold text-primary q-mb-xs">
            Danse contemporaine - Impro
          </p>
          <div class="row">
            <p class="text-primary col-4">Horaires</p>
            <p class="col-8">18h30 - 20h30</p>
          </div>
          <div class="row justify-between">
            <p class="text-primary col-4">Lieu</p>
            <p class="col-8">Studio 71</p>
          </div>

          <p class="text-weight-bold text-primary q-mb-xs">Danse-théâtre</p>
          <div class="row">
            <p class="text-primary col-4">Horaires</p>
            <p class="col-8">20h30 - 22h30</p>
          </div>
          <div class="row">
            <p class="text-primary col-4">Lieu</p>
            <p class="col-8">Studio 71</p>
          </div>
        </div>

        <!-- MERCREDI -->
        <div class="col-4 column">
          <p class="text-primary text-weight-bold text-h6 q-mb-sm">Mercredi</p>

          <p class="text-weight-bold text-primary q-mb-xs">
            Danse contemporaine - Impro
          </p>
          <div class="row">
            <p class="text-primary col-4">Horaires</p>
            <p class="col-8">18h30 - 20h30</p>
          </div>
          <div class="row justify-between">
            <p class="text-primary col-4">Lieu</p>
            <p class="col-8">A déterminer</p>
          </div>

          <p class="text-weight-bold text-primary q-mb-xs">
            Danse contemporaine - écriture chorégraphique
          </p>
          <div class="row">
            <p class="text-primary col-4">Horaires</p>
            <p class="col-8">20h30 - 22h30</p>
          </div>
          <div class="row">
            <p class="text-primary col-4">Lieu</p>
            <p class="col-8">A déterminer</p>
          </div>
        </div>

        <!-- VENDREDI -->
        <div class="col-4 column">
          <p class="text-primary text-weight-bold text-h6 q-mb-sm">Vendredi</p>

          <p class="text-weight-bold text-primary q-mb-xs">
            Danse contemporaine - Impro
          </p>
          <div class="row">
            <p class="text-primary col-4">Horaires</p>
            <p class="col-8">18h30 - 20h30</p>
          </div>
          <div class="row justify-between">
            <p class="text-primary col-4">Lieu</p>
            <p class="col-8">SORE</p>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- TARIFS -->
    <p
      class="text-h1 text-primary-dark text-h4 font-oswald text-center q-pa-xl"
    >
      Tarifs des ateliers hebdomadaires
    </p>
    <q-card v-if="!isLoading">
      <q-card-section>
        <div class="row">
          <p class="col-4">Nombre de cours</p>
          <p class="col-2">1</p>
          <p class="col-2">2</p>
          <p class="col-2">3</p>
          <p class="col-2">4</p>
        </div>
        <q-separator />

        <div class="row">
          <p class="col-4">Tarif (à l'année)</p>
          <p class="col-2">430€</p>
          <p class="col-2">
            774€ <strong class="text-primary-dark">(-20%)</strong>
          </p>
          <p class="col-2">
            1075€ <strong class="text-primary-dark">(-30%)</strong>
          </p>
          <p class="col-2">
            1333€ <strong class="text-primary-dark">(-40%)</strong>
          </p>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { onMounted, ref } from "vue";
import { useAppStore } from "../stores/app/app";
import { useCourseStore } from "../stores/course/course";
import squareShapeSvg from 'src/components/square-shape-svg.vue';

export default {
  name: "CoursesPage",

  components: { squareShapeSvg },

  setup() {
    const appStore = useAppStore();
    const courseStore = useCourseStore();

    const isLoading = ref(false);
    const courses = ref([]);

    // GET COURSES
    async function getCourses() {
      isLoading.value = true;

      try {
        const coursesData = await courseStore.getCourses();

        if (!coursesData) {
          quasar.notify({
            message: "Echec de la requête des cours",
            color: "negative",
          });
        }

        courses.value = [];

        coursesData.forEach(
          ({ id, type, day_of_week, time, location, order_number }) => {
            const classItem = {
              id,
              orderNumber: order_number,
              dayOfWeek: day_of_week,
              courseTime: time,
              type,
              location,
            };

            courses.value.push(classItem);
          }
        );
      } catch (error) {
        console.error(error, "Could not get the courses");

        quasar.notify({
          message: "Echec de la requête des cours",
          color: "negative",
        });
      } finally {
        console.log('finally');
        isLoading.value = false;
      }
    }

    function init() {
      appStore.$patch({ appTitle: "Cours" });
      getCourses();
    }

    onMounted(async () => {
      init();
    });

    return {
      isLoading,
      courses,
    };
  },
};
</script>
<style lang="scss" scoped>
.schedule__block {
  width: 250px;
}
</style>
