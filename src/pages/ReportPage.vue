<template>
  <q-card>
    <q-card-section class="text-center text-h6 text-primary">
      {{ today }}
    </q-card-section>
    <q-separator />
    <q-card-section class="text-primary row q-gutter-md">
      <q-card>
        <q-card-section>
          <div class="label_width">Total Claim:</div>
          <div>$ 1200</div>
        </q-card-section>
      </q-card>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { date } from "quasar";
const today = ref(date.formatDate(new Date(), "dddd-MM-YYYY"));
</script>

<style lang="scss" scoped></style>
