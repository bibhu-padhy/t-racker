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
        <q-toggle
          v-close-popup
          v-model="selectedAssets.active"
          @update:model-value="handleActive"
          label="Active"
        />
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
        <div class="row justify-between items-center">
          <q-btn
            icon="delete"
            type="button"
            color="red"
            flat
            @click="handleDelete"
          />
          <q-btn icon="done" type="submit" flat color="primary" v-close-popup />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAssetsStore } from "../store";
import { useRoute } from "vue-router";

const route = useRoute();
const assetsStore = useAssetsStore();
const { deleteAssets, updateAssets } = assetsStore;
const { selectedAssets } = storeToRefs(assetsStore);

const handleDelete = async () => {
  await deleteAssets(selectedAssets.value.id);
};

const handleActive = async () => {
  const payload = {
    active: selectedAssets.value.active,
  };
  await updateAssets(route.params.id, payload);
};

const handleSubmit = async () => {
  if (selectedAssets.value.name && selectedAssets.value.currentValue) {
    const payload = {
      name: selectedAssets.value.name,
      currentValue: selectedAssets.value.currentValue,
      modifiedAt: new Date(),
    };
    await updateAssets(route.params.id, payload);
  }
};
</script>

<style lang="scss" scoped></style>
