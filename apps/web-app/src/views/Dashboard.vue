<template>
  <div class="w-full min-h-screen bg-slate-900 text-white">
    <div v-if="loading">
      <h2 class="text-center text-2xl text-slate-300">Loading...</h2>
    </div>
    <div v-else-if="isAuthorized">
      <header class="bg-green-700 py-4 mb-8">
        <h2 class="text-center text-2xl">My ToDo APP</h2>
      </header>
      <div
        class="todo flex justify-center bg-yellow-600 ml-4 max-w-2xl flex-col gap-3 items-center rounded-2xl py-3"
      >
        <h2 class="text-2xl rounded-md text-gray-700">Todo Items</h2>
        <ul>
          <li
            v-for="todo in todos"
            :key="todo.id"
            class="list-disc text-green-700"
          >
            {{ todo.title }}
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <h2 class="text-center text-2xl text-red-700">
        You're are not an authorized user
      </h2>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import { fetchAuthorizedUsers } from "../services/userServices";
import { useAuth } from "../composables/useAuth";

const { user } = useAuth();
const isAuthorized = ref(false);
const todos = ref([]);
const loading = ref(true);

const loadDashboard = async (uid) => {
  try {
    const authorizedUsers = await fetchAuthorizedUsers();
    isAuthorized.value = authorizedUsers.includes(uid);

    const res = await fetch("http://localhost:3000/todos");
    if (!res.ok) {
      throw new Error(`Failed to fetch todos: ${res.status}`);
    }

    todos.value = await res.json();
    console.log(todos.value);
  } catch (error) {
    console.error("Unable to load dashboard data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (user.value?.uid) {
    loadDashboard(user.value.uid);
    return;
  }

  const stop = watch(
    () => user.value,
    (currentUser) => {
      if (!currentUser?.uid) return;
      stop();
      loadDashboard(currentUser.uid);
    },
    { immediate: true },
  );
});
</script>
<style scoped>
.todo {
  margin: 20px auto 0;
}
</style>
