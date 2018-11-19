<template>
  <v-card>
    <v-img
      :src="image"
      aspect-ratio="2.75"
    ></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{title}}</h3>
        <div v-html="panelText"></div>
      </div>
    </v-card-title>
    <v-card-actions v-if="seeNotesLink">
      <v-btn flat color="blue" :href="seeNotesLink" target="_blank">{{seeNotesText}}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    panelText: {
      type: String,
      required: true
    },
    seeNotesLink: {
      type: String,
      required: false
    },
    seeNotesText: {
      type: String,
      required: false
    }
  }
};
</script>

<style>
</style>
