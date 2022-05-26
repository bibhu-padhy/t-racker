<template>
  <div class="q-mt-sm">
    <div class="text-h4 text-center">APR calculator</div>
    <div class="row">
      <div class="col q-mr-sm">
        <q-input
          label="APR"
          type="number"
          v-model="aprValue"
          outlined
        ></q-input>
      </div>
      <div class="col">
        <q-input
          v-if="dailyPercentageOnApr > 0"
          label="Investment"
          type="number"
          outlined
          v-model="investment"
        />
      </div>
    </div>
    <div class="text-h6 q-my-md">
      Daily percentage: {{ dailyPercentageOnApr }}%
    </div>

    <div class="text-h6 q-my-md" v-if="dailyPercentageOnApr > 0 && investment">
      Daily gain on {{ investment }} of {{ dailyPercentageOnApr }}% is
      {{ gain }}
    </div>
    <div v-if="dailyPercentageOnApr > 0 && investment">
      <q-btn @click="showWeekResult">Show 4 weeks result</q-btn>
      <div class="text-h6" v-for="(count, index) of weeksResults" :key="index">
        <div>Week-{{ index + 1 }} = {{ count }}</div>
      </div>
      <div v-if="weeksResults.length" class="text-h6">
        Total = {{ totalGain }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const aprValue = ref("");
const investment = ref("");
const weeksResults = ref([]);

// computed
const dailyPercentageOnApr = computed(() => {
  const result = +aprValue.value / 365;
  return Math.round(result * 100) / 100;
});
const gain = computed(() => {
  const percent = dailyPercentageOnApr.value / 100;
  return Math.round(percent * showTwoDesimal(investment.value) * 100) / 100;
});

const totalGain = computed(() =>
  weeksResults.value.reduce((acc, current) => acc + current, 0)
);

// methods
const showWeekResult = () => {
  weeksResults.value = [];
  for (let week = 1; week <= 4; week++) {
    weeksResults.value.push(showTwoDesimal(gain.value * (7 * week)));
  }
};

const showTwoDesimal = (num) => (parseInt(num) * 100) / 100;
</script>

<style></style>
