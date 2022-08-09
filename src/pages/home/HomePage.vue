<template>
  <div class="row" style="height: 100%">
    <div
      class="col-md-4 col-xs-12 q-px-md q-py-lg"
      :style="!Screen.xs ? 'border-right: 1px solid black' : ''"
    >
      <div class="row justify-between items-center text-primary">
        <div class="q-gutter-x-sm row">
          <q-btn
            no-caps
            label="Add"
            @click="showAddAssetsDialog"
            :loading="assetsLoadingState"
          />
          <q-btn
            no-caps
            label="Report"
            @click="
              router.push({ name: !Screen.xs ? 'report' : 'mobile-report' })
            "
          />
          <q-skeleton
            width="80px"
            v-if="!totalInvestment && assetsLoadingState"
            type="text"
          />
          <div
            v-if="totalInvestment"
            class="text-body2 text-weight-bold text-blue-grey-8 text-center q-ml-md"
          >
            <div class="">Investment</div>
            <CurrencyWrapper :amount="totalInvestment" />
          </div>
        </div>
        <q-btn color="secondary" flat>
          <q-icon>
            <div v-if="!currentUser">
              <q-skeleton size="30px" type="QAvatar" />
            </div>
            <q-avatar v-else size="30px">
              <img :src="currentUser.photoURL" alt="" />
            </q-avatar>
          </q-icon>
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-list style="min-width: 100px" class="text-center">
                  <q-item>
                    <q-toggle
                      v-model="isDarkMode"
                      @click="Dark.toggle()"
                      :label="isDarkMode ? '☀️' : '🌑'"
                    ></q-toggle>
                  </q-item>
                  <q-item>
                    <q-toggle
                      v-model="showCurrency"
                      @click="toggleCurrency(!showCurrency)"
                      :label="showCurrency ? 'USD' : 'INR'"
                    ></q-toggle>
                  </q-item>
                  <q-item
                    clickable
                    v-close-popup🌜
                    @click="router.push({ name: 'explore' })"
                  >
                    <q-item-section>Explore</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="logout">
                    <q-item-section>Logout</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section class="q-mt-sm text-grey"
                      >V- 0.0.4</q-item-section
                    >
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-menu>
        </q-btn>
      </div>
      <div :style="Screen.xs ? 'width:100%' : 'width:40%'">
        <AssetsTypeDropDown
          @assetsType="handleAssetsType"
          :options="assetsTypeList"
        />
      </div>
      <div class="q-mt-md text-primary">
        <div
          v-if="showAssetsList.length === 0 && !loading"
          class="text-h6 text-secondary"
        >
          ☝️ Add assets
        </div>
        <div v-else>
          <q-card
            @click="showDetails(item)"
            v-for="(item, index) of showAssetsList"
            :key="index"
            class="row items-center q-mb-sm cursor-pointer"
          >
            <q-card-section>
              {{ item.name }}
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="col-md-8" v-if="!Screen.xs">
      <router-view />
    </div>
  </div>

  <q-dialog
    position="top"
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent
    v-model="isFormDialog"
  >
    <AddProjectDialog
      :options="assetsTypeList"
      @closeDialog="isFormDialog = !isFormDialog"
    />
  </q-dialog>
  <q-dialog
    position="top"
    transition-show="slide-up"
    transition-hide="slide-down"
    persistent
    v-model="isDetailsDialog"
  >
    <AssetsDetailsPage />
  </q-dialog>
</template>

<script setup lang="ts">
// composables
import { useCommonMethods } from "../../composables";

import { storeToRefs } from "pinia";
import { onMounted, provide, ref } from "vue";
import { useRouter } from "vue-router";
import { useAssetsStore, useUsersStore, useCommonStore } from "../../store";
import { getAuth, signOut } from "firebase/auth";
import { Screen, Dark } from "quasar";
// components
import AddProjectDialog from "./component/AddProjectDialog.vue";
import AssetsDetailsPage from "../../pages/AssetsDetailsPage.vue";
import CurrencyWrapper from "src/components/common/CurrencyWrapper.vue";
import AssetsTypeDropDown from "./component/AssetsTypeDropDown.vue";
import { AssetsType } from "src/composables/useCommonMethod";

const userStore = useUsersStore();
const assetsStore = useAssetsStore();
const commonStore = useCommonStore();
const { toggleCurrency } = useCommonStore();
const { showCurrency } = storeToRefs(commonStore);
const { getAssetsList, getAssetsById, getClaimById, setAssetsType } =
  assetsStore;
const { totalInvestment, assetsLoadingState, showAssetsList, loading } =
  storeToRefs(assetsStore);
const isDarkMode = ref(Dark.mode);
const router = useRouter();
const { currentUser } = storeToRefs(userStore);
const isFormDialog = ref(false);
const isDetailsDialog = ref(false);
const commonMethod = useCommonMethods();
const { getAssetsType } = commonMethod;

const assetsTypeList = ref<AssetsType[]>([]);

const showAddAssetsDialog = async () => {
  isFormDialog.value = true;
};
onMounted(async () => {
  assetsTypeList.value = await getAssetsType();
  await getAssetsList();
});

const handleAssetsType = (type) => {
  if (type) {
    setAssetsType(type.id);
  } else {
    setAssetsType(null);
  }
};

const logout = async () => {
  const auth = getAuth();
  await signOut(auth);
  router.push("/auth");
};

const showDetails = async (item) => {
  getAssetsById(item.id);
  await getClaimById(item.id);
  if (Screen.xs) {
    isDetailsDialog.value = true;
    return;
  }
  router.push(`/dashboard/${item.id}`);
};
</script>

<style></style>
