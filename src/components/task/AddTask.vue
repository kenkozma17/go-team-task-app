<template>
  <form @submit.prevent="createTask">
    <div
      v-if="isAddingTask"
      class="border-t border-white border-opacity-25 flex flex-col my-2 py-2 space-y-2"
    >
      <input
        type="text"
        v-model="task.title"
        class="p-3 bg-dark-gray w-full rounded-md"
        placeholder="Task Title"
      />
      <textarea
        type="text"
        v-model="task.description"
        class="p-3 bg-dark-gray w-full rounded-md"
        placeholder="Task Description"
      ></textarea>
      <input
        type="date"
        class="bg-dark-gray rounded-md p-2"
        v-model="task.date"
      />
    </div>

    <div
      v-if="!isAddingTask"
      @click="toggleAddingTask"
      class="cursor-pointer rounded-md hover:bg-dark-gray bg-opacity-50 mt-2 py-2 flex space-x-4 items-start"
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
      <CloseIcon @click="toggleAddingTask" class="cursor-pointer" />
    </div>
  </form>
</template>
<script>
import { defineComponent, ref } from "vue";
import AddIcon from "@/components/icons/AddIcon.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { useTaskStore } from "@/stores/tasks";
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

    window.Echo.channel("new-task-added").listen("NewTaskAdded", (e) => {
      taskStore.getTaskStatuses();
    });

    const toggleAddingTask = () => (isAddingTask.value = !isAddingTask.value);

    const createTask = async () => {
      isAddingTask.value = false;
      await taskStore.createTask(task.value);
    };
    return { isAddingTask, toggleAddingTask, createTask, task };
  },

  components: {
    AddIcon,
    CloseIcon,
  },
});
</script>
