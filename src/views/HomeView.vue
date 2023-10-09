<template>
  <div class="p-10">
    <div class="grid grid-cols-3 items-start gap-x-2">
      <TaskList v-for="status in taskStatuses" :key="status.name">
        <TaskListTitle>{{ status.name }}</TaskListTitle>
        <draggable
          class="space-y-2"
          v-model="status.tasks"
          :item-key="status.slug"
          @start="console.log('start')"
          @end="console.log('end')"
          group="tasks"
          ghost-class="ghost-card"
        >
          <template #item="{ element }">
            <div>
              <TaskCard
                class="cursor-move"
                :title="element.title"
                :description="element.description"
                :date="element.due_date"
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
    const taskStatuses = ref([]);

    onMounted(async () => {
      const { data } = await taskStore.getTaskStatuses();
      taskStatuses.value = data;
    });

    return { taskStatuses };
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
