<template>
  <div>{{ convertNumber }}</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useCommonStore } from "../../store";
const { showCurrency } = storeToRefs(useCommonStore());

const prop = defineProps({ amount: { default: "123" } });

const convertNumber = computed(() => {
  return showCurrency.value
    ? `$${thousandSeparator(prop.amount)}`
    : `${thousandSeparator(prop.amount * 79)}`;
});

const thousandSeparator = (amount) => {
  return amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};
</script>
