<template>
  <div
    class="flex hover:bg-opacity-90 items-center justify-between group bg-white shadow-md rounded-md p-3"
  >
    <div class="w-full">
      <EditTask v-if="isEditting($props.taskId, $props.statusId)" />
      <template v-else>
        <div class="flex justify-between">
          <span class="font-semibold">
            {{ $props.title }}
          </span>
          <div
            @click="
              editTask({
                taskId: $props.taskId,
                statusId: $props.statusId,
                title: $props.title,
                description: $props.description,
                date: $props.dueDate,
              })
            "
          >
            <PenIcon
              class="md:hidden group-hover:block w-4 h-4 cursor-pointer"
            />
          </div>
        </div>
        <TaskDescription class="text-sm">
          {{ $props.description }}
        </TaskDescription>
        <TaskDueDate
          class="border-t border-white border-opacity-25 mt-1.5 pt-1.5"
        >
          {{ $props.formattedDate }}
        </TaskDueDate>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import PenIcon from "@/components/icons/PenIcon.vue";
import TaskDescription from "@/components/task/TaskDescription.vue";
import TaskDueDate from "@/components/task/TaskDueDate.vue";
import EditTask from "@/components/task/EditTask.vue";
import { useTaskStore } from "@/stores/tasks";

interface SelectedTask {
  taskId: number | null | undefined;
  statusId: number | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
  date: string | null | undefined;
}

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "Task 1",
    },
    description: {
      type: String,
      default: "Description of Task",
    },
    dueDate: {
      type: String,
      default: "",
    },
    formattedDate: {
      type: String,
      default: "",
    },
    statusId: {
      type: Number,
      default: 0,
    },
    taskId: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const taskStore = useTaskStore();
    const isEditting = (taskId: number, statusId: number) => {
      if (
        taskId === taskStore.selectedTask.taskId &&
        statusId === taskStore.selectedTask.statusId
      ) {
        return true;
      }
      return false;
    };
    const editTask = ({
      taskId,
      statusId,
      title,
      description,
      date,
    }: SelectedTask) => {
      taskStore.setSelectedTask({
        taskId,
        statusId,
        title,
        description,
        date,
      } as SelectedTask | any);
    };

    onMounted(() => {
      taskStore.setSelectedTask({
        taskId: null,
        statusId: null,
        title: null,
        description: null,
        date: null,
      } as SelectedTask | any);
    });

    return { editTask, isEditting };
  },

  components: {
    PenIcon,
    TaskDescription,
    TaskDueDate,
    EditTask,
  },
});
</script>
