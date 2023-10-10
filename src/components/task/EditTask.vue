<template>
  <form
    @submit.prevent="updateTask"
    class="border-opacity-25 flex flex-col space-y-2"
  >
    <input
      type="text"
      class="p-3 bg-black w-full rounded-md"
      v-model="task.title"
      placeholder="Task Title"
    />
    <textarea
      type="text"
      class="p-3 bg-black w-full rounded-md"
      placeholder="Task Description"
      v-model="task.description"
    ></textarea>
    <input type="date" class="bg-black rounded-md p-2" v-model="task.date" />
    <div class="flex space-x-2 my-4">
      <button
        type="submit"
        class="bg-light-blue hover:bg-opacity-90 text-black font-semibold px-2 py-1.5 rounded-md"
      >
        Save
      </button>
      <button
        class="bg-red-200 hover:bg-opacity-90 text-black font-semibold px-2 py-1.5 rounded-md"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useTaskStore } from "@/stores/tasks";

export default defineComponent({
  setup() {
    const taskStore = useTaskStore();
    const task = ref({
      title: "",
      description: "",
      date: "",
      taskId: "",
    });
    task.value.title = taskStore.selectedTask.title;
    task.value.description = taskStore.selectedTask.description;
    task.value.date = taskStore.selectedTask.date;
    task.value.taskId = taskStore.selectedTask.taskId;

    const updateTask = async () => {
      await taskStore.updateTask(task.value);
      taskStore.setSelectedTask({
        taskId: null,
        statusId: null,
        title: null,
        description: null,
        date: null,
      });
    };

    return { task, updateTask };
  },
});
</script>
