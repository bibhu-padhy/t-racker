<template>
  <div>
    <div v-if="selectedAssets">
      <q-card class="q-ma-lg bg-cyan-1 text-blue">
        <q-card-section class="row items-center justify-between">
          <div class="text-h6 text-uppercase">
            {{ selectedAssets.name }}
          </div>
          <q-btn label="Edit" @click="editDialog = true" />
        </q-card-section>

        <q-separator />
        <q-card-section class="text-body1 q-mt-md">
          <div class="row">
            <div class="label_width">Investment:</div>
            <div>${{ selectedAssets.investment }}</div>
          </div>
          <div v-if="showTotalClaims" class="row q-mt-sm">
            <div class="label_width">Total Claims:</div>
            <div>$ {{ showTotalClaims }}</div>
          </div>
        </q-card-section>
        <q-card-section v-if="claims">
          <div class="text-h6 text-blue text-weight-bolder">Claims</div>

          <div v-for="(item, index) of claims" :key="index">
            <div class="row justify-between items-center">
              <div class="col-3">$ {{ item.amount }}</div>
              <div class="col-4">
                {{ formateDate(item.createdAt) }}
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div v-else>Please select an assets</div>
    <q-dialog
      v-model="editDialog"
      position="top"
      transition-show="slide-up"
      transition-hide="slide-down"
      persistent
    >
      <EditAssetsDialog />
    </q-dialog>
  </div>
</template>

<script setup>
import EditAssetsDialog from "../components/EditAssetsDialog.vue";
import { storeToRefs } from "pinia";
import { useAssetsStore } from "../store";
import { computed, ref } from "vue";
import { date } from "quasar";
const assetsStore = useAssetsStore();
const { selectedAssets, claims, showTotalClaims } = storeToRefs(assetsStore);
const editDialog = ref(false);

const formateDate = (timestamp) =>
  date.formatDate(timestamp.toDate(), "dddd MM YY");
</script>

<style lang="scss" scoped>
.label_width {
  width: 120px;
}
</style>
