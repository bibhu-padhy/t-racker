<template>
  <q-card>
    <div>Details {{ obj.name }}</div>
    <q-btn @click="increment">text</q-btn>
  </q-card>
</template>
<script setup>
import { reactive } from "vue";
const obj = reactive({ name: "bibhu" });
const increment = () => (obj.name = "padhy");
</script>
<style lang=""></style>
