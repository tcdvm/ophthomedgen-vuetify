<template>
  <v-dialog v-model="dialog" width="500" class="hey">
    <v-btn slot="activator" flat>
      <span class="mr-2">Templates</span>
    </v-btn>
    <v-card>
      <v-card-title
        class="title grey lighten-2"
        primary-title
      >Make sure you're confident of the diagnosis (category of template to be applied). Template will be appended to instructions.</v-card-title>
      <v-expansion-panel v-for="(value, key) in templates" :key="key">
        <v-expansion-panel-content>
          <div slot="header">{{key}}</div>
          <v-card>
            <v-card-text>
              {{value.description}}
              <v-radio-group v-model="eye" row>
                <v-radio label="OD" value="OD"></v-radio>
                <v-radio label="OS" value="OS"></v-radio>
                <v-radio label="OU" value="OU"></v-radio>
              </v-radio-group>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="appendDrugList(key)">Add {{key}} Template</v-btn>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>

<script>
import templates from "../assets/Templates.json";

export default {
  data() {
    return {
      dialog: false,
      eye: "",
      templates: templates
    };
  },
  methods: {
    appendDrugList: function(condition) {
      this.dialog = false;
      this.$emit("append-to-drugList", {
        eye: this.eye,
        drugs: this.templates[condition],
        ecollar: this.templates[condition].ecollar
      });
      // { eye: this.eye, drugList: this.templates[condition] });
    }
  }
};
</script>

<style>
a {
  text-decoration: underline;
}
</style>
