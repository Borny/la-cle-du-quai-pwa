import { api } from "boot/axios";

export default {
  async login(email, password) {
    if (!email || !password) {
      throw new Error('Email or password required')
    }

    const response = await api.post('/login', {
      email, password
    })

    if (!response) {
      return 'No user found'
    }

    console.log({resp: response.data.data});

    if ((response.status === 201)) {
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('userEmail', response.data.data.email);

      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`

      return response.data;
    }
  },

  async getUser() {
    const userEmail = localStorage.getItem('userEmail')

    if (!userEmail) {
      this.logout()
    }

    try {
      const response = await api.get(`/users`)
      this.$patch({ user: response.data })
      return response.data
    } catch (error) {
      throw new Error('No user found')
    }
  },

  autoLogin() {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      this.$patch({ token });
    } else {
      this.logout()
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');

    this.$patch({
      userEmail: null,
      token: null,
    });
  },
}
