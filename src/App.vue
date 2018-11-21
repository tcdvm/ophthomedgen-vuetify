<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Ophtho Drugs</span>
        <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
          <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn
        slot="activator"
        color="primary"
        dark
      >
      <span class="mr-2">Instructions</span>
      </v-btn>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-toolbar>

    <v-content>
      <v-container fluid grid-list-md>
        <!-- <v-layout row wrap> -->
          <!-- <v-flex lg6> -->
            <OphthoMedGen/>
          <!-- </v-flex> -->
          <!-- <v-flex lg6> -->
            <!-- <HelloWorld/> -->
          <!-- </v-flex> -->
        <!-- </v-layout> -->
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import OphthoMedGen from "./components/OphthoMedGen";

export default {
  name: "App",
  components: {
    HelloWorld,
    OphthoMedGen
  },
  data() {
    return {
      //
    };
  }
};
</script>
