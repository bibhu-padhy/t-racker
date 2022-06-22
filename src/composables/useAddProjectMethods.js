import { reactive, ref } from "vue";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../boot/firebase";
import { Loading } from "quasar";
export const useAddProjectMethods = () => {
  const collectionName = "projectList";
  const projectsList = ref([]);
  const projectFormValue = reactive({
    name: "",
    investment: "",
  });
  const projectSubmit = async () => {
    await addDoc(collection(db, collectionName), {
      ...projectFormValue,
      createdAt: new Date(),
      updatedAt: new Date(),
      currentValue: projectFormValue.investment,
    });
  };
  const getProjectList = async () => {
    try {
      Loading.show({
        message: "Fetching assets..",
        messageColor: "black",
        backgroundColor: "grey",
      });
      const projectListRef = await getDocs(collection(db, collectionName));
      projectsList.value = projectListRef.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      Loading.hide();
    } catch (error) {
      Loading.hide();
    }
  };
  return { projectsList, projectFormValue, projectSubmit, getProjectList };
};
