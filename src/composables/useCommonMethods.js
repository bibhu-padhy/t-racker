import { Notify } from "quasar";

export const useCommonMethods = () => {
  const showAlert = (message, type = "success", position = "top") => {
    console.log("show alert");
    Notify.create({
      message,
      color: type,
      position,
    });
  };
  return { showAlert };
};
