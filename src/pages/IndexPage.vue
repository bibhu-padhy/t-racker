<template>
  <div class="main">
    <div class="row justify-center q-py-sm">
      <q-btn @click="openModal" flat>
        <q-icon name="add" />
      </q-btn>
      <q-btn color="primary" icon="menu" flat>
        <q-menu>
          <div class="row no-wrap q-pa-md">
            <div class="column items-center">
              <q-avatar size="72px">
                <img :src="userStore.photoURL" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">
                {{ userStore.displayName }}
              </div>
              <q-btn size="sm" class="q-my-sm" @click="router.push('/explore')">
                Calculator
              </q-btn>
              <q-btn
                label="Logout"
                push
                size="sm"
                v-close-popup
                @click="logout"
              />
            </div>
          </div>
        </q-menu>
      </q-btn>
      <q-dialog
        ref="dialogRef"
        position="top"
        transition-show="slide-up"
        transition-hide="slide-down"
        persistent
        v-model="isFormDialog"
      >
        <q-card style="width: 450px" class="q-mt-sm">
          <q-card-section class="row items-center">
            <div>Add Projects</div>
            <q-space />
            <q-btn flat v-close-popup round dense icon="close" />
          </q-card-section>
          <q-card-section>
            <q-input label="Name" v-model="projectFormValue.name" />
            <div class="row">
              <div class="col">
                <q-input
                  label="Investment"
                  v-model="projectFormValue.investment"
                />
              </div>
              <div class="col q-ml-sm">
                <q-input
                  label="Daily APR"
                  v-model="projectFormValue.dailyApr"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions class="row items-center">
            <q-btn v-close-popup label="cancel" flat />
            <q-space />
            <q-btn
              v-close-popup
              label="Submit"
              @click="submit"
              color="primary"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div class="container">
      <div
        v-if="projectsList.length"
        class="row items-center justify-between q-px-sm text-weight-bold"
      >
        <div>Name</div>
        <div>Investment</div>
      </div>
      <ProjectList
        :projectList="projectsList"
        @showDetails="showDetailsDialog"
      />
    </div>
    <q-dialog v-model="isDetailsDialog">
      <q-card style="width: 768px">
        <div class="text-center text-weight-bold text-h6">EMP-ETH</div>

        <q-separator inset />
        <q-card-section>
          <div class="row">
            <div class="col-5">
              <div>Investment= $1000</div>
              <div>Current = $ 800</div>
              <div>= $ 200</div>
            </div>
            <div class="col-7">
              <div class="row justify-between items-center">
                <div class="text-h6">Daily Returns -%0.7</div>
                <a>Generate Report</a>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import ProjectList from "../components/ProjectList.vue";
import { useUsersStore } from "../store";
import { reactive, ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";
const userStore = useUsersStore();
const router = useRouter();
let isFormDialog = ref(false);
let isDetailsDialog = ref(false);
let projectsList = ref([]);
let dialogRef = ref(null);
let projectFormValue = reactive({
  name: "Demo",
  investment: "100",
  dailyApr: "1",
  currentValue: "",
});

const openModal = () => {
  isFormDialog.value = true;
};
const logout = async () => {
  const auth = getAuth();
  await signOut(auth);
  router.push("/auth");
};
const submit = () => {
  projectsList.value.push(projectFormValue);
};
const showDetailsDialog = () => {
  isDetailsDialog.value = true;
};
</script>

<style lang="scss">
.container {
  max-width: 768px;
  margin: auto;
}
</style>
