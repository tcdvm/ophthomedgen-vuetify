<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Ophtho</span>
        <span class="font-weight-light">Drugs</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="instructions" fullwidth>
        <v-btn slot="activator" color="primary" dark>
          <span class="mr-2">Instructions</span>
        </v-btn>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>How to use this website</v-card-title>

          <v-card-text>
            <v-img
              src="instructions1.png"
              alt="Hover over classes for more info, click on link to get to notes"
              contain
              height="550"
              max-height="771"
            ></v-img>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="dialog = false">I accept</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <v-content>
      <v-container grid-list-md fluid>
        <OphthoMedGen/>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
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
      instructions: false
    };
  }
};
</script>
