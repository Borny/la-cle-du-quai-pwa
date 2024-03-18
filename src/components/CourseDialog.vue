<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin dialog__card">
      <!-- HEADER -->
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">
          {{ mode === CREATE ? "Création" : "Edition" }} d'un cours
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <form class="column items-center form" @submit.prevent="onCreateClass">
          <q-input
            clearable
            type="text"
            v-model="dayOfWeekInput"
            label="Jours de la semaine"
            placeholder="Jours de la semaine"
            class="q-mb-sm control"
            :rules="[(val) => !!val || 'Ce champ est requis']"
          >
          </q-input>
          <q-input
            clearable
            type="text"
            placeholder="Horaires"
            label="Horaires"
            v-model="courseTimeInput"
            class="q-mb-sm control"
            :rules="[(val) => !!val || 'Ce champ est requis']"
          >
          </q-input>
          <q-input
            clearable
            type="text"
            placeholder="Nom"
            label="Nom"
            v-model="typeInput"
            class="q-mb-sm control"
            :rules="[(val) => !!val || 'Ce champ est requis']"
          >
          </q-input>
          <q-input
            clearable
            type="text"
            placeholder="Lieu"
            label="Lieu"
            v-model="locationInput"
            class="q-mb-sm control"
            :rules="[(val) => !!val || 'Ce champ est requis']"
          >
          </q-input>
          <q-input
            clearable
            type="number"
            placeholder="Ordre"
            label="Ordre"
            v-model="orderNumberInput"
            class="q-mb-sm control"
            :rules="[(val) => !!val || 'Ce champ est requis']"
          >
          </q-input>
          <!-- <q-input v-model="comment" filled type="textarea" maxlength="300" /> -->
          <!-- <div class="row justify-between q-mt-sm">
            <q-btn outline size="sm" color="warning" :disable="!deviceCommentUpdate.length" @click="onResetCommentData"
            label="Supprimer le commentaire" />
            <p>{{ deviceCommentUpdate.length }} / 300</p>
            </div> -->
        </form>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          v-if="mode !== 'CREATE'"
          unelevated
          color="warning"
          label="Supprimer"
          class="q-mr-sm"
          @click="confirmDialog = true"
        />
        <q-btn
          unelevated
          color="positive"
          :label="mode === 'CREATE' ? 'Créer' : 'Editer'"
          class="q-mr-sm"
          @click="onValidate"
        />
        <q-btn unelevated color="negative" label="Retour" @click="onCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- CONFIRM DIALOG -->
  <q-dialog
    v-model="confirmDialog"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card class="bg-negative text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6">Validation</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Etes-vous sûr de vouloir supprimer ce cours ? <br />
        <span
          >{{ typeInput }} - {{ locationInput }} - {{ dayOfWeekInput }}</span
        >
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat color="positive" label="Confirmer" @click="onDelete" />
        <q-btn flat color="negative" label="Retour" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import { useDialogPluginComponent } from "quasar";

export default {
  name: "CourseData",

  props: {
    mode: {
      type: String,
      required: false,
      default: "CREATE",
    },
    courseInfo: {
      type: Object,
      required: false,
    },
  },

  emits: [...useDialogPluginComponent.emits, "onDialogDelete"],

  setup(props, { emit }) {
    const CREATE = "CREATE";
    const EDIT = "EDIT";
    const DELETE = "DELETE";

    const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
      useDialogPluginComponent();

    const confirmDialog = ref(false);

    const courseId = ref("");
    const dayOfWeekInput = ref("");
    const courseTimeInput = ref("");
    const typeInput = ref("");
    const locationInput = ref("");
    const orderNumberInput = ref(null);

    const courseInfoToUpdate = ref(props.courseInfo);

    if (props.courseInfo && Object.keys(props.courseInfo).length) {
      const { id, dayOfWeek, courseTime, type, location, orderNumber } =
        courseInfoToUpdate.value;

      courseId.value = id;
      dayOfWeekInput.value = dayOfWeek;
      courseTimeInput.value = courseTime;
      typeInput.value = type;
      locationInput.value = location;
      orderNumberInput.value = orderNumber;
    }

    function onValidate() {
      const courseInputData = {
        dayOfWeek: dayOfWeekInput.value,
        courseTime: courseTimeInput.value,
        type: typeInput.value,
        location: locationInput.value,
        orderNumber: orderNumberInput.value,
      };

      if (props.mode === EDIT) courseInputData.id = courseId.value;

      onDialogOK(courseInputData);
    }

    function onDelete() {
      onDialogOK({ DELETE, courseId: courseId.value });
    }

    function onCancel() {
      onDialogCancel();
    }

    return {
      CREATE,
      EDIT,

      confirmDialog,
      dialogRef,
      onDialogHide,
      onValidate,
      onCancel,
      onDelete,

      courseId,
      dayOfWeekInput,
      courseTimeInput,
      typeInput,
      locationInput,
      orderNumberInput,
    };
  },
};
</script>

<style lang="scss" scoped>
// Dialog
.dialog__card {
  min-width: 320px;
  max-width: 500px;
  width: 100%;
}

.form-container {
  height: 100%;
  width: 100%;

  @media (min-width: $breakpoint-sm-min) {
    max-width: 500px;
    max-height: 500px;
  }
}

.control {
  width: 100%;
  max-width: 320px;
}

.label {
  position: absolute;
  top: 15px;
  left: 0;
}
</style>
