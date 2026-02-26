<template>
  <div class="w-full min-h-screen bg-slate-900 pt-20 text-white">
    <Header />
    <main class="mx-auto w-full px-4 flex flex-col gap-4 items-center">
      <WelcomeSection />
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
import { writeToDB } from "@/services/userServices";

import { onMounted, ref } from "vue";
import WelcomeSection from "@/components/WelcomeSection.vue";
import Header from "@/components/Header.vue";

const router = useRouter();
const { user } = useAuth();

const name = ref("");
const age = ref("");
const phoneNumber = ref("");
const userData = ref("");
const authorizedUsers = ref([]);

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
  router.push("/dashboard");
};

// const test = async () => {
//   try {
//     const savedValue = await writeToDB();
//     console.log("Realtime DB write success. posts/1/starCount =", savedValue);
//   } catch (error) {
//     console.error("Realtime DB write failed:", error);
//   }
// };
</script>
