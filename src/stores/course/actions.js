import { api } from "boot/axios";

export default {
  async getCourses() {

    const response = await api.get('/course')

    if (!response) {
      return 'No courses found'
    }

    if ((response.status === 200)) {
      return response.data.courses;
    }
  },

  async createCourse(
    dayOfWeek,
    courseTime,
    type,
    location,
    orderNumber
  ) {

    const response = await api.post('/course', {
      dayOfWeek,
      courseTime,
      type,
      location,
      orderNumber
    })

    if (!response) {
      return 'Course creation failed'
    }

    if ((response.status === 201)) {
      return response.data;
    }
  },

  async updateCourse(
    id,
    dayOfWeek,
    courseTime,
    type,
    location,
    orderNumber
  ) {

    const response = await api.patch('/course', {
      id,
      dayOfWeek,
      courseTime,
      type,
      location,
      orderNumber
    })

    if (!response) {
      return 'Course update failed'
    }

    if ((response.status === 200)) {
      return response.data;
    }
  },

  async deleteCourse(id) {
    const response = await api.delete(`/course/${id}`)

    if (!response) {
      return 'Course delete failed'
    }

    if ((response.status === 202)) {
      return response.data;
    }
  },
}
