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

const getUID = () => {
  return firebaseAuth.currentUser?.uid || localStorage.getItem("uid");
};

const assetsCollectionName = () => {
  return !process.env.DEV
    ? `assets/${getUID()}/assetsList/`
    : `assets-PROD/${getUID()}/assetsList/`;
};

const claimCollectionPath = () => {
  return !process.env.DEV
    ? `claims/${getUID()}/claimsList`
    : `claims-PROD/${getUID()}/claimsList`;
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
        await this.getAssetsList();
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

    async getAssetsList() {
      try {
        Loading.show({
          message: "Fetching assets..",
          messageColor: "black",
          backgroundColor: "grey",
        });
        this.$patch({ loading: true });
        const collectionRef = collection(db, assetsCollectionName());
        const q = query(
          collectionRef,
          orderBy("updatedAt"),
          where("active", "==", true)
        );
        console.log("calling");
        onSnapshot(q, (val) => {
          if (val.empty) {
            this.$patch({ assetsList: null, loading: false });
            return;
          }
          this.$patch({
            assetsList: val.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })),
            loading: false,
          });
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

    async getClaimById(id) {
      try {
        Loading.show({
          message: "Fetching Claims",
          messageColor: "black",
          backgroundColor: "grey",
        });
        const collectionRef = collection(db, claimCollectionPath());

        const q = query(
          collectionRef,
          orderBy("createdAt", "desc"),
          where("assetsId", "==", id)
        );
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

    async saveClaims(payload) {
      try {
        Loading.show({
          message: "Saving..",
          messageColor: "black",
          backgroundColor: "grey",
        });
        await addDoc(collection(db, claimCollectionPath()), payload);
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
    assetsLoadingState() {
      return this.loading;
    },

    totalInvestment() {
      if (this.assetsList) {
        return this.assetsList.reduce(
          (acc, current) => (acc += +current.investment),
          0
        );
      }
    },
    averageClaim() {
      if (this.claims) {
        return (this.showTotalClaims / this.claims.length).toFixed(1);
      }
    },
    highestClaim() {
      if (this.claims) {
        return this.claims.reduce((acc, current) => {
          if (acc < current.amount) {
            acc = current.amount;
          }
          return acc;
        }, 0);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAssetsStore, import.meta.hot));
}
export default useAssetsStore;
