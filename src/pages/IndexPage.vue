<template>
  <div class="main">
    <div class="row justify-center q-py-sm">
      <q-btn @click="openModal" flat>
        <q-icon name="add" />
      </q-btn>
      <q-dialog
        ref="dialogRef"
        position="top"
        transition-show="slide-up"
        transition-hide="slide-down"
        persistent
        v-model="isDialogForm"
      >
        <q-card style="width: 450px">
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
    <div class="row">
      <q-card v-for="item of projectsList" style="width: 300px" class="q-mx-sm">
        <q-card-section>
          <div>
            {{ item.name }}
          </div>
          <div>
            {{ item.investment }}
          </div>
          <div>
            {{ item.dailyApr }}
          </div>
          <div>
            {{ item.currentValue }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import ProjectList from "../components/ProjectList.vue";
import { reactive, ref } from "vue";

let isDialogForm = ref(false);
let projectsList = ref([]);
let dialogRef = ref(null);
let projectFormValue = reactive({
  name: "Demo",
  investment: "100",
  dailyApr: "1",
  currentValue: "",
});
const openModal = () => {
  isDialogForm.value = true;
};
const submit = () => {
  projectsList.value.push(projectFormValue);
};
</script>
