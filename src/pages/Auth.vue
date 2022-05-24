<template>
  <div>
    <q-btn @click="googleLogin"> Login </q-btn>
  </div>
</template>
<script setup>
import { useUsersStore } from "../store";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { useRouter } from "vue-router";

const provider = new GoogleAuthProvider();
const auth = getAuth();
const userStore = useUsersStore();
const router = useRouter();

const googleLogin = async () => {
  try {
    await signInWithPopup(auth, provider);
    router.push("/");
  } catch (error) {
    userStore.$reset();
    console.log(error);
  }
};
</script>
<style lang=""></style>
