import { defineStore, acceptHMRUpdate } from "pinia";
import state from "./state";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db, firebaseAuth } from "../../boot/firebase";
import { Loading } from "quasar";

const collectionName = process.env.DEV ? "assets" : "assets-PROD";

const useAssetsStore = defineStore("assets", {
  state,
  actions: {
    async addAssets(payload) {
      try {
        Loading.show({
          message: "Saving assets..",
          messageColor: "black",
          backgroundColor: "grey",
        });

        await addDoc(
          collection(
            db,
            collectionName,
            firebaseAuth.currentUser.uid + "/assetsList"
          ),
          {
            ...payload,
            createdAt: new Date(),
            updatedAt: new Date(),
            currentValue: payload.investment,
            active: true,
          }
        );
        this.getAssetsList(firebaseAuth.currentUser.uid);
        Loading.hide();
      } catch (error) {
        console.log(error.message);
        Loading.hide();
      }
    },
    async getAssetsList(uid) {
      try {
        Loading.show({
          message: "Fetching assets..",
          messageColor: "black",
          backgroundColor: "grey",
        });
        const collectionRef = collection(
          db,
          collectionName,
          uid + "/assetsList"
        );
        const q = query(collectionRef, orderBy("createdAt"));
        onSnapshot(q, (val) => {
          this.assetsList = val.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
        });

        Loading.hide();
      } catch (error) {
        console.log(error.message);
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
        const collectionRef = collection(
          db,
          collectionName + "/" + firebaseAuth.currentUser.uid + "/assetsList",
          `${id}/claims`
        );
        const q = query(collectionRef, orderBy("createdAt"));
        onSnapshot(q, (val) => {
          if (val.empty) {
            this.claims = null;
          } else {
            this.claims = val.docs.map((doc) => doc.data());
          }
          Loading.hide();
        });
      } catch (error) {
        console.log(error.message);
        Loading.hide();
      }
    },

    async saveClaims(id, payload) {
      try {
        Loading.show({
          message: "Saving..",
          messageColor: "black",
          backgroundColor: "grey",
        });
        await addDoc(
          collection(
            db,
            collectionName + "/" + firebaseAuth.currentUser.uid + "/assetsList",
            `${id}/claims`
          ),
          payload
        );
        await this.getClaims(id);
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
