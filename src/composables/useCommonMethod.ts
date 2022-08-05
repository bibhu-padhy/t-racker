import { collection, getDocs } from "firebase/firestore";
import { db } from "src/boot/firebase";
export type AssetsType = {
  label: string;
  type: string;
  description: string;
  id: string
}
export const useCommonMethods = () => {
  const getAssetsType = async (): Promise<AssetsType[]> =>
    (await getDocs(collection(db, "assetsType")))
      .docChanges().map((i) => ({ ...i.doc.data(), id: i.doc.id })) as AssetsType[];

  return { getAssetsType };
};
