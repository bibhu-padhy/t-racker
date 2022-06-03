import { computed, reactive } from "vue";

export const useAprCalculatorMethods = () => {
  const formValue = reactive({
    aprValue: "",
    investment: "",
    weeksResults: [],
    isCompound: false,
  });

  const dailyPercentageOnApr = computed(() => {
    const result = +formValue.aprValue / 365;
    return Math.round(result * 100) / 100;
  });

  const gain = computed(() => {
    const percent = dailyPercentageOnApr.value / 100;
    return (
      Math.round(percent * showTwoDesimal(formValue.investment) * 100) / 100
    );
  });

  const totalGain = computed(() =>
    formValue.weeksResults.reduce((acc, current) => acc + current, 0)
  );

  const showWeekResult = () => {
    formValue.weeksResults = [];
    for (let week = 1; week <= 4; week++) {
      formValue.weeksResults.push(showTwoDesimal(gain.value * (7 * week)));
    }
  };

  const showTwoDesimal = (num) => (parseInt(num) * 100) / 100;

  return { formValue, dailyPercentageOnApr, gain, totalGain, showWeekResult };
};
