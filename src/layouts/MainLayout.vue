<template>
  <q-layout
    class="row"
    :class="$q.screen.xs ? '' : 'justify-center items-center'"
    style="height: 100vh"
  >
    <q-page-container class="col-md-10 col-xs-12">
      <q-card :style="$q.screen.xs ? 'height: 100vh' : 'height: 90vh'">
        <router-view />
      </q-card>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";
const $q = useQuasar();
</script>
