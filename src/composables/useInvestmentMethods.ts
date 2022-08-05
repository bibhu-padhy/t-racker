import { Loading } from "quasar";
import { db, getUID } from "src/boot/firebase";
import { addDoc, collection } from "firebase/firestore";
import { Investment } from "src/modal/assets-investment";

const assetsInvestmentCollectionName = () => {
  return process.env.DEV
    ? `assets-investment-amount/${getUID()}/assetsList/`
    : `assets-investment-amount-PROD/${getUID()}/assetsList/`;
};

export const useInvestmentMethods = () => {

  const addInvestment = async (payload: Investment) => {
    try {
      Loading.show()
      await addDoc(collection(db, assetsInvestmentCollectionName()), payload);
      Loading.hide()
    } catch (error) {
      Loading.hide()
    }
  }

  return { addInvestment }
}
