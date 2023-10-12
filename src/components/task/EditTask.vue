<template>
  <form
    @submit.prevent="updateTask"
    class="border-opacity-25 flex flex-col space-y-2"
  >
    <div>
      <BaseInput
        type="text"
        v-model="task.title"
        placeholder="Task Title"
        class="border-black border border-opacity-25"
        :hasError="!!errorsList?.title"
      />
      <ErrorMessage v-if="errorsList?.title">
        {{ errorsList.title[0] }}
      </ErrorMessage>
    </div>
    <div>
      <BaseTextArea
        v-model="task.description"
        class="border-black block border border-opacity-25 w-full"
        :hasError="!!errorsList?.description"
        placeholder="Task Description"
      />
      <ErrorMessage v-if="errorsList?.description">
        {{ errorsList.description[0] }}
      </ErrorMessage>
    </div>
    <div>
      <BaseDateInput
        placeholder="Select Due Date"
        class="border-black border border-opacity-25 w-full"
        :hasError="!!errorsList?.date"
        v-model="task.date"
      />
      <ErrorMessage v-if="errorsList?.date">
        {{ errorsList.date[0] }}
      </ErrorMessage>
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
import ErrorMessage from "@/components/ui/ErrorMessage.vue";

import BaseInput from "@/components/form/BaseInput.vue";
import BaseTextArea from "@/components/form/BaseTextArea.vue";
import BaseDateInput from "@/components/form/BaseDateInput.vue";

export default defineComponent({
  components: {
    ErrorMessage,
    BaseInput,
    BaseTextArea,
    BaseDateInput,
  },
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
          return;
        }
        toast.error("Whoops, something went wrong!");
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

    const deleteTask = async () => {
      try {
        await taskStore.deleteTask(task.value.taskId);
        toast.success("Task Deleted Successfully!");
      } catch (err) {
        if (err.response.status === 422) {
          const { message } = err.response.data;
          toast.error(message);
          return;
        }
        toast.error("Whoops, something went wrong!");
      }
    };

    return { task, updateTask, cancelEdit, deleteTask, errorsList };
  },
});
</script>
