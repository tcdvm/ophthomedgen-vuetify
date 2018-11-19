<template>
    <v-btn 
      class="bigButton" 
      @click="$emit('select-class', drugclass)"
      @mouseover="$emit('change-info', drugclass)">
      <slot></slot>
    </v-btn>
</template>

<script>
export default {
  props: {
    drugclass: {
      type: String,
      required: true
    }
  }

}
</script>

<style>

</style>
