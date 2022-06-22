import { Loading } from "quasar";

export const useCommonMethods = () => {
  const showLoading = (
    message,
    messageColor = "black",
    backgroundColor = "grey"
  ) => {
    console.log("loading");
    Loading.show({
      message,
      messageColor,
      backgroundColor,
    });
    this.loading = true;
  };
  const hideLoading = () => {
    Loading.hide();
    this.loading = false;
  };

  return { showLoading, hideLoading };
};
