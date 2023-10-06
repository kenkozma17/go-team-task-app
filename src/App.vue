<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <form @submit.prevent="onLogin">
    {{ user }}
    {{ testData }}
    <div>
      <label for="email">Email</label>
      <input type="email" v-model="form.email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" v-model="form.password" />
    </div>
    <button>Login</button>
  </form>
  <!-- <router-view /> -->
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref } from "vue";

axios.defaults.withCredentials = true;

export default defineComponent({
  setup() {
    const form = ref({
      email: null,
      password: null,
    });

    const user = ref();
    const testData = ref();

    async function onLogin() {
      await axios.get("https://task-api.kenkozma.dev/sanctum/csrf-cookie");
      await axios.post("https://task-api.kenkozma.dev/login", {
        email: form.value.email,
        password: form.value.password,
      });

      let { data } = await axios.get("https://task-api.kenkozma.dev/api/user");
      let test = await axios.get("https://task-api.kenkozma.dev/api/test");

      testData.value = test.data;
      user.value = data;
    }

    return { form, user, onLogin, testData };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
