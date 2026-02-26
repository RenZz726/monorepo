<template>
  <div>
    <h1 v-if="user" class="text-3xl">
      Hi {{ user.email.split("@")[0].toUpperCase() }}, Welcome to the StAcK!
    </h1>
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
      <div>
        <button @click="handleRealTimeView" class="bg-violet-700 p-4 rounded-md">
          RealTime Database
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
    </div>
  </div>
</template>
<script setup>
import { useAuth } from "@/composables/useAuth";
import { readUserData } from "@/services/userServices";
import { router } from "@/router";

import { ref } from "vue";


const { user } = useAuth();

const userData = ref("");

const getData = async () => {
  userData.value = await readUserData();
};

const handleRealTimeView = () => {
  router.push('/dashboard/realtimedb')
}
</script>
