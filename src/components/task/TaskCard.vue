<template>
  <div
    class="flex hover:bg-opacity-90 items-center justify-between group bg-dark-gray rounded-md p-3"
  >
    <div class="w-full">
      <EditTask v-if="isEditting" />
      <template v-else>
        <div class="flex justify-between">
          <span class="font-semibold">
            {{ $props.title }}
          </span>
          <PenIcon
            @click="editTask"
            class="hidden group-hover:block w-4 h-4 cursor-pointer"
          />
        </div>
        <TaskDescription class="text-sm">
          {{ $props.description }}
        </TaskDescription>
        <TaskDueDate
          class="border-t border-white border-opacity-25 mt-1.5 pt-1.5"
        >
          {{ $props.date }}
        </TaskDueDate>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import PenIcon from "@/components/icons/PenIcon.vue";
import TaskDescription from "@/components/task/TaskDescription.vue";
import TaskDueDate from "@/components/task/TaskDueDate.vue";
import EditTask from "@/components/task/EditTask.vue";
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
    date: {
      type: String,
      default: "",
    },
  },
  setup() {
    const isEditting = ref(false);
    const editTask = () => (isEditting.value = true);
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
