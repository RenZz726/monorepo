<template>
  <div class="w-full min-h-screen bg-slate-900 pt-20 text-white">
    <header class="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur">
      <div
        class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4"
      >
        <h1
          class="text-2xl font-semibold bg-orange-500 px-4 py-2 rounded-md text-white"
        >
          FireBase & FireStore
        </h1>
        <button
          @click="handleLogout"
          class="rounded bg-blue-900 px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>
    </header>
    <main class="mx-auto w-full px-4 flex flex-col gap-4 items-center">
      <h1 v-if="user" class="text-3xl">Hi Buddy, LET'S GO...</h1>
      <div class="bg-slate-800 w-125 rounded-xl flex flex-col p-6 gap-2">
        <h1 class="text-center text-xl">Add personal Info</h1>
        <form class="flex flex-col gap-3" @submit.prevent="submitData">
          <input
            type="text"
            placeholder="name"
            v-model="name"
            class="placeholder:text-white p-4 border rounded-md"
          />
          <input
            type="text"
            placeholder="age"
            v-model="age"
            class="placeholder:text-white p-4 border rounded-md"
          />
          <input
            type="number"
            placeholder="phoneNumber"
            v-model="phoneNumber"
            class="placeholder:text-white p-4 border rounded-md"
          />
          <input type="submit" class="bg-emerald-600 p-3 rounded-md text-sm" />
        </form>
      </div>
      <div class="flex flex-col gap-6">
        <div class="flex gap-4">
          <button @click="getData" class="bg-orange-400 p-4 rounded-md">
            Get user data
          </button>
          <button @click="addUsingSet" class="bg-pink-600 p-4 rounded-md">
            Set data using Set()
          </button>
          <button @click="merge" class="bg-orange-600 p-4 rounded-md">
            Merge data
          </button>
          <button @click="update" class="bg-pink-400 p-4 rounded-md">
            Update data
          </button>
          <button @click="fetchAuthorized" class="bg-orange-400 p-4 rounded-md">
            Authorized Users
          </button>
          <button @click="goToToDo" class="bg-purple-700 p-4 rounded-md">
            MyToDo APP
          </button>
        </div>
        <p
          v-if="userData"
          class="bg-emerald-600 p-4 list-decimal pl-10 rounded-md mt-4"
        >
          <li v-for="user in userData" class="text-2xl">
            {{ user.id }} - {{ user.name }}
          </li>
        </p>
        <div>
          <h2
            v-if="authorizedUsers.includes(user.uid)"
            class="text-2xl text-emerald-500 text-center"
          >
            You're an authorized user!
          </h2>
          <h2 v-else class="text-red-600 text-center text-2xl">
            You're not an authorized user!
          </h2>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup>
import { useAuth } from "@/composables/useAuth";
import { useRouter } from "vue-router";
import {
  addUserData,
  addDataUsingSet,
  readUserData,
  mergeData,
  updateData,
  fetchAuthorizedUsers,
} from "@/services/userServices";
import { onMounted, ref } from "vue";

const { user, logout } = useAuth();
const router = useRouter();

const name = ref("");
const age = ref("");
const phoneNumber = ref("");
const userData = ref("");
const authorizedUsers = ref([]);

const handleLogout = async () => {
  try {
    await logout();
    await router.push("/login");
  } catch (error) {
    console.error("Error: ", error);
  }
};

const submitData = async () => {
  await addUserData(
    {
      name: name.value,
      age: age.value ? age.value : Math.floor(Math.random() * 80),
      phoneNumber: phoneNumber.value
        ? phoneNumber.value
        : Math.floor(Math.random(9999999999 - 6289212350) + 6289212350),
    },
    user.value.email,
  );
};

const getData = async () => {
  userData.value = await readUserData();
};

const addUsingSet = async () => {
  await addDataUsingSet(
    {
      name: name.value,
      age: 34,
      phoneNumber: 80807381,
    },
    user.value.email,
  );
};

const merge = async () => {
  {
    await mergeData();
  }
};

const update = async () => {
  await updateData();
};

onMounted(async () => {
  authorizedUsers.value = await fetchAuthorizedUsers();
});

const goToToDo = () => {
  router.push('/dashboard')
}
</script>
