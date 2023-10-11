<template>
  <form
    @submit.prevent="updateTask"
    class="border-opacity-25 flex flex-col space-y-2"
  >
    <div>
      <input
        type="text"
        class="p-3 border-black border border-opacity-25 w-full rounded-md"
        :class="errorsList?.title ? 'border-red-600' : ''"
        v-model="task.title"
        placeholder="Task Title"
      />
      <span class="text-red-600 text-xs" v-if="errorsList?.title">{{
        errorsList.title[0]
      }}</span>
    </div>
    <div>
      <textarea
        type="text"
        v-model="task.description"
        class="p-3 border-black block border border-opacity-25 w-full rounded-md"
        :class="errorsList?.description ? 'border-red-600' : ''"
        placeholder="Task Description"
      ></textarea>
      <span class="text-red-600 text-xs" v-if="errorsList?.description">{{
        errorsList.description[0]
      }}</span>
    </div>
    <div>
      <input
        type="date"
        class="border-black border border-opacity-25 w-full rounded-md p-2"
        :class="errorsList?.date ? 'border-red-600' : ''"
        v-model="task.date"
      />
      <span class="text-red-600 text-xs" v-if="errorsList?.date">{{
        errorsList.date[0]
      }}</span>
    </div>
    <div class="flex justify-between items-center my-4">
      <div class="flex space-x-2">
        <button
          type="submit"
          class="bg-light-blue hover:bg-opacity-90 text-black font-semibold px-2 py-1.5 rounded-md"
        >
          Save
        </button>
        <button
          type="button"
          @click="cancelEdit"
          class="bg-red-200 hover:bg-opacity-90 text-black font-semibold px-2 py-1.5 rounded-md"
        >
          Cancel
        </button>
      </div>
      <div>
        <button
          @click="deleteTask"
          type="button"
          class="bg-red-600 hover:bg-opacity-90 text-black font-semibold px-2 py-1.5 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  </form>
</template>
<script>
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";
import { useTaskStore } from "@/stores/tasks";
import { toast } from "vue3-toastify";

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

    const errorsList = ref([]);

    const updateTask = async () => {
      try {
        await taskStore.updateTask(task.value);
        taskStore.setSelectedTask({
          taskId: null,
          statusId: null,
          title: null,
          description: null,
          date: null,
        });
        toast.success("Task Updated Successfully!");
      } catch (err) {
        if (err.response.status === 422) {
          const { errors } = err.response.data;
          errorsList.value = errors;
        }
      }
    };

    const cancelEdit = () => {
      taskStore.setSelectedTask({
        taskId: null,
        statusId: null,
        title: null,
        description: null,
        date: null,
      });
    };

    window.Echo.channel("task-updated").listen("TaskUpdated", (e) => {
      taskStore.getTaskStatuses();
    });

    window.Echo.channel("task-deleted").listen("TaskDeleted", (e) => {
      taskStore.getTaskStatuses();
    });

    const deleteTask = async () => {
      try {
        await taskStore.deleteTask(task.value.taskId);
        toast.success("Task Deleted Successfully!");
      } catch (err) {
        console.log(err);
      }
    };

    return { task, updateTask, cancelEdit, deleteTask, errorsList };
  },
});
</script>
