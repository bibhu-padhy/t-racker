<template>
  <q-layout class="row justify-center items-center" style="height: 100vh">
    <q-page-container
      style="border: 5px solid black; height: 90vh"
      class="col-md-10 col-xs-12"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  router.replace({ path: "/dashboard", replace: "/" });
});
</script>
