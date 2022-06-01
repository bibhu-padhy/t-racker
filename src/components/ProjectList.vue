<template>
  <q-list
    @click="handleShowDetails(item)"
    bordered
    separator
    v-for="(item, index) of projectList"
    :key="index"
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
const handleShowDetails = (item) => {
  emits("showDetails", item);
};
</script>
<style></style>
