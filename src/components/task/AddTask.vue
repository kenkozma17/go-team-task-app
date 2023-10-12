<template>
  <form @submit.prevent="createTask" class="my-2">
    <div
      v-if="isAddingTask"
      class="border-t border-black border-opacity-25 py-3 flex flex-col space-y-2"
    >
      <div>
        <BaseInput
          type="text"
          v-model="task.title"
          placeholder="Task Title"
          class="bg-dark-gray"
          :hasError="!!errorsList?.title"
        />
        <ErrorMessage v-if="errorsList?.title">
          {{ errorsList.title[0] }}
        </ErrorMessage>
      </div>
      <div>
        <BaseTextArea
          v-model="task.description"
          class="bg-dark-gray"
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
          class="bg-dark-gray"
          :hasError="!!errorsList?.date"
          v-model="task.date"
        />
        <ErrorMessage v-if="errorsList?.date">
          {{ errorsList.date[0] }}
        </ErrorMessage>
      </div>
    </div>

    <div
      v-if="!isAddingTask"
      @click="toggleAddingTask"
      class="cursor-pointer rounded-md bg-dark-gray bg-opacity-80 hover:bg-opacity-100 mb-6 py-2 flex space-x-4 items-start"
    >
      <AddIcon class="ml-2" />
      <span class="font-semibold">
        <slot></slot>
      </span>
    </div>
    <div class="flex items-center space-x-3" v-else>
      <button
        class="bg-light-blue hover:bg-opacity-90 text-black font-semibold px-2 py-1.5 rounded-md"
      >
        Add Task
      </button>
      <CloseIcon
        @click="toggleAddingTask"
        class="cursor-pointer transform hover:rotate-[135deg] transition-transform"
      />
    </div>
  </form>
</template>
<script>
import { defineComponent, ref } from "vue";
import AddIcon from "@/components/icons/AddIcon.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { useTaskStore } from "@/stores/tasks";
import { toast } from "vue3-toastify";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import BaseInput from "@/components/form/BaseInput.vue";
import BaseTextArea from "@/components/form/BaseTextArea.vue";
import BaseDateInput from "@/components/form/BaseDateInput.vue";

export default defineComponent({
  props: {
    statusId: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const taskStore = useTaskStore();

    const isAddingTask = ref(false);
    const task = ref({
      title: "",
      description: "",
      date: "",
      statusId: props.statusId,
    });
    const errorsList = ref([]);

    const toggleAddingTask = () => (isAddingTask.value = !isAddingTask.value);
    const clearForm = () => {
      errorsList.value =
        task.value.title =
        task.value.description =
        task.value.date =
          "";
    };

    const createTask = async () => {
      try {
        await taskStore.createTask(task.value);
        isAddingTask.value = false;
        clearForm();
        toast.success("Task Created Successfully!");
      } catch (err) {
        if (err.response.status === 422) {
          const { errors } = err.response.data;
          errorsList.value = errors;
          return;
        }
        toast.error("Whoops, something went wrong!");
      }
    };

    return { isAddingTask, toggleAddingTask, createTask, task, errorsList };
  },

  components: {
    AddIcon,
    CloseIcon,
    ErrorMessage,
    BaseInput,
    BaseTextArea,
    BaseDateInput,
  },
});
</script>
