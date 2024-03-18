<template>
  <q-page padding>
    <q-tabs
      v-model="tab"
      dense
      class="q-pt-md text-grey"
      active-color="white"
      indicator-color="negative"
      align="left"
      no-caps
      active-bg-color="primary"
    >
      <q-route-tab name="cours" label="Cours" active-color="white" active-bg-color="bg-primary" />
      <!-- <q-route-tab v-if="!isCriticalPoint" :to="{ hash: '#leakAnalysis' }" name="leakAnalysis" label="Leak Analysis" />
        <q-route-tab :to="{ hash: '#rawData' }" name="rawData" label="Raw Data" /> -->
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="cours">
        <div class="row" v-if="isLoading">
          <q-spinner-tail color="primary" size="2em" />
        </div>

        <q-btn v-if="!isLoading" @click="openCourseModal('CREATE')" color="primary">
          Ajouter un cours
        </q-btn>
        <!-- <q-table title="Treats" :rows="rows" :columns="tableHeader" row-key="name" /> -->

        <!-- COURSES TABLE -->
        <div class="q-mt-lg">
          <q-table
            title="Cours"
            :rows="courses"
            :columns="tableHeader"
            row-key="name"
            selection="single"
            v-model:selected="selectedCourse"
          />
        </div>

        <!-- CREATE COURSE DIALOG -->
        <course-dialog />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useCourseStore } from "../stores/course/course";
import { useAppStore } from "../stores/app/app";
import CourseDialog from "../components/CourseDialog.vue";

const CREATE = "CREATE";
const EDIT = "EDIT";

export default {
  name: "AdminPage",

  components: {
    CourseDialog,
  },

  setup() {
    const quasar = useQuasar();
    const courseStore = useCourseStore();
    const appStore = useAppStore();
    const tab = ref("cours");
    const isLoading = ref(false);
    const selectedCourse = ref([]);

    const courseDialogMode = ref(CREATE);

    const displayCourseDialog = ref(false);
    const displayEditCourseDialog = ref(false);

    const courses = ref([]);

    const tableHeader = [
      {
        name: "name",
        required: true,
        label: "Priorité",
        align: "left",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: true,
      },
      {
        name: "dayOfWeek",
        label: "Jour de la semaine",
        field: "dayOfWeek",
        sortable: true,
      },
      {
        name: "courseTime",
        label: "Horaires",
        field: "courseTime",
        sortable: true,
      },
      { name: "type", label: "Intitulé", field: "type" },
      { name: "location", label: "Lieu", field: "location" },
    ];

    watch(selectedCourse, (courseSelected, oldValue) => {
      if (courseSelected.length) {

        courseDialogMode.value = EDIT;

        const { id, name, dayOfWeek, courseTime, type, location } =
          selectedCourse.value[0];

        const courseInfo = {
          id,
          orderNumber: name,
          dayOfWeek,
          courseTime: courseTime,
          type,
          location,
        };

        openCourseModal(courseDialogMode, courseInfo);
      }
    });

    function init() {
      getCourses();
      appStore.$patch({ appTitle: "Admin" });
    }

    function openCourseModal(mode, courseInfo = {}) {
      quasar
        .dialog({
          component: CourseDialog,
          componentProps: {
            mode: mode.value,
            courseInfo,
          },
        })
        .onOk((courseData) => {

          if (courseData.DELETE) {
            onDeleteCourse(courseData.courseId);
            return;
          }

          if (courseDialogMode.value === CREATE) {
            onCreateCourse(courseData);
          }

          if (courseDialogMode.value === EDIT) {
            onUpdateCourse(courseData);
          }
        })
        .onDismiss(() => {
          selectedCourse.value = [];
        });
    }

    async function onDeleteCourse(id) {
      isLoading.value = true;

      try {
        const response = await courseStore.deleteCourse(id);

        if (!response) {
          quasar.notify({
            message: "Echec de la suppression du cours",
            color: "negative",
          });
        }

        init();

        quasar.notify({
          message: "Cours supprimé avec succès",
          color: "positive",
        });
      } catch (error) {
        console.error(error);
        quasar.notify({
          message: "Echec de la suppression du cours",
          color: "negative",
        });
      } finally {
        isLoading.value = false;
      }
    }

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
              name: order_number,
              dayOfWeek: day_of_week,
              courseTime: time,
              type,
              location: location,
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
        isLoading.value = false;
      }
    }

    // CREATE COURSE
    async function onCreateCourse(courseData) {
      isLoading.value = true;

      const { dayOfWeek, courseTime, type, location, orderNumber } = courseData;

      try {
        const response = await courseStore.createCourse(
          dayOfWeek,
          courseTime,
          type,
          location,
          orderNumber
        );

        if (!response) {
          quasar.notify({
            message: "Echec de la création du cours",
            color: "negative",
          });
        }

        init();

        quasar.notify({
          message: "Cours créé avec succès",
          color: "positive",
        });
      } catch (error) {
        console.error(error);
        quasar.notify({
          message: "Echec de la création du cours",
          color: "negative",
        });
      } finally {
        isLoading.value = false;
      }
    }

    async function onUpdateCourse(courseData) {
      isLoading.value = true;

      const { id, dayOfWeek, courseTime, type, location, orderNumber } =
        courseData;

      try {
        const response = await courseStore.updateCourse(
          id,
          dayOfWeek,
          courseTime,
          type,
          location,
          orderNumber
        );

        if (!response) {
          quasar.notify({
            message: "Echec de la modification du cours",
            color: "negative",
          });
        }

        init();

        quasar.notify({
          message: "Cours édité avec succès",
          color: "positive",
        });
      } catch (error) {
        console.error(error);
        quasar.notify({
          message: "Echec de la modification du cours",
          color: "negative",
        });
      } finally {
        isLoading.value = false;
      }
    }

    // INIT
    onMounted(async () => init());

    return {
      tab,
      isLoading,
      tableHeader,

      displayCourseDialog,
      displayEditCourseDialog,
      openCourseModal,
      onCreateCourse,

      courseDialogMode,
      selectedCourse,

      courses,
    };
  },
};
</script>
