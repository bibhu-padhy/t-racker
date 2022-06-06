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
      {{ dailyGain }}
    </div>
    <div v-if="dailyPercentageOnApr > 0 && formValue.investment">
      <div class="row">
        <q-btn @click="showWeekResult">Show 4 weeks result</q-btn>
        <q-checkbox
          @click="handleCompound"
          v-model="formValue.isCompound"
          label="compound your returns for"
        />
        <q-input
          hide-bottom-space
          type="number"
          @change="handleCompound"
          v-if="formValue.isCompound"
          class="q-ml-lg"
          v-model="formValue.selectedWeek"
        />
      </div>
      <div v-if="!formValue.isCompound">
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
      </div>

      <div v-else>
        <div
          class="text-h6"
          v-for="(count, index) of formValue.compoundedValues"
          :key="index"
        >
          <div>
            Day-{{ index + 1 }} = {{ count.investment }} -------- Gain =
            {{ count.dailyGain }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAprCalculatorMethods } from "../composables/useAprCalculatorMethods";
const {
  formValue,
  dailyPercentageOnApr,
  totalGain,
  dailyGain,
  showWeekResult,
  compoundedValue,
} = useAprCalculatorMethods();

const handleCompound = (e) => {
  if (formValue.isCompound) {
    compoundedValue();
  }
};
</script>

<style></style>
