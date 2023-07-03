<template>
  <div class="row flex-center container">
    <transition>
      <q-card v-if="displayForm" class="column items-center form-container">
        <q-card-section class="col column justify-around items-center">
          <!-- <img class="logo" src="../assets/ct-logo-round.png" alt="ct-logo" /> -->
          <form class="column items-center form" @submit.prevent="submit">
            <q-input
              clearable
              :disable="isLoading"
              type="email"
              v-model="email"
              label="Email"
              placeholder="Email"
              class="q-mb-sm control"
              :rules="[(val) => !!val || 'Field is required']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="account_circle" />
              </template>
            </q-input>
            <q-input
              clearable
              :disable="isLoading"
              type="password"
              placeholder="Mot de passe"
              label="Mot de passe"
              v-model="password"
              class="q-mb-sm control"
              :rules="[(val) => !!val || 'Field is required']"
            >
              <template v-slot:prepend>
                <q-icon color="primary" name="key" />
              </template>
            </q-input>
            <q-btn
              color="primary"
              label="Connexion"
              :loading="isLoading"
              :disabled="!email || !isPasswordValid || isLoading"
              class="q-mt-lg"
              type="submit"
            />
          </form>
        </q-card-section>
      </q-card>
    </transition>
  </div>
</template>

<script>

import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { computed, onMounted, ref } from "vue";
import { useAuthStore } from "../stores/auth/auth";

export default{
  name: 'AdminLogin',

  setup() {
    const $q = useQuasar();
    const authStore = useAuthStore();
    const router = useRouter();
    const isAuth = computed(() => authStore.isAuth);
    const isPasswordValid = computed(() => password.value && password.value.length >= 4);
    const passwordTooShort = computed(() => password.value && password.value.length < 6);

    const loginSuccess = ref("");
    const email = ref("");
    const password = ref(null);
    const isLoading = ref(false);
    const displayForm = ref(false);

    onMounted(() => (displayForm.value = true));

    async function submit() {
      isLoading.value = true;

      try {
        const response = await authStore.login(email.value, password.value);

        if (!response) {
          $q.notify({
            message: "Please check your email or password",
            color: "negative",
          });
        }

        authStore.$patch({ user: response.data.firstName });
        authStore.$patch({ token: response.data.token });

        console.log('should work', response);
        router.replace('/admin');
      } catch (error) {
        console.error(error);
        $q.notify({
          message: "Please check your email or password",
          color: "negative",
        });
      } finally {
        isLoading.value = false;
      }
    }

    return {
      authStore,
      loginSuccess,
      isAuth,
      submit,
      displayForm,
      email,
      password,
      isPasswordValid,
      passwordTooShort,
      isLoading,
    };
  },
}
</script>
<style lang="scss" scoped>
.v-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.v-enter-active {
  transition: all 0.5s ease-out;
}
.v-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.v-leave-from {
  opacity: 1;
}

.v-leave-active {
  transition: all 5s ease-out;
}
.v-leave-to {
  opacity: 0;
}

.container {
  background: $grey-lighter;
  height: 100vh;
}

.form-container {
  height: 100%;
  width: 100%;

  @media (min-width: $breakpoint-sm-min) {
    max-width: 500px;
    max-height: 500px;
  }
}

.logo {
  width: 160px;
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
