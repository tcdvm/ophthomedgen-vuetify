<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Ophtho</span>
        <span class="font-weight-light">Drugs</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat href="https://vetophtho.org" target="_blank">
        <span class="mr-2">Ophtho Notes</span>
      </v-btn>
      <v-btn flat href="https://templates.vetophtho.org" target="_blank">
        <span class="mr-2">Templates</span>
      </v-btn>
      <v-dialog v-model="instructions" max-width="1220">
        <v-btn slot="activator" color="primary" dark>
          <span class="mr-2">Instructions</span>
        </v-btn>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>How to use this website</v-card-title>
          <v-card-text>
            <v-carousel interval="10000000" height="100%" light>
              <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
                style="height: 100%;width:100%"
              ></v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-content>
      <v-container grid-list-md fluid>
        <OphthoMedGen/>
      </v-container>
      <v-dialog
        v-model="feedback"
        max-width="640px"
        max-height="751px"
        transition="dialog-bottom-transition"
      >
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdbYYXcdItvIEffPYIsCCZWqO5fco73W_YVTKrQW75gH7FiyQ/viewform?embedded=true"
          width="640"
          height="751"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >Loading...</iframe>
      </v-dialog>
    </v-content>
    <v-footer app height="auto" color="grey lighten-3">
      <v-layout row justify-space-between>
        <v-flex align-self-center grey--text xs5 pl-5>
          <h3>
            Website by
            <strong>Thomas Chen</strong>, University of Tennessee
          </h3>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex grey--text xs2 pr-5>
          <v-btn @click="feedback = true" flat small>Something broken? Have feedback?</v-btn>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import OphthoMedGen from "./components/OphthoMedGen";

export default {
  name: "App",
  components: {
    OphthoMedGen
  },
  data() {
    return {
      instructions: true,
      feedback: false,
      items: [
        {
          src: "instructions/instructions1.png"
        },
        {
          src: "instructions/instructions2.png"
        },
        {
          src: "instructions/instructions3.png"
        },
        {
          src: "instructions/instructions4.png"
        },
        {
          src: "instructions/instructions5.png"
        },
        {
          src: "instructions/instructions6.png"
        },
        {
          src: "instructions/instructions7.png"
        },
        {
          src: "instructions/typing_cat.gif"
        }
      ]
    };
  }
};
</script>

<style scoped>
.footer-container {
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>
