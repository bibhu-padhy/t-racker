<template>
  <q-card style="width: 450px" class="q-mt-sm">
    <q-card-section class="row items-center">
      <div class="text-h6 text-blue">Edit</div>
      <q-space />
      <q-btn
        flat
        v-close-popup
        round
        dense
        icon="close"
        class="text-body1 text-blue"
      />
    </q-card-section>
    <q-card-section>
      <q-form @submit="handleSubmit">
        <q-toggle v-model="selectedAssets.active" label="Active" />
        <q-input
          v-model="selectedAssets.name"
          class="q-mt-sm"
          outlined
          label="Name"
        />
        <q-input
          v-model="selectedAssets.currentValue"
          class="q-mt-sm"
          outlined
          label="Current Value"
          type="number"
        />
        <q-input
          v-model="selectedAssets.claim"
          class="q-mt-sm"
          outlined
          label="Claim"
          type="number"
        />
        <div class="row justify-end">
          <q-btn
            type="button"
            label="Delete"
            class="q-mt-sm q-mr-sm bg-red-6 text-grey-5"
            @click="handleDelete"
          />
          <q-btn
            type="submit"
            label="save"
            class="q-mt-sm bg-cyan-1 text-blue"
            v-close-popup
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAssetsStore } from "../store";
const assetsStore = useAssetsStore();
const { saveClaims, deleteAssetsList } = assetsStore;
const { selectedAssets } = storeToRefs(assetsStore);

const handleDelete = async () => {
  const res = await deleteAssetsList(selectedAssets.value.id);
  console.log(res);
};

const handleSubmit = async () => {
  const payload = {
    amount: +selectedAssets.value.claim,
    createdAt: new Date(),
  };
  await saveClaims(selectedAssets.value.id, payload);
};
</script>

<style lang="scss" scoped></style>
