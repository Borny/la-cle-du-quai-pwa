import { defineStore } from 'pinia'
import actions from './actions'

export const useResidenceStore = defineStore('residence', {
  state: () => ({
    residenceData: null
  }),
  actions
});
