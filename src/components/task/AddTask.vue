<template>
  <form @submit.prevent="createTask" class="my-2">
    <div
      v-if="isAddingTask"
      class="border-t border-black border-opacity-25 py-3 flex flex-col space-y-2"
    >
      <div>
        <input
          type="text"
          v-model="task.title"
          class="p-3 bg-dark-gray w-full rounded-md"
          :class="errorsList?.title ? 'border-red-600' : ''"
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
          class="p-3 bg-dark-gray w-full rounded-md block"
          :class="errorsList?.description ? 'border-red-600' : ''"
          placeholder="Task Description"
        ></textarea>
        <span class="text-red-600 text-xs" v-if="errorsList?.description">{{
          errorsList.description[0]
        }}</span>
      </div>
      <div>
        <input
          type="text"
          placeholder="Select Due Date"
          onfocus="(this.type='date')"
          class="bg-dark-gray w-full rounded-md p-2"
          :class="errorsList?.date ? 'border-red-600' : ''"
          v-model="task.date"
        />
        <span class="text-red-600 text-xs" v-if="errorsList?.date">{{
          errorsList.date[0]
        }}</span>
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
    const initalTaskState = {
      title: "",
      description: "",
      date: "",
      statusId: props.statusId,
    };
    const task = ref({ ...initalTaskState });
    const errorsList = ref([]);

    const toggleAddingTask = () => (isAddingTask.value = !isAddingTask.value);

    const createTask = async () => {
      try {
        await taskStore.createTask(task.value);
        isAddingTask.value = false;
        Object.assign(task, initalTaskState);
        toast.success("Task Created Successfully!");
      } catch (err) {
        if (err.response.status === 422) {
          const { errors } = err.response.data;
          errorsList.value = errors;
        }
      }
    };

    window.Echo.channel("task-created").listen("TaskCreated", () => {
      taskStore.getTaskStatuses();
    });

    return { isAddingTask, toggleAddingTask, createTask, task, errorsList };
  },

  components: {
    AddIcon,
    CloseIcon,
  },
});
</script>
