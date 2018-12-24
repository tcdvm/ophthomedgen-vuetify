<template>
  <div>
    <drug-button
      v-for="(drug, index) in drugList"
      :key="index"
      v-on:select-drug="selectDrug(index)"
      v-on:change-info="drugInfoUpdate(index)"
      class="bigButton"
      v-if="index < 6"
    >
      <!-- eslint-disable-next-line  -->
      {{(index+1<10) ? '(' + (index+1) + ')' : '' }} {{drug.drugName}}
    </drug-button>
    <drug-button
      v-for="(drug, index) in drugList"
      :key="index"
      v-on:select-drug="selectDrug(index)"
      v-on:change-info="drugInfoUpdate(index)"
      class="bigButton"
      v-if="index >= 6 && showMore == true"
    >
      <!-- eslint-disable-next-line  -->
      {{(index+1<10) ? '(' + (index+1) + ')' : '' }} {{drug.drugName}}
    </drug-button>

    <v-btn>
      {{ showMore ? "Less" : "More" }}
      <v-icon
        @click="toggleShowMore"
        v-show="this.drugList && this.drugList.length > 5"
        color="blue"
        large
      >{{ showMore ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
import DrugButton from "./DrugButton";

export default {
  components: {
    DrugButton
  },
  props: {
    drugList: Array
  },
  data: function() {
    return {
      showMore: false
    };
  },
  methods: {
    toggleShowMore() {
      this.showMore = !this.showMore;
    },
    selectDrug: function(index) {
      this.$emit("select-drug", index);
    },
    drugInfoUpdate: function(index) {
      this.$emit("change-info", index);
    }
  }
};
</script>

<style scoped>
>>> .bigButton {
  justify-content: left;
  text-transform: none;
  min-width: 250px;
}
</style>
