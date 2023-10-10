<template>
  <div class="p-10">
    <div class="grid grid-cols-3 items-start gap-x-2">
      <TaskList v-for="status in taskStore.taskStatuses" :key="status.name">
        <TaskListTitle>{{ status.name }}</TaskListTitle>
        <draggable
          class="space-y-2"
          v-model="status.tasks"
          :item-key="status.slug"
          :component-data="{ statusId: status.id }"
          @add="sortTask"
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
                :statusId="element.status_id"
                :key="element.id"
              />
            </div>
          </template>
        </draggable>
        <AddTask :key="status.name" :statusId="status.id">Add a Task</AddTask>
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
      await taskStore.sortTask({
        taskId: e.item._underlying_vm_.id,
        newStatusId: e.to.attributes.statusid.value,
      });
    };

    window.Echo.channel("task-sorted").listen("TaskSorted", (e) => {
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
</style>
