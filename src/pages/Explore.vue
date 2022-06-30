<template>
  <q-page class="row justify-center">
    <div class="q-mt-lg col-sm-6 col-xs-10">
      <AprCalculator />
    </div>
  </q-page>
</template>
<script>
import AprCalculator from "../components/AprCalculator.vue";
export default {
  data() {
    return {
      projectName: "",
      projectType: "",
      projectTypeOptions: ["Node", "BBF", "MDTF", "APR"],
      initialPagination: {
        sortBy: "desc",
        descending: false,
        page: 1,
        rowsPerPage: 7,
      },
      NodeType: {
        tokenCount: "",
        NodeCount: "",
        dailyReturns: "",
        tokenPrice: "",
        totalInvestment: "",
      },
      BffType: {
        initialInvestment: "",
        dailtReturns: "",
      },
      DailyRoiType: {
        initialInvestment: "",
        percentage: "",
        totalROI: "",
        totalPercentage: "",
      },
      columns: [
        {
          name: "day",
          label: "Days",
          align: "center",
          field: "day",
        },
        {
          name: "total",
          align: "center",
          label: "Total",
          field: "total",
        },
        {
          name: "returns",
          align: "center",
          label: "Returns",
          field: "returns",
        },
      ],
      columnsData: [],
      bffColumns: [
        {
          name: "day",
          label: "Days",
          align: "center",
          field: "day",
        },
        {
          name: "investment",
          align: "center",
          label: "investment",
          field: "investment",
        },
        {
          name: "returns",
          align: "center",
          label: "returns",
          field: "returns",
        },
        {
          name: "takeout",
          align: "center",
          label: "Takeout",
          field: "takeout",
        },
      ],
      bffColumnsData: [],
      dailyReturnsData: [],
      bffTotalProfit: "",
    };
  },
  components: { AprCalculator },
  methods: {
    handleProjectType(e) {
      this.NodeType = {
        tokenCount: "",
        NodeCount: "",
        dailyReturns: "",
        tokenPrice: "",
      };
      this.BffType = {};
    },
    calculatePercentage(percentage, number) {
      const percent = percentage / 100;

      return Math.round(percent * number * 100) / 100;
    },
    calculateDailyPercentage() {
      const { percentage, initialInvestment } = this.DailyRoiType;

      this.dailyReturnsData = [];
      let investment = parseInt(initialInvestment);
      for (let day = 1; day <= 45; day++) {
        this.dailyReturnsData.push({
          day,
          total: investment,
          returns: this.calculatePercentage(percentage, investment),
        });
        investment = Math.round(
          this.calculatePercentage(percentage, investment) + investment
        );
      }
      this.DailyRoiType.totalPercentage = Math.round(
        this.calculatePercentage(percentage, investment)
      );
      this.DailyRoiType.totalROI = Math.round(investment);
    },
    handleBBF() {
      this.bffColumnsData = [];
      let investment = parseInt(this.BffType.initialInvestment);

      for (let day = 1; day <= 84; day++) {
        this.bffColumnsData.push({
          day,
          investment: Math.round(investment * 1000) / 1000,
          returns:
            day % 7 === 0
              ? null
              : this.calculatePercentage(
                  parseInt(this.BffType.dailtReturns),
                  investment
                ),
          takeout:
            day % 7 === 0
              ? this.calculatePercentage(
                  parseInt(this.BffType.dailtReturns),
                  investment
                )
              : null,
        });
        if (day % 7 !== 0) {
          investment =
            this.calculatePercentage(
              parseInt(this.BffType.dailtReturns),
              investment
            ) + investment;
        }
      }
      this.bffColumnsData.forEach((row) => {
        if (row.takeout) {
          console.log(row.takeout);
          this.bffTotalProfit =
            Math.round((row.takeout + this.bffTotalProfit) * 100) / 100;
        }
      });
    },
    handleNodeType() {
      this.columnsData = [];
      this.NodeType.totalInvestment = "";
      const dailyTotalReturns = this.calculatePercentage(
        this.NodeType.dailyReturns,
        this.NodeType.NodeCount * this.NodeType.tokenCount
      );
      this.NodeType.totalInvestment =
        this.NodeType.tokenCount *
        this.NodeType.NodeCount *
        this.NodeType.tokenPrice;
      for (let day = 1; day <= 90; day++) {
        this.columnsData.push({
          day,

          returns: day * dailyTotalReturns * this.NodeType.tokenPrice,
        });
      }
    },
  },
};
</script>
<style></style>
