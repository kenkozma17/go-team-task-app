<template>
  <div class="p-4 md:block flex overflow-x-scroll md:h-full h-screen">
    <div class="md:grid flex md:grid-cols-3 items-start gap-x-2">
      <TaskList
        class="md:w-full w-[90vw]"
        v-for="status in taskStore.taskStatuses"
        :key="status.name"
      >
        <TaskListTitle>{{ status.name }}</TaskListTitle>
        <AddTask :key="status.name" :statusId="status.id">Add a Task</AddTask>
        <draggable
          class="space-y-4 py-2 draggable-element overflow-y-scroll"
          :class="
            status.tasks.length === 0
              ? 'border-blue-400 border rounded-md p-2 border-dotted text-center my-2'
              : ''
          "
          v-model="status.tasks"
          :item-key="status.slug"
          :component-data="{ statusId: status.id }"
          @add="sortTask"
          :delay="500"
          :delayOnTouchOnly="true"
          group="tasks"
          ghost-class="ghost-card"
        >
          <template #item="{ element }">
            <div>
              <TaskCard
                class="cursor-move"
                :title="element.title"
                :taskId="element.id"
                :description="element.description"
                :dueDate="element.due_date"
                :formattedDate="element.formatted_date"
                :statusId="element.status_id"
                :key="element.id"
              />
            </div>
          </template>
        </draggable>
      </TaskList>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import TaskCard from "@/components/task/TaskCard.vue";
import AddTask from "@/components/task/AddTask.vue";
import TaskList from "@/components/task/TaskList.vue";
import TaskListTitle from "@/components/task/TaskListTitle.vue";
import draggable from "vuedraggable";
import { useTaskStore } from "@/stores/tasks";
import { useAuthStore } from "@/stores/authentification";
import { useRouter } from "vue-router";
import DropArea from "@/components/task/DropArea.vue";
import { toast } from "vue3-toastify";

export default defineComponent({
  name: "HomeView",
  components: {
    TaskCard,
    AddTask,
    TaskList,
    TaskListTitle,
    draggable,
  },
  setup() {
    const taskStore = useTaskStore();
    const authStore = useAuthStore();
    const router = useRouter();

    const sortTask = async (e) => {
      try {
        await taskStore.sortTask({
          taskId: e.item._underlying_vm_.id,
          newStatusId: e.to.attributes.statusid.value,
        });
      } catch (err) {
        if (err.response.status === 422) {
          const { message } = err.response.data;
          toast.error(message);
          return;
        }
        toast.error("Whoops, something went wrong!");
      }
    };

    window.Echo.channel("task-sorted").listen("TaskSorted", (e) => {
      taskStore.getTaskStatuses();
    });

    window.Echo.channel("task-updated").listen("TaskUpdated", () => {
      taskStore.getTaskStatuses();
    });

    window.Echo.channel("task-deleted").listen("TaskDeleted", () => {
      taskStore.getTaskStatuses();
    });

    window.Echo.channel("task-created").listen("TaskCreated", () => {
      taskStore.getTaskStatuses();
    });

    onMounted(async () => {
      try {
        await taskStore.getTaskStatuses();
      } catch (err) {
        if (err.response.status === 401) {
          authStore.$reset();
          router.push({ name: "login" });
        }
      }
    });

    return { taskStore, sortTask };
  },
});
</script>
<style scoped>
.ghost-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
  border-radius: 5px;
}
.draggable-element {
  max-height: calc(100vh - 10.5rem);
}
</style>
