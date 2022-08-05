<template>
  <q-select
    class="q-mt-sm"
    v-model="selectedType"
    outlined
    color="primary"
    hide-bottom-space
    clearable
    :options="options"
    @update:model-value="$emit('assetsType', selectedType)"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
const selectedType = ref("");
const props = defineProps(["options"]);
</script>

<style lang="scss" scoped></style>
