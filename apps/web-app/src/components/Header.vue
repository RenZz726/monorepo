<template>
  <header class="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur">
    <div class="mx-auto flex h-16 items-center justify-between px-4">
      <h1
        class="text-2xl font-semibold bg-purple-700 px-4 py-2 rounded-md text-white"
      >
        Project_stack
      </h1>
      <button
        @click="handleLogout"
        class="rounded bg-blue-900 px-4 py-2 text-white"
      >
        Logout
      </button>
    </div>
  </header>
</template>
<script setup>
import { useAuth } from "@/composables/useAuth";
import { router } from "@/router/index";

const { logout } = useAuth();

const handleLogout = async () => {
  try {
    await logout();

    await router.push("/login");
  } catch (error) {
    console.error("Error: ", error);
  }
};
</script>
