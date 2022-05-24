<template>
  <q-list
    @click="handleShowDetails"
    bordered
    separator
    v-for="item of projectList"
    class="q-mt-sm"
  >
    <q-item class="items-center row justify-between text-weight-medium">
      <div>
        {{ item.name }}
      </div>
      <div>
        {{ item.investment }}
      </div>
    </q-item>
  </q-list>
</template>
<script setup>
const props = defineProps({
  projectList: {
    default: [],
    type: Array,
  },
});
const emits = defineEmits(["showDetails"]);
const handleShowDetails = () => {
  emits("showDetails");
};
</script>
<style></style>
