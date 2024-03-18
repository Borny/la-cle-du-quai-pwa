import { defineStore } from 'pinia'
import getters from './getters'
import actions from './actions'

export const useCourseStore = defineStore('course', {
  state: () => ({
    courseData: null
  }),
  getters,
  actions
});
