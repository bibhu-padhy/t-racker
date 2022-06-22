<template>
  <div class="row justify-center items-center" style="height: 100vh">
    <div class="col-md-10 col-xs-12" style="border: 5px solid black">
      <div class="row" style="height: 90vh">
        <div
          class="col-md-4 col-xs-12 q-px-md q-py-lg"
          style="border-right: 1px solid black"
        >
          <div class="row justify-between items-center">
            <div class="q-gutter-x-sm">
              <q-btn no-caps label="Add" />
              <q-btn no-caps label="Report" />
            </div>
            <q-avatar text-color="secondary" icon="account_circle" />
          </div>
          <div class="q-mt-md">
            <div
              @click="showDetails(item)"
              v-for="(item, index) of assetsList"
              :key="index"
              class="row items-center q-mb-sm q-pl-sm cursor-pointer"
              style="border: 1px solid black; height: 50px; border-radius: 5px"
            >
              {{ item.name }}
            </div>
          </div>
        </div>
        <div class="col-md-8" style="border-left: 1px solid black">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// composables
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAssetsStore } from "../store";
const assetsStore = useAssetsStore();
const { getAssetsList, getAssetsById, getClaims } = assetsStore;
const { assetsList } = storeToRefs(assetsStore);
const router = useRouter();

onMounted(async () => {
  await getAssetsList();
});

const showDetails = async (item) => {
  router.push(`/${item.id}`);
  getAssetsById(item.id);
  await getClaims(item.id);
};
</script>

<style></style>
