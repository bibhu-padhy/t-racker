<template>
  <div class="q-mt-sm">
    <div class="text-h4 text-center">APR calculator</div>
    <div class="row">
      <div class="col q-mr-sm">
        <q-input
          label="APR"
          type="number"
          v-model="formValue.aprValue"
          outlined
        ></q-input>
      </div>
      <div class="col">
        <q-input
          v-if="dailyPercentageOnApr > 0"
          label="Investment"
          type="number"
          outlined
          v-model="formValue.investment"
        />
      </div>
    </div>
    <div class="text-h6 q-my-md">
      Daily percentage: {{ dailyPercentageOnApr }}%
    </div>

    <div
      class="text-h6 q-my-md"
      v-if="dailyPercentageOnApr > 0 && formValue.investment"
    >
      Daily gain on {{ formValue.investment }} of {{ dailyPercentageOnApr }}% is
      {{ gain }}
    </div>
    <div v-if="dailyPercentageOnApr > 0 && formValue.investment">
      <q-btn @click="showWeekResult">Show 4 weeks result</q-btn>
      <div
        class="text-h6"
        v-for="(count, index) of formValue.weeksResults"
        :key="index"
      >
        <div>Week-{{ index + 1 }} = {{ count }}</div>
      </div>
      <div v-if="formValue.weeksResults.length" class="text-h6">
        Total = {{ totalGain }}
      </div>
      <q-checkbox v-model="right" label="" />
    </div>
  </div>
</template>

<script setup>
import { useAprCalculatorMethods } from "../composables/useAprCalculatorMethods";
const { formValue, dailyPercentageOnApr, totalGain, gain, showWeekResult } =
  useAprCalculatorMethods();
</script>

<style></style>
