import { api } from "boot/axios";

export default {
  async getData() {

    const response = await api.get('/home')

    console.log({response});

    if (!response) {
      return 'No info found'
    }

    if ((response.status === 201)) {
      return response.data;
    }
  },
}
