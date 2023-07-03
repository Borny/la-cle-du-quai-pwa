import { defineStore } from 'pinia'
import getters from './getters'
import actions from './actions'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userEmail: null,
    token: null,
    user: null
  }),
  getters,
  actions
});
