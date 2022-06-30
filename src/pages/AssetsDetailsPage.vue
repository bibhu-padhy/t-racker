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
          <div class="row q-mt-sm">
            <div class="label_width">Total Claims:</div>
            <div>$120</div>
          </div>
        </q-card-section>
        <q-card-section v-if="claims">
          <div class="text-h6 text-blue">Claims</div>
          <div v-for="(item, index) of claims" :key="index">
            Amount: {{ item.amount }}
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
import { ref } from "vue";
const assetsStore = useAssetsStore();
const { selectedAssets, claims } = storeToRefs(assetsStore);
const editDialog = ref(false);
</script>

<style lang="scss" scoped>
.label_width {
  width: 120px;
}
</style>
