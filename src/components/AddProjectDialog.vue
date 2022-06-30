<template>
  <div>
    <q-card style="width: 450px" class="q-mt-sm">
      <q-card-section class="row items-center">
        <div>Add Projects</div>
        <q-space />
        <q-btn flat v-close-popup round dense icon="close" />
      </q-card-section>
      <q-card-section>
        <q-input label="Name" outlined v-model="projectFormValue.name" />
        <q-input
          outlined
          type="number"
          label="Investment"
          v-model="projectFormValue.investment"
          class="q-my-sm"
        />
      </q-card-section>
      <q-card-actions class="row items-center">
        <q-btn v-close-popup label="cancel" flat />
        <q-space />
        <q-btn
          v-close-popup
          label="Submit"
          @click="handleAddAssets"
          color="primary"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import { useAssetsStore } from "../store";

const { addAssets } = useAssetsStore();

const projectFormValue = reactive({
  name: "",
  investment: "",
});

const handleAddAssets = async () => {
  console.log(projectFormValue);
  await addAssets(projectFormValue);
};
</script>
<style lang=""></style>
