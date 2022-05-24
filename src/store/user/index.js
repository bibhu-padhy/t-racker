import { defineStore } from "pinia";
import state from "./state";

const useUsersStore = defineStore("user", {
  state,
  actions: {
    setUser(user) {
      this.displayName = user.displayName;
      this.email = user.email;
      this.uid = user.uid;
      this.photoURL = user.photoURL;
    },
  },
});
export default useUsersStore;
