<template>
  <v-layout row wrap>
    <v-snackbar v-model="snackbar" :color="sbcolor" :timeout="1500" :top="sbposition">
      {{ sbtext }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-flex lg7>
      <v-tabs v-model="activeTab" color="primary" dark slider-color="yellow">
        <v-tab key="selectmeds" ripple>Select Medications</v-tab>
        <v-tab key="entermeds" ripple @click="addSelectedMed">Enter Medications</v-tab>
        <v-tab-item key="selectmeds">
          <v-stepper v-model="step" vertical>
            <v-stepper-step :complete="step > 1" step="1">Choose a class of medication</v-stepper-step>
            <v-stepper-content step="1">
              <!-- Medication Class Selector -->
              <v-layout>
                <v-flex sm4>
                  <v-list>
                    <v-list-tile v-for="(value, key) in drugClasses" :key="key">
                      <v-list-tile-content>
                        <class-button
                          v-on:select-class="selectClass($event)"
                          v-on:change-info="changeClassInfo($event)"
                          :drugclass="value.drugClass"
                          :index="key"
                        >{{value.buttonText}}</class-button>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-flex>

                <!-- INFO CARD -->
                <v-flex sm7 pb-2>
                  <transition name="fade" mode="out-in">
                    <drug-class-info-panel
                      :key="drugClass.title"
                      :image="drugClassInfo.image"
                      :title="drugClassInfo.title"
                      :panelText="drugClassInfo.panelText"
                      :seeNotesLink="drugClassInfo.seeNotesLink"
                      :seeNotesText="drugClassInfo.seeNotesText"
                    ></drug-class-info-panel>
                  </transition>
                </v-flex>
              </v-layout>
            </v-stepper-content>

            <v-stepper-step :complete="step > 2" step="2">Choose the medication</v-stepper-step>

            <v-stepper-content step="2">
              <v-layout>
                <v-flex sm4>
                  <drug-button-list
                    :drugList="getDrugList()"
                    v-on:select-drug="selectDrug($event)"
                    v-on:change-info="drugInfoUpdate($event)"
                  ></drug-button-list>
                  <v-btn
                    class="regButton"
                    color="light-blue lighten-4"
                    @click="this.prevState"
                  >(esc) Go to prev step
                    <v-icon dark right>backspace</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex sm7 pb-2>
                  <v-card :key="drugInfo.drugName">
                    <v-card-title primary-title>
                      <div>
                        <h3 class="headline mb-0">{{drugInfo.drugName}}</h3>
                        <span class="grey--text">{{drugInfo.drugFormulation}}</span>
                        <div>
                          <vue-simple-markdown :source="drugInfo.drugBlurb"></vue-simple-markdown>
                        </div>
                        <br>
                      </div>
                    </v-card-title>
                    <v-card-actions></v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-stepper-content>

            <v-stepper-step :complete="step > 3" step="3">Choose the treated eye(s)</v-stepper-step>

            <v-stepper-content step="3">
              <section v-show="state == 'chooseEye' || state =='chooseFreq' || state == 'ready'">
                <v-btn @click="selectEye('OS')">(1) OS</v-btn>

                <v-btn @click="selectEye('OD')">(2) OD</v-btn>

                <v-btn @click="selectEye('OU')">(3) OU</v-btn>
              </section>
              <v-btn
                class="regButton"
                color="light-blue lighten-4"
                @click="this.prevState"
              >(esc) Go to prev step
                <v-icon dark right>backspace</v-icon>
              </v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="step > 4" step="4">Choose the Frequency</v-stepper-step>
            <v-stepper-content step="4">
              <!-- Frequency Selector -->
              <v-btn @click="selectFreq('q24h')">(1) q24h</v-btn>

              <v-btn @click="selectFreq('BID')">(2) BID</v-btn>

              <v-btn @click="selectFreq('TID')">(3) TID</v-btn>

              <v-btn @click="selectFreq('QID')">(4) QID</v-btn>

              <v-btn @click="selectFreq('q4h')">(5) q4h</v-btn>

              <v-btn @click="selectFreq('q2h')">(6) q2h</v-btn>

              <v-btn
                class="regButton"
                color="light-blue lighten-4"
                @click="this.prevState"
              >(esc) Go to prev step
                <v-icon dark right>backspace</v-icon>
              </v-btn>

              <v-alert :value="true" type="info">
                <strong>Need to do different frequencies of the same drug for different eyes? Change to the "Enter Medications" tab to edit the directions directly.</strong>
              </v-alert>
            </v-stepper-content>

            <v-stepper-step step="5">Hit Enter or Click "Add" to Add the medication</v-stepper-step>
            <v-stepper-content step="5">
              <v-btn @click="addDrug()">
                (Enter) Add {{this.drug.drugName}} {{this.sigEye}} {{this.sigFrequency}}
                <v-icon dark right>add_circle</v-icon>
              </v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-tab-item>

        <v-tab-item key="entermeds">
          <v-layout align-center justify-center>
            <v-flex>
              <v-card flat>
                <v-card-title primary-title>
                  <h3 class="headline">Write Custom Medication Instructions</h3>
                </v-card-title>
                <v-card-text>
                  <v-form ref="form">
                    <v-textarea
                      v-model="entermedsText"
                      clearable
                      outline
                      label="Enter the medications instructions here"
                      solo
                      hint="E.g. Prednisone 5 mg tablets - Please give 1 tablet orally twice daily. Side effects include... Do not stop abrupty."
                    ></v-textarea>
                    <v-btn @click="addCustomDrug">submit</v-btn>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-tab-item>
      </v-tabs>
    </v-flex>

    <v-flex lg5>
      <v-layout justify-center column>
        <v-flex lg12>
          <v-card>
            <v-card-text>
              <h3 v-if="activeTab==0">(E)-collar:</h3>
              <h3 v-if="activeTab==1">E-collar:</h3>
              <v-radio-group v-model="ecollar" mt-0 row>
                <v-radio value>
                  <div slot="label">Not needed (no text)</div>
                </v-radio>
                <v-radio value="alltimes">
                  <div slot="label">At all times</div>
                </v-radio>
                <v-radio value="prn">
                  <div slot="label">When unmonitored</div>
                </v-radio>
              </v-radio-group>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <v-card>
            <v-layout align-center justify-start wrap>
              <v-flex>
                <v-btn
                  v-shortkey="['ctrl', 'c']"
                  @shortkey="doCopy()"
                  @click="doCopy()"
                  flat
                >(Ctrl-C) Copy to Clipboard</v-btn>
              </v-flex>
              <v-flex>
                <v-btn flat @click="popDrugList()">Remove Last</v-btn>
              </v-flex>
              <v-flex>
                <v-btn color="red" @click="clearDrugList()" flat>Clear All</v-btn>
              </v-flex>
              <v-flex>
                <v-tooltip top>
                  <ophtho-drug-template
                    slot="activator"
                    v-on:append-to-drugList="appendDrugs($event)"
                  ></ophtho-drug-template>
                  <span>Want a quick and dirty template for a specific ophthalmic condition?
                    <br>If you know what you're doing click the below button:
                  </span>
                </v-tooltip>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex>
                <v-textarea
                  class="padded-textarea"
                  solo
                  readonly
                  v-model="instructions"
                  placeholder="Medication instructions here (readonly - make any needed changes after pasting)."
                  rows="35"
                  id="instructions"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
    <!-- <v-flex lg12>
      <v-card>
        <v-card-text>Drug to be added:
          <br>
          Drug Class: {{drugClass}}
          <br>
          Drug Name: {{this.drug.drugName}}
          <br>
          Sig: {{this.sigEye}} {{this.sigFrequency}}
          <br>
          State: {{state}}
          <br>
          e-collar: {{ecollar}}
          <ul>
            <p v-for="(item, key) in drugList" :key="key">{{ item }}</p>
          </ul>
        </v-card-text>
      </v-card>
    </v-flex>-->
    <a
      class="button"
      style="display: none;"
      v-shortkey="{ 
          '1': ['1'],
          '2': ['2'],
          '3': ['3'],
          '4': ['4'],
          '5': ['5'],
          '6': ['6'],
          '7': ['7'],
          '8': ['8'],
          '9': ['9'],
          '0': ['0'],
          'e': ['e'],
          'esc': ['esc'],
          'enter': ['enter']
        }"
      @shortkey="handleShortCut"
    >shortcuts</a>
  </v-layout>
</template>

<script>
import drugs from "../assets/Drugs.json";
import drugClasses from "../assets/DrugClasses.json";
import VueSimpleMarkdown from "vue-simple-markdown";
import "vue-simple-markdown/dist/vue-simple-markdown.css";
import Vue from "vue";
import SelectionStepper from "./SelectionStepper";
import ClassButton from "./ClassButton";
import DrugButtonList from "./DrugButtonList";
import DrugClassInfoPanel from "./DrugClassInfoPanel";
import OphthoDrugTemplate from "./OphthoDrugTemplate";

Vue.use(VueSimpleMarkdown);

Vue.component("tab-home", {
  template: "<div>Home component</div>"
});

export default {
  components: {
    SelectionStepper,
    ClassButton,
    DrugButtonList,
    DrugClassInfoPanel,
    OphthoDrugTemplate
  },
  data: function() {
    return {
      drugClasses,
      entermedsText: "",
      step: 1,
      state: "chooseClass", // chooseClass, chooseDrug, chooseEye, chooseFreq, ready
      drugClass: "",
      activeClassBtn: "",
      activeDrugBtn: null,
      activeTab: 0,
      ecollar: "", // null (no cone), all (at all times), prn (unmonitored or if pawing noted)
      drug: { drugName: "" },
      sigEye: "",
      sigFrequency: "",
      drugList: [],
      antibiotics: drugs.Antibiotics,
      antiinflammatories: drugs.Antiinflammatories,
      glaucomameds: drugs.Glaucoma,
      kcsmeds: drugs.KCS,
      miscmeds: drugs.Misc,
      drugClassInfo: {
        image: "cat.png",
        title: "Hover your mouse",
        panelText:
          "<div>To display information about the class of medications as well as see links to more information from your class notes.</div>",
        seeNotesLink: "",
        seeNotesText: ""
      },
      drugInfo: {
        drugName: "Medication Information",
        drugFormulation: "",
        drugBlurb:
          "Hover over each drug for a little blurb on the medication and its use."
      },
      sbtext: "",
      snackbar: false,
      sbcolor: "success",
      sbposition: true
    };
  },
  methods: {
    changeClassInfo(index) {
      this.drugClassInfo.image = drugClasses[index].image;
      this.drugClassInfo.title = drugClasses[index].title;
      this.drugClassInfo.panelText = drugClasses[index].panelText;
      this.drugClassInfo.seeNotesLink = drugClasses[index].seeNotesLink;
      this.drugClassInfo.seeNotesText = drugClasses[index].seeNotesText;
    },
    addSelectedMed: function() {
      if (this.drug.drugName && this.drug.formulation) {
        this.entermedsText =
          this.drug.drugName +
          " " +
          this.drug.formulation +
          " - Please apply " +
          (this.drug.dose ? this.drug.dose : "___ENTER_DRUG_DOSE___") +
          " to " +
          (this.sigEye ? toEnglish(this.sigEye) : "___ENTER_EYES___") +
          " " +
          (this.sigFrequency
            ? toEnglish(this.sigFrequency)
            : "___ENTER_FREQUENCY___") +
          ".  " +
          this.drug.clientInfo;
      }
    },
    scrollToEnd: function() {
      if (typeof this.$el !== "undefined") {
        var instructions = this.$el.querySelector("#instructions");
        instructions.scrollTop = instructions.scrollHeight;
      }
    },
    getDrugList: function() {
      const drugClassDrugList = {
        antibiotic: drugs.Antibiotics,
        antiinflammatory: drugs.Antiinflammatories,
        glaucoma: drugs.Glaucoma,
        kcs: drugs.KCS,
        misc: drugs.Misc
      };
      return drugClassDrugList[this.drugClass];
    },
    popDrugList: function() {
      this.drugList.pop();
    },
    clearDrugList: function() {
      this.drugList = [];
    },
    appendDrugs: function(drugTemplate) {
      this.ecollar = drugTemplate.ecollar ? drugTemplate.ecollar : this.ecollar;
      drugTemplate.drugs.drugList.forEach(function(element) {
        element.eye = drugTemplate.eye;
      });
      this.drugList = this.drugList.concat(drugTemplate.drugs.drugList);
    },
    resetInfo: function() {
      this.classInfo.title = "Hover for Info";
      this.classInfo.srcImage = "cat.png";
    },
    drugInfoUpdate: function(index) {
      switch (this.drugClass) {
        case "antibiotic":
          this.drugInfo.drugName = this.antibiotics[index].drugName;
          this.drugInfo.drugBlurb = this.antibiotics[index].blurb;
          this.drugInfo.drugFormulation = this.antibiotics[index].formulation;
          break;
        case "antiinflammatory":
          this.drugInfo.drugName = this.antiinflammatories[index].drugName;
          this.drugInfo.drugBlurb = this.antiinflammatories[index].blurb;
          this.drugInfo.drugFormulation = this.antiinflammatories[
            index
          ].formulation;
          break;
        case "glaucoma":
          this.drugInfo.drugName = this.glaucomameds[index].drugName;
          this.drugInfo.drugBlurb = this.glaucomameds[index].blurb;
          this.drugInfo.drugFormulation = this.glaucomameds[index].formulation;
          break;
        case "kcs":
          this.drugInfo.drugName = this.kcsmeds[index].drugName;
          this.drugInfo.drugBlurb = this.kcsmeds[index].blurb;
          this.drugInfo.drugFormulation = this.kcsmeds[index].formulation;
          break;
        case "misc":
          this.drugInfo.drugName = this.miscmeds[index].drugName;
          this.drugInfo.drugBlurb = this.miscmeds[index].blurb;
          this.drugInfo.drugFormulation = this.miscmeds[index].formulation;
          break;
      }
    },
    selectClass: function(drugclass) {
      this.drugClass = drugclass;
      this.state = "chooseDrug";
      this.step = 2;
    },
    selectDrug: function(index) {
      switch (this.drugClass) {
        case "antibiotic":
          this.drug = this.antibiotics[index];
          break;
        case "antiinflammatory":
          this.drug = this.antiinflammatories[index];
          break;
        case "glaucoma":
          this.drug = this.glaucomameds[index];
          break;
        case "kcs":
          this.drug = this.kcsmeds[index];
          break;
        case "misc":
          this.drug = this.miscmeds[index];
          break;
      }
      this.activeDrugBtn = index;
      this.state = "chooseEye";
      this.step = 3;
    },
    selectEye: function(eye) {
      this.sigEye = eye;
      this.state = "chooseFreq";
      this.step = 4;
      // console.log("hi");
    },
    selectFreq: function(freq) {
      this.sigFrequency = freq;
      this.state = "ready";
      this.step = 5;
    },
    addDrug: function() {
      this.drugList.push({
        drug: this.drug,
        eye: this.sigEye,
        frequency: this.sigFrequency
      });
      this.drug = { drugName: "" };
      this.drugClass = "";
      this.sigEye = "";
      this.sigFrequency = "";
      this.activeClassBtn = "";
      this.activeDrugBtn = null;
      this.state = "chooseClass";
      this.step = 1;
    },
    addCustomDrug: function() {
      this.drugList.push({ customText: this.entermedsText });
      this.entermedsText = "";
      this.drug = { drugName: "" };
      this.drugClass = "";
      this.sigEye = "";
      this.sigFrequency = "";
      this.activeClassBtn = "";
      this.activeDrugBtn = null;
      this.state = "chooseClass";
      this.step = 1;
    },
    prevState: function() {
      switch (this.state) {
        case "chooseClass":
        case "chooseDrug":
          this.drugClass = "";
          this.activeClassBtn = "";
          this.drug = { drugName: "" };
          this.sigEye = "";
          this.sigFrequency = "";
          this.state = "chooseClass";
          this.step = this.step > 1 ? this.step - 1 : 1;
          break;
        case "chooseEye":
          this.sigEye = "";
          this.sigFrequency = "";
          this.activeDrugBtn = null;
          this.drug = { drugName: "" };
          this.state = "chooseDrug";
          this.step = this.step > 1 ? this.step - 1 : 1;
          break;
        case "chooseFreq":
          this.sigEye = "";
          this.sigFrequency = "";
          this.state = "chooseEye";
          this.step = this.step > 1 ? this.step - 1 : 1;
          break;
        case "ready":
          this.state = "chooseFreq";
          this.sigFrequency = "";
          this.step = this.step > 1 ? this.step - 1 : 1;
          break;
      }
    },
    handleShortCut(event) {
      switch (event.srcKey) {
        case "e":
          if (this.ecollar == "") this.ecollar = "alltimes";
          else if (this.ecollar == "alltimes") this.ecollar = "prn";
          else if (this.ecollar == "prn") this.ecollar = "";
          this.scrollToEnd();
          break;
        case "enter":
          if (this.state == "ready") this.addDrug();
          break;
        case "esc":
          this.prevState();
          break;
        case "1":
          switch (this.state) {
            case "chooseClass":
              this.selectClass("antibiotic");
              break;
            case "chooseDrug":
              this.selectDrug(0);
              break;
            case "chooseEye":
              this.selectEye("OS");
              break;
            case "chooseFreq":
              this.selectFreq("q24h");
              break;
            case "ready":
              break;
          }
          break;
        case "2":
          switch (this.state) {
            case "chooseClass":
              this.selectClass("antiinflammatory");
              break;
            case "chooseDrug":
              this.selectDrug(1);
              break;
            case "chooseEye":
              this.selectEye("OD");
              break;
            case "chooseFreq":
              this.selectFreq("BID");
              break;
            case "ready":
              break;
          }
          break;
        case "3":
          switch (this.state) {
            case "chooseClass":
              this.selectClass("glaucoma");
              break;
            case "chooseDrug":
              this.selectDrug(2);
              break;
            case "chooseEye":
              this.selectEye("OU");
              break;
            case "chooseFreq":
              this.selectFreq("TID");
              break;
            case "ready":
              break;
          }
          break;
        case "4":
          switch (this.state) {
            case "chooseClass":
              this.selectClass("kcs");
              break;
            case "chooseDrug":
              this.selectDrug(3);
              break;
            case "chooseEye":
              break;
            case "chooseFreq":
              this.selectFreq("QID");
              break;
            case "ready":
              break;
          }
          break;
        case "5":
          switch (this.state) {
            case "chooseClass":
              this.selectClass("misc");
              break;
            case "chooseDrug":
              this.selectDrug(4);
              break;
            case "chooseEye":
              break;
            case "chooseFreq":
              this.selectFreq("q4h");
              break;
            case "ready":
              break;
          }
          break;
        case "6":
          switch (this.state) {
            case "chooseClass":
              // this.selectClass('misc')
              break;
            case "chooseDrug":
              this.selectDrug(5);
              break;
            case "chooseEye":
              break;
            case "chooseFreq":
              this.selectFreq("q2h");
              break;
            case "ready":
              break;
          }
          break;
        case "7":
          switch (this.state) {
            // case 'chooseClass':
            //   this.selectClass('misc')
            //   break;
            case "chooseDrug":
              this.selectDrug(6);
              break;
            case "chooseEye":
              break;
            case "chooseFreq":
              break;
            case "ready":
              break;
          }
          break;
        case "8":
          switch (this.state) {
            // case 'chooseClass':
            //   this.selectClass('misc')
            //   break;
            case "chooseDrug":
              this.selectDrug(7);
              break;
            case "chooseEye":
              break;
            case "chooseFreq":
              break;
            case "ready":
              break;
          }
          break;
        case "9":
          switch (this.state) {
            // case 'chooseClass':
            //   this.selectClass('misc')
            //   break;
            case "chooseDrug":
              this.selectDrug(8);
              break;
            case "chooseEye":
              break;
            case "chooseFreq":
              break;
            case "ready":
              break;
          }
          break;
      }
    },
    doCopy() {
      this.$copyText(this.instructions).then();
      this.sbtext = "Copied to clipboard!";
      this.sbcolor = "success";
      this.snackbar = true;
    }
  },
  computed: {
    instructions: function() {
      let medicationInstructions = "";
      let numTopical = 0;
      let i = 0;

      for (i = 0; i < this.drugList.length; i++) {
        let drugInstruction = "";

        if (this.drugList.length > 1) {
          drugInstruction += (i + 1).toString() + ". ";
        }

        if (this.drugList[i].drug) {
          if (this.drugList[i].drug.route == "topical") numTopical++;

          drugInstruction +=
            this.drugList[i].drug.drugName +
            " " +
            this.drugList[i].drug.formulation +
            " - Please apply " +
            this.drugList[i].drug.dose +
            " to " +
            toEnglish(this.drugList[i].eye) +
            " " +
            toEnglish(this.drugList[i].frequency) +
            ".  " +
            this.drugList[i].drug.clientInfo +
            "\n\n";
        } else if (this.drugList[i].customText) {
          drugInstruction += `${this.drugList[i].customText}\n\n`;
        }
        medicationInstructions += drugInstruction;
      }

      if (this.activeTab == 0) {
        if (this.step > 1)
          medicationInstructions += `\n---------------------------\n\n TO BE ADDED (${
            this.drugClass
          }): ${this.drug.drugName} ${this.sigEye} ${
            this.sigFrequency
          }\n\n------------------------------\n\n`;
      } else if (this.activeTab == 1) {
        if (this.entermedsText)
          medicationInstructions += `\n---------------------------\n\n TO BE ADDED: ${
            this.entermedsText
          }\n\n-----------------------------\n\n`;
      }

      if (numTopical > 1) {
        medicationInstructions +=
          "** If giving more than one topical medication in the same eye at the same time, please wait at least 5-10 minutes between each medication to allow for proper distribution and absorption; give any ointments or gels (thicker medications) LAST **\n\n";
      }

      if (this.ecollar === "alltimes") {
        medicationInstructions +=
          "** Please ensure that the cone (e-collar) is worn at ALL times, (even with eating, drinking, sleeping) in order to protect the eyes from self-trauma.**\n\n";
      } else if (this.ecollar === "prn") {
        medicationInstructions +=
          "** Please ensure that the cone (e-collar) is worn when unsupervised or if you note your pet pawing or rubbing at the eye(s) (e.g. after medications).**\n\n";
      }

      this.scrollToEnd();
      return medicationInstructions;
    }
  }
};

function toEnglish(term) {
  let english = "";
  switch (term) {
    case "OD":
      english = "the RIGHT eye";
      break;
    case "OS":
      english = "the LEFT eye";
      break;
    case "OU":
      english = "BOTH eyes";
      break;
    case "q24h":
      english = "once daily";
      break;
    case "BID":
      english = "twice daily (approximately every 12 hours)";
      break;
    case "TID":
      english = "three times daily (approximately every 8 hours)";
      break;
    case "QID":
      english = "four times daily (approximately every 6 hours)";
      break;
    case "q4h":
      english = "six times daily (approximately every 4 hours)";
      break;
    case "q2h":
      english = "every 2 hours";
      break;
  }
  return english;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.padded-textarea {
  padding: 0px 16px 16px 16px;
  width: 100%;
}

>>> .drugListEditButton {
  font-size: 10.5px;
  font-weight: bold;
}

>>> .bigButton {
  justify-content: left;
  text-transform: none;
  min-width: 240px;
}
>>> .regButton {
  text-transform: none;
}

.v-input--selection-controls {
  margin-top: 0px;
}
</style>
