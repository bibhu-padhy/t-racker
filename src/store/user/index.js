import { defineStore } from "pinia";
import state from "./state";

const useUsersStore = defineStore("user", {
  state: () => {
    return {
      currentUser: null,
    };
  },

  actions: {
    setCurrentUser(user) {
      this.currentUser = user;
    },
  },
});
export default useUsersStore;
