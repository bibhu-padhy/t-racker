import { defineStore, acceptHMRUpdate } from "pinia";
import state from "./state";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, firebaseAuth } from "../../boot/firebase";
import { Loading } from "quasar";

const assetsCollectionName = () => {
  const uid = firebaseAuth.currentUser?.uid || localStorage.getItem("uid");
  return process.env.DEV
    ? `assets/${uid}/assetsList/`
    : `assets-PROD//${uid}/assetsList/`;
};

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

        await addDoc(collection(db, assetsCollectionName()), {
          ...payload,
          createdAt: new Date(),
          updatedAt: new Date(),
          currentValue: payload.investment,
          active: true,
        });
        this.getAssetsList(firebaseAuth.currentUser.uid);
        Loading.hide();
      } catch (error) {
        console.log(error.message);
        Loading.hide();
      }
    },

    async deleteAssets(id) {
      try {
        Loading.show();
        const docRef = doc(db, assetsCollectionName(), id);
        await deleteDoc(docRef);
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
        const collectionRef = collection(db, assetsCollectionName());
        const q = query(
          collectionRef,
          orderBy("updatedAt"),
          where("active", "==", true)
        );
        onSnapshot(q, (val) => {
          if (val.empty) {
            this.$patch({ assetsList: null });
            return;
          }
          this.assetsList = val.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
        });

        Loading.hide();
      } catch (error) {
        Loading.hide();
      }
    },

    async updateAssets(assetsId, payload) {
      try {
        Loading.show();
        const docRef = doc(db, assetsCollectionName(), assetsId);
        await updateDoc(docRef, payload);
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
        const collectionRef = collection(
          db,
          assetsCollectionName(),
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
          collection(db, assetsCollectionName(), `${id}/claims`),
          payload
        );
        await this.getClaims(id);
        Loading.hide();
      } catch (error) {
        Loading.hide();
      }
    },
  },
  getters: {
    showTotalClaims() {
      if (this.claims) {
        return this.claims.reduce((acc, current) => acc + current.amount, 0);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAssetsStore, import.meta.hot));
}
export default useAssetsStore;
