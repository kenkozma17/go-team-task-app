<template>
  <div class="md:mt-60 px-4 mt-20">
    <form @submit.prevent="login">
      <h1 class="text-black text-center text-[3rem] font-bold">Login</h1>
      <div class="bg-dark-gray md:w-1/4 p-4 rounded-md mx-auto">
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            v-model="user.email"
            type="text"
            placeholder="Email"
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            v-model="user.password"
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          class="bg-light-blue hover:bg-opacity-90 text-black font-semibold px-2 py-1.5 rounded-md"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import { useAuthStore } from "@/stores/authentification";

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const user = ref({
      email: "",
      password: "",
    });

    const login = async () => {
      let resp = await authStore.login(user.value);
      if (resp.success === true) {
        router.push("/");
      }
    };

    return { user, login };
  },
});
</script>
