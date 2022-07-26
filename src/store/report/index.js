import { defineStore, acceptHMRUpdate } from "pinia";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db, firebaseAuth } from "../../boot/firebase";
import { Loading } from "quasar";

const getUID = () => {
  return firebaseAuth.currentUser?.uid || localStorage.getItem("uid");
};

const claimCollectionPath = () => {
  return process.env.DEV
    ? `claims/${getUID()}/claimsList`
    : `claims-PROD/${getUID()}/claimsList`;
};
const collectionRef = () => collection(db, claimCollectionPath());
const useReportStore = defineStore("report", {
  state: () => {
    return {
      claims: [],
      error: null,
      loading: false,
    };
  },
  actions: {
    getUsersTotalClaim() {
      try {
        Loading.show({
          message: "Making your report...",
          messageColor: "black",
          backgroundColor: "grey",
        });
        this.$patch({ loading: true });
        const q = query(collectionRef(), orderBy("createdAt", "desc"));
        onSnapshot(q, (val) => {
          if (!val.empty) {
            const claims = val.docs.map((doc) => doc.data());
            this.$patch({ claims, error: null, loading: false });
          } else {
            console.log("no claim");
          }
        });
        Loading.hide();
      } catch (error) {
        Loading.hide();
        this.$patch = { claims, error: null, loading: false };
      }
    },
  },
  getters: {
    getTotalClaimAmount() {
      return this.claims.reduce((acc, cur) => (acc += cur.amount), 0);
    },

    highestClaimDetails() {
      return this.claims.reduce(
        (acc, cur) => {
          if (acc.amount < cur.amount) {
            console.log(acc);
            acc = cur;
          }
          return acc;
        },
        { amount: 0 }
      );
    },
    averageClaim() {
      return (this.getTotalClaimAmount / this.claims.length).toFixed(1);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useReportStore, import.meta.hot));
}
export default useReportStore;
