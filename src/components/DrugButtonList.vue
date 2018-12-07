<template>
  <div>
    <drug-button
      v-for="(drug, index) in drugList" 
      :key=index
      v-on:select-drug="selectDrug(index)"
      v-on:change-info="drugInfoUpdate(index)"
      class="bigButton"
    >
    <!-- eslint-disable-next-line  -->
    {{(index+1<10) ? '(' + (index+1) + ')' : '' }} {{drug.drugName}}
    </drug-button>
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
    return {};
  },
  methods: {
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
