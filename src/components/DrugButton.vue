<template>
  <v-btn
    @click="$emit('select-drug')"
    @mouseover="$emit('change-info')"
  > 
    <slot></slot>
  </v-btn>
</template>

<script>
export default {};
</script>

<style scoped>
>>> .v-btn__content {
  justify-content: left;
}
</style>
