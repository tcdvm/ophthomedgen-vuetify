<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Ophtho Meds Generator (OMG)</span>
        <!-- <span class="font-weight-light">MATERIAL DESIGN</span> -->
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Instructions</span>
      </v-btn>
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
import HelloWorld from './components/HelloWorld'
import OphthoMedGen from './components/OphthoMedGen'

export default {
  name: 'App',
  components: {
    HelloWorld,
    OphthoMedGen,
  },
  data () {
    return {
      //
    }
  }
}
</script>
