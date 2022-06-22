import { defineStore, acceptHMRUpdate } from "pinia";
import state from "./state";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../boot/firebase";
import { Loading } from "quasar";

const useAssetsStore = defineStore("assets", {
  state,
  actions: {
    async getAssetsList() {
      try {
        Loading.show({
          message: "Fetching assets..",
          messageColor: "black",
          backgroundColor: "grey",
        });
        const projectListRef = await getDocs(collection(db, "projectList"));
        this.assetsList = projectListRef.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        Loading.hide();
      } catch (error) {
        Loading.hide();
      }
    },

    getAssetsById(id) {
      this.selectedAssets = this.assetsList.find((item) => item.id === id);
    },

    async getClaims(id) {
      try {
        Loading.show({
          message: "Fetching Claims",
          messageColor: "black",
          backgroundColor: "grey",
        });
        const claimsRef = await getDocs(
          collection(db, `projectList/${id}/claim/`)
        );
        const claims = claimsRef.docs.map((doc) => doc.data());
        this.selectedAssets = { claims, ...this.selectedAssets };
        Loading.hide();
      } catch (error) {
        console.log(error.message);
        Loading.hide();
      }
    },
    async saveClaims(id, payload) {
      console.log(id);
      console.log(payload);
      try {
        Loading.show({
          message: "Saving..",
          messageColor: "black",
          backgroundColor: "grey",
        });
        await addDoc(collection(db, `projectList/${id}/claim/`), payload);
        await this.getAssetsById(id);
        Loading.hide();
      } catch (error) {
        console.log(error.message);
        Loading.hide();
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAssetsStore, import.meta.hot));
}
export default useAssetsStore;
