<template>
  <q-card style="width: 450px" class="q-ma-sm">
    <q-card-section class="row items-center">
      <div>Add Projects</div>
      <q-space />
      <q-btn flat v-close-popup round dense icon="close" />
    </q-card-section>
    <q-card-section>
      <q-input label="Name" outlined v-model="projectFormValue.name" />
      <q-select
        class="q-mt-sm"
        v-model="projectFormValue.type"
        outlined
        emit-value
        color="primary"
        multiple
        clearable
        use-chips
        hide-bottom-space
        map-options
        :options="options"
      />
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
      <q-btn label="Submit" @click="handleAddAssets" color="primary" />
    </q-card-actions>
  </q-card>
</template>
<script setup lang="ts">
import { useCommonMethods } from "src/composables/useCommonMethod";
import { useAssetsStore } from "src/store";
import { onMounted, reactive } from "vue";

const { addAssets } = useAssetsStore();

const props = defineProps(["options"]);
const emits = defineEmits(["closeDialog"]);

const projectFormValue = reactive({
  name: "",
  investment: "",
  type: [],
});

const handleAddAssets = async () => {
  const createdAt = new Date();
  const payload = {
    ...projectFormValue,
    type: projectFormValue.type.map((i) => i.id),
    createdAt,
    updatedAt: createdAt,
    currentValue: projectFormValue.investment,
    active: true,
  };

  await addAssets(payload);
  await emits("closeDialog", true);
};

onMounted(async () => {});
</script>
<style lang=""></style>
