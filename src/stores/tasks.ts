import { defineStore } from "pinia";
import axios from "axios";
axios.defaults.withCredentials = true;

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    taskStatuses: [],
  }),
  getters: {},
  actions: {
    async getTaskStatuses() {
      const { data } = await axios.get(
        `${process.env.VUE_APP_API_URL}/api/statuses`
      );

      return data;
    },
    async createTask({
      title,
      description,
      date,
      statusId,
    }: {
      title: string;
      description: string;
      date: string;
      statusId: string;
    }) {
      const { data } = await axios.post(
        `${process.env.VUE_APP_API_URL}/api/statuses`,
        { title, description, date, statusId }
      );
      return data;
    },
  },
  persist: true,
});
