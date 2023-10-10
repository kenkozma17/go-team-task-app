import { defineStore } from "pinia";
import axios from "axios";
axios.defaults.withCredentials = true;

interface Status {
  id: number;
  name: string;
  tasks: Task[];
}

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
}

interface SelectedTask {
  taskId: number | null;
  statusId: number | null;
  title: string | null;
  description: string | null;
  date: string | null;
}

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    taskStatuses: [] as Status[],
    selectedTask: {
      taskId: null,
      statusId: null,
      title: null,
      description: null,
      date: null,
    } as SelectedTask,
  }),
  getters: {},
  actions: {
    async getTaskStatuses() {
      const { data } = await axios.get(
        `${process.env.VUE_APP_API_URL}/api/statuses`
      );
      this.setTaskStatuses(data.data);
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
    async setTaskStatuses(statuses: Status[]) {
      this.taskStatuses = statuses;
    },
    async setSelectedTask({
      taskId,
      statusId,
      title,
      description,
      date,
    }: SelectedTask) {
      this.selectedTask = { taskId, statusId, title, description, date };
    },
    async updateTask({
      title,
      description,
      date,
      taskId,
    }: {
      title: string;
      description: string;
      date: string;
      taskId: string;
    }) {
      const { data } = await axios.post(
        `${process.env.VUE_APP_API_URL}/api/statuses/${taskId}`,
        { data: { title, description, date }, _method: "put" }
      );
      return data;
    },
    async sortTask({
      taskId,
      newStatusId,
    }: {
      taskId: string;
      newStatusId: string;
    }) {
      const { data } = await axios.post(
        `${process.env.VUE_APP_API_URL}/api/statuses/${taskId}/sort`,
        { newStatusId }
      );
      return data;
    },
  },
  persist: true,
});
