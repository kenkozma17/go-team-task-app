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
          <ErrorMessage v-if="errorsList?.email">
            {{ errorsList.email[0] }}
          </ErrorMessage>
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
          <ErrorMessage v-if="errorsList?.password">
            {{ errorsList.password[0] }}
          </ErrorMessage>
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
<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import toast from "vue3-toastify";

import { useAuthStore } from "@/stores/authentification";

export default defineComponent({
  components: { ErrorMessage },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const errorsList = ref([]);

    const user = ref({
      email: "",
      password: "",
    });

    const login = async () => {
      try {
        await authStore.getCookie();
        const loginResponse = await authStore.login(user.value);
        if (loginResponse.status === 200 || loginResponse.status === 204) {
          await authStore.getUser();
          router.push("/");
        }
      } catch (err) {
        if (err.response.status === 422) {
          const { errors } = err.response.data;
          errorsList.value = errors;
          return;
        }
        toast.error("Whoops, something went wrong!");
      }
    };

    return { user, login, errorsList };
  },
});
</script>
