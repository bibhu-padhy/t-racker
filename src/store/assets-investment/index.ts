import { defineStore } from "pinia";
import { Investment } from "src/modal/assets-investment";
import { useInvestmentMethods } from "src/composables/useInvestmentMethods";
const { addInvestment } = useInvestmentMethods()


export const useAssetsInvestmentStore = defineStore("investment", {
  state: () =>
  ({
    investments: [] as Investment[],
    loading: false,
  }),
  actions: {
    async addInvestment(payload) {
      await addInvestment(payload)
    }
  }
});
