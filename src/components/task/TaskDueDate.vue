<template>
  <div class="flex items-center">
    <DateIcon />
    <p class="text-xs ml-2"><slot></slot></p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import DateIcon from "@/components/icons/DateIcon.vue";

export default defineComponent({
  components: {
    DateIcon,
  },
});
</script>
