import { defineStore } from "pinia";
import { Loading } from "quasar";

const useCommonStore = defineStore("common", {
  state: () => {
    return {
      loading: null,
    };
  },
  actions: {
    showLoading(message, messageColor = "black", backgroundColor = "grey") {
      Loading.show({
        message,
        messageColor,
        backgroundColor,
      });
      this.loading = true;
    },
    hideLoading() {
      Loading.hide();
      this.loading = false;
    },
  },
});
export default useCommonStore;
