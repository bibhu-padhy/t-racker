<template>
  <div class="main">
    <div class="row justify-center q-py-sm">
      <q-btn @click="openModal" flat>
        <q-icon name="add" />
      </q-btn>
      <q-btn color="primary" flat>
        <q-icon>
          <q-avatar size="40px">
            <img :src="userStore.photoURL" />
          </q-avatar>
        </q-icon>
        <q-menu>
          <div class="row no-wrap q-pa-md">
            <div class="column items-center">
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
              <span class="q-mt-sm text-grey"> V- 0.0.4 </span>
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
        <AddProjectDialog />
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
              <div>Invested= ${{ selectedProject.investment }}</div>
              <div>Current = ${{ selectedProject.currentValue }}</div>
              <div>
                Total PnL= $
                {{ selectedProject.investment - selectedProject.currentValue }}
              </div>
            </div>
            <div class="col-7">
              <div class="row justify-between items-center">
                <div class="text-h6">APR: {{ selectedProject.currentApr }}</div>
                <q-btn>Generate Report</q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import ProjectList from "../components/Home/ProjectList.vue";
import { useUsersStore } from "../store";
import { ref, onMounted } from "vue";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

// components
import AddProjectDialog from "../components/AddProjectDialog.vue";

// composables
import { useAddProjectMethods } from "../composables/useAddProjectMethods";

const { getProjetList, projectsList } = useAddProjectMethods();
const userStore = useUsersStore();

const router = useRouter();
let isFormDialog = ref(false);
let isDetailsDialog = ref(false);

let dialogRef = ref(null);
let selectedProject = ref({});
onMounted(async () => {
  await getProjetList();
});

const openModal = () => {
  isFormDialog.value = true;
};
const logout = async () => {
  const auth = getAuth();
  await signOut(auth);
  router.push("/auth");
};

const showDetailsDialog = (item) => {
  isDetailsDialog.value = true;
  selectedProject.value = item;
};
</script>

<style lang="scss">
.container {
  max-width: 768px;
  margin: auto;
}
</style>
