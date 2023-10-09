<template>
  <LoginForm />
</template>
<script>
import { defineComponent } from "vue";
import LoginForm from "@/components/auth/LoginForm.vue";

export default defineComponent({
  components: {
    LoginForm,
  },
  setup() {
    return;
  },
});
</script>
