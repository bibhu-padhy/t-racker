<template>
  <q-page class="row justify-center">
    <div class="q-mt-lg col-sm-6 col-xs-10">
      <!-- <q-input
        v-model="projectName"
        type="text"
        label="Project Name"
        outlined
      /> -->
      <q-select
        class="q-mt-sm"
        outlined
        v-model="projectType"
        :options="projectTypeOptions"
        label="Project Type"
        @update:model-value="(val) => handleProjectType(val)"
      />
      <div v-if="projectType === 'Node'">
        <q-input
          class="q-mt-sm"
          v-model="NodeType.tokenCount"
          type="number"
          label="Token to create a node"
          outlined
        />
        <q-input
          v-if="NodeType.tokenCount"
          class="q-mt-sm"
          v-model="NodeType.NodeCount"
          type="number"
          label="Total Node count"
          outlined
        />
        <q-input
          v-if="NodeType.NodeCount"
          class="q-mt-sm"
          v-model="NodeType.dailyReturns"
          type="number"
          label="Daily returns per node"
          outlined
        />
        <q-input
          v-if="NodeType.dailyReturns"
          class="q-mt-sm"
          v-model="NodeType.tokenPrice"
          type="number"
          label="Token Price"
          outlined
        />
        <q-btn
          v-if="
            NodeType.tokenCount &&
            NodeType.NodeCount &&
            NodeType.dailyReturns &&
            NodeType.tokenPrice
          "
          color="primary"
          icon="check"
          label="Check"
          @click="handleNodeType"
        />
        <q-table
          v-if="
            NodeType.tokenCount &&
            NodeType.NodeCount &&
            NodeType.dailyReturns &&
            NodeType.tokenPrice
          "
          :columns="columns"
          :rows="columnsData"
          row-key="day"
        />
      </div>
      <div v-if="projectType === 'BBF'">
        <q-input
          class="q-mt-sm"
          v-model="BffType.initialInvestment"
          type="number"
          label="Initial Investment"
          outlined
        />
        <q-input
          class="q-mt-sm"
          v-model="BffType.dailtReturns"
          type="number"
          label="Daily Returns"
          outlined
        />
        <q-btn
          class="q-my-lg"
          color="primary"
          icon="check"
          label="Check"
          @click="handleBBF"
        />
        <q-table
          :pagination="initialPagination"
          :rows="bffColumnsData"
          :columns="bffColumns"
          row-key="name"
        >
          <template v-slot:top> Total profit = {{ bffTotalProfit }} </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      projectName: "",
      projectType: "",
      projectTypeOptions: ["Node", "BBF", "MDTF"],
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
      },
      BffType: {
        initialInvestment: "",
        dailtReturns: "",
      },
      columns: [
        {
          name: "day",
          label: "Days",
          align: "center",
          field: "day",
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
      bffTotalProfit: "",
    };
  },
  methods: {
    handleProjectType(e) {
      this.NodeType = {
        tokenCount: "",
        NodeCount: "",
        dailyReturns: "",
        tokenPrice: "",
      };
    },
    calculatePercentage(percentage, number) {
      const percent = percentage / 100;

      return Math.round(percent * number * 100) / 100;
    },
    handleBBF() {
      this.bffColumnsData = [];
      let investment = parseInt(this.BffType.initialInvestment);

      for (let day = 1; day <= 28; day++) {
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
        investment =
          this.calculatePercentage(
            parseInt(this.BffType.dailtReturns),
            investment
          ) + investment;
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
      const dailyTotalReturns = this.calculatePercentage(
        this.NodeType.dailyReturns,
        this.NodeType.NodeCount * this.NodeType.tokenCount
      );
      for (let day = 1; day <= 100; day++) {
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
