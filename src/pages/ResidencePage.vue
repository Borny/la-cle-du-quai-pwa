<template>
  <q-page class="column items-center">
    <square-shape-svg
      :title="'Demande de Résidence Artistique'"
    ></square-shape-svg>

    <div class="row" v-if="isLoading">
      <q-spinner-tail color="primary" size="2em" />
    </div>

    <div class="row justify-center">
      <p class="col-6">
        Merci de compléter le formulaire pour que nous commencions à faire
        connaissance. Si vous ne disposez pas de certains éléments ou si nos
        questions ne correspondent pas du tout à ce que vous faites, pas de
        soucis, adaptez... Rien n'est définitif ni exhaustif.
      </p>
    </div>

    <q-card class="column items-center q-my-xl form__container">
      <q-card-section class="">
        <form class="column form" @submit.prevent="submit">
          <!-- PROJECT NAME -->
          <q-input
            clearable
            :disable="isLoading"
            type="text"
            v-model.trim="projectName"
            label="Nom du projet *"
            class="q-mb-sm form__control"
            :rules="[(val) => !!val || 'Veuillez renseigner un nom de projet']"
          />

          <!-- COMPANY NAME -->
          <q-input
            clearable
            :disable="isLoading"
            type="text"
            v-model.trim="companyName"
            label="Nom de la compagnie *"
            class="q-mb-sm form__control"
            :rules="[
              (val) => !!val || 'Veuillez renseigner le nom de la compagnie',
            ]"
          />

          <!-- APPLICANT NAME -->
          <q-input
            clearable
            :disable="isLoading"
            type="text"
            v-model.trim="applicantName"
            label="Nom de la personne qui gère cette candidature *"
            class="q-mb-sm form__control"
            :rules="[(val) => !!val || 'Veuillez renseigner votre nom']"
          />

          <!-- EMAIL -->
          <q-input
            clearable
            :disable="isLoading"
            type="email"
            v-model.trim="email"
            label="Email *"
            class="q-mb-sm form__control"
            :rules="[(val) => !!val || 'Veuillez renseigner votre email']"
          />

          <!-- PHONE -->
          <q-input
            clearable
            :disable="isLoading"
            type="text"
            v-model.trim="phone"
            label="Téléphone *"
            class="q-mb-sm form__control"
            :rules="[
              (val) => !!val || 'Veuillez renseigner un numéro de téléphone',
            ]"
          />

          <!-- ADDRESS DESCRIPTION -->
          <q-input
            clearable
            :disable="isLoading"
            type="text"
            v-model.trim="address"
            label="Adresse de gestion de la structure *"
            class="q-mb-sm form__control"
            :rules="[(val) => !!val || 'Veuillez renseigner une adresse']"
          />

          <!-- PROJECT DESCRIPTION -->
          <q-input
            clearable
            :disable="isLoading"
            type="text"
            v-model.trim="projectDescription"
            label="Quelques mots sur votre projet *"
            class="q-mb-sm form__control"
            :rules="[(val) => !!val || 'Veuillez renseigner une description']"
          />

          <!-- VIDEO LINK -->
          <q-input
            clearable
            :disable="isLoading"
            type="text"
            v-model.trim="videoLink"
            label="Un lien vidéo vers un projet actuel ou passé ?"
            class="q-mb-sm form__control"
          />

          <!-- WEBSITE -->
          <q-input
            clearable
            :disable="isLoading"
            type="text"
            v-model.trim="website"
            label="Site internet ?"
            class="q-mb-sm form__control"
          />

          <!-- PARTNERS -->
          <q-input
            clearable
            :disable="isLoading"
            type="text"
            v-model.trim="partners"
            label="Des partenaires ou soutiens ?"
            class="q-mb-sm form__control"
          />

          <!-- LOCATION -->
          <p class="form__label">Vous êtes installé dans quel coin ? *</p>
          <q-option-group
            :options="locationOptions"
            type="radio"
            v-model="location"
            :disable="isLoading"
          />

          <!-- ARTISTIC PRACTICE -->
          <p class="form__label">Votre pratique artistique *</p>
          <q-option-group
            :options="artisticPracticeOptions"
            type="checkbox"
            v-model="artisticPractices"
            :disable="isLoading"
          />

          <!-- AVAILABILITY -->
          <q-input
            clearable
            :disable="isLoading"
            type="text"
            v-model="availability"
            label="Périodes souhaitées ? *"
            class="q-mb-sm form__control"
            :rules="[(val) => !!val || 'Veuillez renseigner une période']"
          />

          <!-- TEAM MEMBERS -->
          <p class="form__label">De qui l'équipe sera-t-elle constituée ?</p>
          <q-input
            v-for="(member, idx) of projectMembers"
            :key="idx"
            clearable
            :disable="isLoading"
            type="text"
            v-model="member.value"
            label="Nom, prénom et fonction *"
            class="q-mb-sm form__control"
            :rules="[(val) => !!val || 'Veuillez renseigner une période']"
          />

          <!-- REMOVE MEMBER BUTTON -->
          <q-btn
            v-if="projectMembers.length > 1"
            flat
            color="negative"
            label="Supprimer le dernier membre"
            :disable="isLoading"
            @click="removeMember"
            type="button"
          />

          <!-- ADD MEMBER BUTTON -->
          <q-btn
            flat
            color="primary"
            label="+ Ajouter un membre"
            :disable="isLoading"
            @click="addMember"
            type="button"
          />

          <!-- VALIDATE BUTTON -->
          <q-btn
            color="primary"
            label="Envoyer la demande"
            :loading="isLoading"
            :disabled="!isFormValid"
            class="q-mt-lg"
            type="submit"
          />
        </form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { computed, onMounted, ref } from "vue";
// import { onMounted, ref } from "vue";
// import { useAppStore } from "../stores/app/app";
// import { useCourseStore } from "../stores/course/course";
import squareShapeSvg from "../components/square-shape-svg.vue";

export default {
  name: "ResidencePage",

  components: { squareShapeSvg },

  setup() {
    const isLoading = ref(false);
    const projectName = ref(null);
    const companyName = ref(null);
    const applicantName = ref(null);
    const email = ref(null);
    const phone = ref(null);
    const address = ref(null);
    const projectDescription = ref(null);
    const videoLink = ref(null);
    const website = ref(null);
    const partners = ref(null);
    const location = ref(null);
    const artisticPractices = ref([]);
    const availability = ref([]);
    const projectMembers = ref([{ value: "" }]);

    const isFormValid = computed(() => {
      return (
        projectName.value &&
        companyName.value &&
        applicantName.value &&
        email.value &&
        phone.value &&
        address.value &&
        projectDescription.value &&
        location.value &&
        artisticPractices.value &&
        availability.value &&
        projectMembers.value[0].value
      );
    });

    function addMember() {
      projectMembers.value.push({ value: "" });
    }

    function removeMember() {
      projectMembers.value.pop();
    }

    function submit() {
      isLoading.value = true
      console.log("submit");
      const residenceFormData = {
        projectName: projectName.value,
        companyName: companyName.value,
        applicantName: applicantName.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        projectDescription: projectDescription.value,
        location: location.value,
        artisticPractices: artisticPractices.value,
        availability: availability.value,
        projectMembers: projectMembers.value,
      };

      console.log(residenceFormData);
    }

    return {
      isFormValid,
      isLoading,

      addMember,
      removeMember,
      submit,

      projectName,
      companyName,
      applicantName,
      email,
      phone,
      address,
      projectDescription,
      videoLink,
      website,
      partners,
      location,
      artisticPractices,
      availability,
      projectMembers,

      locationOptions: [
        {
          label: "Bordeaux Métropole",
          value: "Bordeaux Métropole",
          "checked-icon": "task_alt",
        },
        { label: "Gironde", value: "Gironde" },
        { label: "Landes", value: "Landes" },
        { label: "Pays Basque", value: "Pays Basque" },
        { label: "France", value: "France" },
        { label: "Au-delà...", value: "Au-delà..." },
      ],
      artisticPracticeOptions: [
        { label: "Danse contemporaine", value: "Danse contemporaine" },
        { label: "Théâtre", value: "Théâtre" },
        { label: "Danse - Théâtre", value: "Danse - Théâtre" },
        { label: "Musique", value: "Musique" },
        { label: "Cirque", value: "Cirque" },
        { label: "Autre", value: "Autre" },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.form {
  &__container {
    height: 100%;
    width: 100%;

    @media (min-width: $breakpoint-sm-min) {
      max-width: 500px;
    }
  }
  &__label {
    margin: 1rem 0 0.5rem;
    color: rgba(0, 0, 0, 0.6);
  }
  &__control {
    padding: 0;
  }
}
</style>
