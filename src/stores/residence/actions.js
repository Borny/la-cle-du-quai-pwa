import { api } from "boot/axios";

export default {
  // async getResidences() {

  // }

  async residenceRequest(residenceRequestData) {
    const response = await api.patch('/residence')

    if (!response) 'Residence request failed'


  }
}
