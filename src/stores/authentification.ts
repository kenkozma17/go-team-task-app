import { defineStore } from "pinia";
import axios from "axios";
axios.defaults.withCredentials = true;

type User = {
  email: string;
  created_at: string;
  email_verified_at: string;
  id: number;
  name: string;
  updated_at: string;
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated(state) {
      if (state.user !== null) {
        return true;
      }
      return false;
    },
  },
  actions: {
    async getCookie() {
      await axios.get(`${process.env.VUE_APP_API_URL}/sanctum/csrf-cookie`);
    },
    async login({ email, password }: { email: string; password: string }) {
      return await axios.post(`${process.env.VUE_APP_API_URL}/login`, {
        email: email,
        password: password,
      });
    },
    async getUser() {
      await this.getCookie();
      const { data } = await axios.get(
        `${process.env.VUE_APP_API_URL}/api/user`
      );
      this.setUser(data);
    },
    setUser(user: User | null) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
  },
  persist: true,
});
