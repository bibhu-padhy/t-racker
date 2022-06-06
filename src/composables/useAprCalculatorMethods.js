import { computed, reactive } from "vue";

export const useAprCalculatorMethods = () => {
  const formValue = reactive({
    aprValue: "",
    investment: "",
    weeksResults: [],
    isCompound: false,
    selectedWeek: "1",
    compoundedValues: [],
  });

  const dailyPercentageOnApr = computed(() => formValue.aprValue / 365);

  const dailyGain = computed(() =>
    calculateDailyPercentage(formValue.investment, dailyPercentageOnApr.value)
  );

  const calculateDailyPercentage = (num, percentage) =>
    (showTwoDesimal(num) * percentage) / 100;

  const totalGain = computed(() =>
    formValue.weeksResults.reduce((acc, current) => acc + current, 0)
  );

  const showWeekResult = () => {
    formValue.isCompound = false;
    formValue.weeksResults = [];
    for (let week = 1; week <= 4; week++) {
      formValue.weeksResults.push(showTwoDesimal(dailyGain.value * (7 * week)));
    }
  };
  const compoundedValue = () => {
    formValue.compoundedValues = [];
    const week = +formValue.selectedWeek * 7;

    let initialInvestment = +formValue.investment;

    for (let day = 1; day <= week; day++) {
      formValue.compoundedValues.push({
        investment: showTwoDesimal(
          initialInvestment +
            calculateDailyPercentage(
              initialInvestment,
              dailyPercentageOnApr.value
            )
        ),
        dailyGain: calculateDailyPercentage(
          initialInvestment,
          dailyPercentageOnApr.value
        ),
      });
      initialInvestment += calculateDailyPercentage(
        initialInvestment,
        dailyPercentageOnApr.value
      );
    }
  };
  const showTwoDesimal = (num) => Math.round((parseInt(num) * 100) / 100);

  return {
    formValue,
    dailyPercentageOnApr,
    dailyGain,
    totalGain,
    showWeekResult,
    compoundedValue,
  };
};
