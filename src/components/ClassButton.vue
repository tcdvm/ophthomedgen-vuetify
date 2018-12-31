<template>
  <v-btn
    class="bigButton"
    @click="$emit('select-class', drugclass)"
    @mouseover="$emit('change-info', index)"
  >
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    drugclass: {
      type: String,
      required: true
    },
    index: {
      type: Number,
      require: true
    }
  }
};
</script>

<style scoped>
>>> .v-btn__content {
  justify-content: left;
}
</style>
