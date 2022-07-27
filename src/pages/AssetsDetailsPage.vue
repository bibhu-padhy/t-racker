<template>
  <q-card class="text-primary">
    <q-card-section class="row items-center justify-between">
      <div class="text-h6 text-uppercase">
        {{ selectedAssets?.name }}
      </div>
      <div>
        <q-btn label="Edit" @click="editDialog = true" />
        <q-btn
          class="q-mx-xs"
          v-if="Screen.xs"
          flat
          v-close-popup
          round
          dense
          icon="close"
        />
      </div>
    </q-card-section>

    <q-separator />
    <q-card-section class="text-body1 row text-center q-gutter-sm">
      <q-card>
        <q-card-section>
          <div class="label_width">Investment:</div>
          <CurrencyWrapper :amount="selectedAssets?.investment" />
        </q-card-section>
      </q-card>
      <q-card v-if="showTotalClaims">
        <q-card-section>
          <div class="label_width">Total Claims:</div>
          <CurrencyWrapper :amount="showTotalClaims" />
        </q-card-section>
      </q-card>
      <q-card v-if="averageClaim">
        <q-card-section>
          <div class="label_width">Average Claim:</div>
          <CurrencyWrapper :amount="averageClaim" />
        </q-card-section>
      </q-card>

      <q-card v-if="highestClaim">
        <q-card-section>
          <div class="label_width">Highest Claim:</div>
          <CurrencyWrapper :amount="highestClaim" />
        </q-card-section>
      </q-card>
    </q-card-section>
    <q-card-section style="max-height: 350px; overflow-y: auto">
      <div class="row items-center">
        <div class="text-h6 text-weight-bolder">Claims</div>
        <q-input
          v-model="claim"
          class="q-ml-sm"
          borderless
          placeholder="Add Claims..."
          type="number"
          style="width: 100px"
          @keyup.enter="handleSaveClaims"
        />
      </div>

      <div v-for="(item, index) of claims" :key="index">
        <div class="row items-center">
          <div class="col-3">
            <CurrencyWrapper :amount="item.amount" />
          </div>
          <div class="text-grey-7">
            {{ formateDate(item.createdAt) }}
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
  <q-dialog
    v-model="editDialog"
    position="top"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <EditAssetsDialog @deleteAssetsTrue="handleDeleteAssets" />
  </q-dialog>
</template>

<script setup>
import EditAssetsDialog from "../components/EditAssetsDialog.vue";
import CurrencyWrapper from "../components/common/CurrencyWrapper.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useAssetsStore } from "../store";
import { ref } from "vue";
import { Screen } from "quasar";
import { date } from "quasar";
const router = useRouter();
const assetsStore = useAssetsStore();
const { saveClaims, deleteAssets } = assetsStore;
const { selectedAssets, claims, showTotalClaims, averageClaim, highestClaim } =
  storeToRefs(assetsStore);

const editDialog = ref(false);
const claim = ref("");

const formateDate = (timestamp) =>
  date.formatDate(timestamp.toDate(), "ddd - MMMM - YY");

const handleDeleteAssets = async (id) => {
  deleteAssets(id);
  router.back();
  editDialog.value = false;
};

const handleSaveClaims = async () => {
  if (claim.value.length) {
    const payload = {
      amount: +claim.value,
      createdAt: new Date(),
      assetsId: selectedAssets.value.id,
    };
    await saveClaims(payload);
    claim.value = "";
  }
};
</script>

<style lang="scss" scoped>
.label_width {
  width: 120px;
}
</style>
