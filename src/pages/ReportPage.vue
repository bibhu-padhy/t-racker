<template>
  <q-card>
    <q-card-section class="text-center text-h6 text-primary">
      {{ today }}
    </q-card-section>
    <q-separator />
    <q-card-section class="text-primary row q-gutter-md text-center">
      <q-card v-if="claims.length">
        <q-card-section>
          <div class="label_width">Total Claim:</div>
          <CurrencyWrapper :amount="getTotalClaimAmount" />
        </q-card-section>
      </q-card>
      <q-card v-if="claims.length">
        <q-card-section>
          <div class="label_width">Highest Claim</div>
          <div>
            <CurrencyWrapper :amount="highestClaimDetails.amount" /> on
            {{ handleFormatDate(highestClaimDetails.createdAt, "MM/d/YY") }}
            <div>Assets: {{ highestClaimDetails.assetsName }}</div>
          </div>
        </q-card-section>
      </q-card>
      <q-card v-if="averageClaim">
        <q-card-section>
          <div class="label_width">Average Claim:</div>
          <CurrencyWrapper :amount="averageClaim" />
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { date } from "quasar";
import { useReportStore } from "../store";
import { storeToRefs } from "pinia";
import CurrencyWrapper from "src/components/common/CurrencyWrapper.vue";

const reportStore = useReportStore();
const { getUsersTotalClaim } = reportStore;
const { claims, getTotalClaimAmount, highestClaimDetails, averageClaim } =
  storeToRefs(reportStore);

const today = computed(() => handleFormatDate());

const handleFormatDate = (d = new Date(), format = "dddd-MM-YYYY") =>
  date.formatDate(new Date(), format);

onMounted(async () => {
  await getUsersTotalClaim();
});
</script>

<style lang="scss" scoped></style>
