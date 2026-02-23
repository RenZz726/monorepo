<template>
  <div
    class="min-h-screen bg-slate-100 px-4 py-12 flex items-center justify-center"
  >
    <div class="mx-auto w-full max-w-md rounded-xl bg-white p-8 shadow">
      <h1 class="text-center text-2xl font-semibold text-slate-900">Login</h1>
      <p class="mt-2 text-center text-sm text-slate-500">
        Sign in or create an account
      </p>

      <form
        class="mt-8 flex flex-col gap-4"
        @submit.prevent="handleLogin"
      >
        <input
          ref="emailInput"
          type="email"
          v-model="email"
          placeholder="Email"
          name="login-email"
          autocomplete="off"
          class="w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-slate-500"
        />

        <input
          ref="passwordInput"
          type="password"
          v-model="password"
          placeholder="Password"
          name="login-password"
          autocomplete="new-password"
          class="w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-slate-500"
        />

        <p v-if="errorMessage" class="text-sm text-red-600">
          {{ errorMessage }}
        </p>

        <div class="mt-1 grid grid-cols-2 gap-3">
          <button
            @click="handleRegister"
            type="button"
            class="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Register
          </button>
          <button
            type="submit"
            class="rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

import { useAuth } from "@/composables/useAuth";
const { register, login } = useAuth();
const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const emailInput = ref(null);
const passwordInput = ref(null);

onMounted(() => {
  // Some browsers ignore autocomplete hints; clear DOM values after mount.
  email.value = "";
  password.value = "";
  if (emailInput.value) emailInput.value.value = "";
  if (passwordInput.value) passwordInput.value.value = "";
});

const handleRegister = async () => {
  errorMessage.value = "";
  try {
    await register(email.value, password.value);
    await router.push("/home");
  } catch (error) {
    errorMessage.value = error?.code || "Register failed";
  }
};

const handleLogin = async () => {
  errorMessage.value = "";
  try {
    await login(email.value, password.value);
    await router.push("/home");
  } catch (error) {
    errorMessage.value = error?.code || "Invalid username or password";
  }
};
</script>
