<template>
  <q-page class="flex flex-center">

  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
  mounted() {
    this.$router.push("/explore");
  },
});
</script>
