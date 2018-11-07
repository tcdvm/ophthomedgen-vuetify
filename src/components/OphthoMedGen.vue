<template>
<v-layout row wrap>
  <v-snackbar
    v-model="snackbar"
    :color="sbcolor"
    :timeout="1500"
    :top="sbposition"
  >
    {{ sbtext }}
    <v-btn
      dark
      flat
      @click="snackbar = false"
    >
      Close
    </v-btn>
  </v-snackbar>
  <v-flex lg7>
    <section>
      <!-- <h1 class="title">Ophtho Meds Generator (OMG)</h1> -->
      <!-- <p class="subtitle">
        Too lazy to write out ophtho medication instructions in all their tedious glory? Well you're in luck! Use the below form to generate the instructions and then copy-paste into your discharges. <b>Keyboard shortcuts for meds are in parentheses (e.g. (1) - press "1") or hit Ctrl-C to copy what you've got! Hit the Escape key to cancel and go "back".</b>
      </p> -->
            <a class="button" 
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
                'esc': ['esc'],
                'enter': ['enter']
              }" 
              @shortkey="handleShortCut" 
             >Test</a>
      <!-- <hr> -->
  <v-stepper v-model="step" vertical>
    <v-stepper-step :complete="step > 1" step="1">
      Choose a class of medication
      <!-- <small>Summarize if needed</small> -->
    </v-stepper-step>
    <v-stepper-content step="1">
      <!-- Medication Class Selector -->
      <v-container>
        <v-layout>
        <v-flex sm6>
          <v-card>
            <v-list>
              <v-list-tile>
                <v-list-tile-content>
                    <v-btn 
                      class="bigButton" 
                      @click="selectClass('antibiotic')"
                      @mouseover="classInfo = 'antibiotic'">
                    (1) Antibiotics (w/wo steroids)</v-btn>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>
                  <v-btn 
                    class="bigButton" 
                    @click="selectClass('antiinflammatory')"
                    @mouseover="classInfo = 'antiinflammatory'">
                    (2) Anti-Inflammatories</v-btn>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>
                  <v-btn 
                    class="bigButton" 
                    @click="selectClass('glaucoma')"
                    @mouseover="classInfo = 'glaucoma'">
                    (3) Glaucoma Meds</v-btn>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>
                  <v-btn 
                  class="bigButton" 
                  @click="selectClass('kcs')"
                  @mouseover="classInfo = 'kcs'">
                  (4) KCS Meds/Lubricants</v-btn>
                </v-list-tile-content>
              </v-list-tile>

              <!-- <v-list-tile>
                <v-list-tile-content>
                  <v-btn class="bigButton" @click="selectClass('oral')">(5) Oral Meds</v-btn>
                </v-list-tile-content>
              </v-list-tile> -->

              <v-list-tile>
                <v-list-tile-content>
                  <v-btn 
                    class="bigButton" 
                    @click="selectClass('misc')"
                    @mouseover="classInfo = 'misc'">
                    (5) Other stuff (serum, dilators)</v-btn>
                </v-list-tile-content>
              </v-list-tile>

            </v-list>
          </v-card>
        </v-flex>

        <!-- INFO CARD -->
        <v-flex sm6>

          <v-card v-show="classInfo == 'hover'">
            <v-img
              src="cat.png"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Hover your mouse</h3>
                <div>To display information about the class of medications as well as see links to more information from your class notes.</div>
              </div>
            </v-card-title>
          </v-card>


          <v-card v-show="classInfo == 'antibiotic'">
            <v-img
              src="antibiotic-class-ulcer.png"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Antibiotics</h3>
                <div>The main indication for topical antibiotics is the treatment or prevention of bacterial infection in cases of corneal ulceration. There is a plethora of different topical antibiotics that can vary significantly in spectrum, efficacy, and penetration.</div><br>
                
                <div>If an active bacterial infection is suspected, corneal cytology can be an effective way to confirm and culture (aerobic typically) and sensitivity obtained </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="blue" href="https://vetophtho.org/cornea/cornea.html#corneal-ulceration" target="_blank">See notes on Corneal Ulcers</v-btn>
            </v-card-actions>
          </v-card>

          <v-card v-show="classInfo == 'antiinflammatory'">
            <v-img
              src="antiinflammatory-class.png"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Anti-Inflammatories</h3>
                <div>
                  Topical anti-inflammatories include steroids and non-steroidals (NSAIDs). The main indication is the treatment of inflammation - either surface (e.g. keratoconjunctivitis) or intraocular (e.g. uveitis). Topical NSAIDS while safe, are not always sufficient by themselves to control inflammation.
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="blue" href="https://vetophtho.org/anterioruvea/anterioruvea.html#anterior-uveitis" target="_blank">See notes on Anterior Uveitis</v-btn>
            </v-card-actions>
          </v-card>

          <v-card v-show="classInfo == 'glaucoma'">
            <v-img
              src="glaucoma-class.png"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Glaucoma</h3>
                <div>When deciding on the appropriate course of glaucoma medications, it's important to differeniate if the the glaucoma is primary vs secondary.
                </div><br>
                <div>
                  <b>Primary glaucoma</b> typically (but not always) affects middle-aged dogs and classic breeds include the Basset Hound, Cocker Spaniel, Boston Terrier, Chow, and Huskey. Pressure spikes can be quite significant and painful. Emergent treatment to lower IOP in order to salvage vision is needed and most often includes use of latanoprost.
                </div><br>
                <div>
                  <b>Secondary glaucoma</b> can arise from [chronic-ish] uveitis (or its variants such as hyphema or intraocular tumors) and lens luxation/instability. Note that latanoprost can be contraindicated in some cases of secondary glaucoma. Co-treatment of the primary cause is often needed.
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="blue" href="https://vetophtho.org/glaucoma/glaucoma.html#definition-of-glaucoma" target="_blank">See notes on Glaucoma</v-btn>
            </v-card-actions>
          </v-card>


          <v-card v-show="classInfo == 'kcs'">
            <v-img
              src="kcs-class.png"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Keratoconjunctivitis sicca (KCS)</h3>
                <div>
                  Treatment for KCS should include a tear-stimulant (e.g. cyclosporine) and artificial tears. Antibiotic/anti-inflammatory therapy can also be added (e.g. NeoPolyDex) for secondary bacterial infection and secondary inflammation (provided there is no active ulceration and the owners are careful).
                </div><br>
                <div>
                  When using cyclosporine or tacrolimus, anything other than the 0.2% cyclosporine (e.g. optimmune) has to be specially made/ordered by a compounding pharmacy. See details for each specific medication regarding strength and efficacy.
                </div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="blue" href="https://vetophtho.org/kcs/kcs.html#definition-of-kcs" target="_blank">See notes on KCS</v-btn>
            </v-card-actions>
          </v-card>

          <v-card v-show="classInfo == 'misc'">
            <v-img
              src="cat.png"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Miscellaneous Ophtho Stuff</h3>
                <div>Included here:
                  <ul>
                    <li>Serum</li>
                    <li>Dilators (e.g. atropine, tropicamide)</li>
                    <li>Miotics(e.g. pilocarpine)</li>
                    <li>Antihistamines (? efficacy)</li>
                    <li>Antivirals</li>
                    <li>Antifungals</li>
                    <li>Can't-Hurt-Might-Help nutraceuticals</li>
                  </ul>
                </div>
              </div>
            </v-card-title>
            <!-- <v-card-actions>
              <v-btn flat color="orange">Share</v-btn>
              <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions> -->
          </v-card>

        </v-flex>
        <!-- INFO CARD -->

        </v-layout>
      </v-container>
    </v-stepper-content>

  <v-stepper-step :complete="step > 2" step="2">Choose the medication</v-stepper-step>

    <v-stepper-content step="2">
      <v-container>
        <v-layout>
          <v-flex sm6>
            <div v-if="drugClass == 'antibiotic'">
              <v-btn 
                v-for="(drug, index) in antibiotics" 
                :key=index
                @click="selectDrug(index)" 
                @mouseover="drugInfoUpdate(index)"
                class="bigButton"
              >
              <!-- eslint-disable-next-line  -->
              {{(index+1<10) ? '(' + (index+1) + ')' : '' }} {{drug.drugName}}
              </v-btn>
            </div>

            <div v-if="drugClass == 'antiinflammatory'">
                <v-btn 
                  v-for="(drug, index) in antiinflammatories" 
                  :key=index
                  @click="selectDrug(index)" 
                class="bigButton"
                >
                <!-- eslint-disable-next-line  -->
                {{(index+1<10) ? '(' + (index+1) + ')' : '' }} {{drug.drugName}}
                </v-btn>
            </div>
            <v-btn class="regButton" color="light-blue lighten-4" @click="this.prevState">
              (esc) Go to prev step
              <v-icon dark right>backspace</v-icon>
            </v-btn>
        </v-flex>
        <v-flex sm6>
          <v-card>
            <!-- <v-img
              src="antiinflammatory-class.png"
              aspect-ratio="2.75"
            ></v-img> -->
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{drugInfo.drugName}}</h3>
                <div>
                  <vue-simple-markdown :source="drugInfo.drugBlurb"> </vue-simple-markdown>
                </div><br>
              </div>
            </v-card-title>
            <v-card-actions>
              <!-- <v-btn flat color="blue" href="https://vetophtho.org/kcs/kcs.html#definition-of-kcs" target="_blank">See notes on KCS</v-btn> -->
            </v-card-actions>
          </v-card>
        </v-flex>
        </v-layout>
      </v-container>
    </v-stepper-content>

    <v-stepper-step :complete="step > 3" step="3">Choose the treated eye(s)</v-stepper-step>

    <v-stepper-content step="3">
      <!-- Treated Eye Selector -->
      <section v-show="state == 'chooseEye' || state =='chooseFreq' || state == 'ready'">
        <!-- <hr> -->
          <!-- <label class="label">Select the Treated Eye(s)</label> -->
            <v-btn @click="selectEye('OS')">
              (1) OS
            </v-btn>

            <v-btn @click="selectEye('OD')">
              (2) OD
            </v-btn>

            <v-btn @click="selectEye('OU')">
              (3) OU
            </v-btn>
      </section>
      <v-btn class="regButton" color="light-blue lighten-4" @click="this.prevState">
        (esc) Go to prev step
        <v-icon dark right>backspace</v-icon>
      </v-btn>
      <!-- <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
      <v-btn flat>Cancel</v-btn> -->
    </v-stepper-content>

    <v-stepper-step :complete="step > 4" step="4">Choose the Frequency</v-stepper-step>
    <v-stepper-content step="4">
      <!-- Frequency Selector -->
          <v-btn @click="selectFreq('q24h')">
            (1) q24h
          </v-btn>

          <v-btn @click="selectFreq('BID')">
            (2) BID 
          </v-btn>

          <v-btn @click="selectFreq('TID')">
            (3) TID
          </v-btn>

          <v-btn @click="selectFreq('QID')">
            (4) QID
          </v-btn>

          <v-btn @click="selectFreq('q4h')">
            (5) q4h
          </v-btn>

          <v-btn @click="selectFreq('q2h')">
            (6) q2h
          </v-btn>

          <v-btn class="regButton" color="light-blue lighten-4" @click="this.prevState">
            (esc) Go to prev step
            <v-icon dark right>backspace</v-icon>
          </v-btn>

        <v-alert
          :value="true"
          type="warning"
        >
        Need to do different frequencies of the same drug for different eyes? Sorry. You'll have to change that manually (after you paste). <strong>Don't Forget!</strong>
    </v-alert>

      <!-- <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
      <v-btn flat>Cancel</v-btn> -->
    </v-stepper-content>
  
    <v-stepper-step step="5">Hit Enter or Click "Add" to Add the medication</v-stepper-step>
    <v-stepper-content step="5">
      <v-btn @click="addDrug()">(Enter) Add {{this.drug.drugName}} {{this.sigEye}} {{this.sigFrequency}} 
        <v-icon dark right>add_circle</v-icon>
      </v-btn>
    </v-stepper-content>
  
  </v-stepper>


      <!-- <hr> -->

    </section>
  </v-flex>

  <v-flex lg5>
    <v-card>
      <v-container>
        <v-layout>
          <v-flex sm6>
            <v-card>
              Drug to be added: <br>
              Drug Class: {{drugClass}}<br> Drug Name: {{this.drug.drugName}}<br> Sig: {{this.sigEye}} {{this.sigFrequency}}<br>State: {{state}}<br>e-collar: {{ecollar}}
                <ul>
                  <li v-for="(item, key) in drugList" :key=key>
                    <strong> {{ item }}</strong>
                  </li>
                </ul>
            </v-card>
          </v-flex>
          <v-flex sm6>
            <v-card>
              <v-card-title primary-title>
                <div>
                  <h2>E-collar:</h2>
                  <v-radio-group v-model="ecollar" mt-0>
                    <v-radio value="">
                      <div slot="label">Not needed (no text)</div>
                    </v-radio>
                    <v-radio value="alltimes">
                      <div slot="label">At all times</div>
                    </v-radio>
                    <v-radio value="prn">
                      <div slot="label">When unmonitored</div>
                    </v-radio>
                  </v-radio-group>
                </div>
              </v-card-title>

            </v-card>
          </v-flex>

        </v-layout>
      </v-container>
    </v-card>
    <v-card>
      <v-container>
            <v-btn 
              v-shortkey="['ctrl', 'c']" 
              @shortkey="doCopy()" 
              @click="doCopy()"
              color="primary"
            > Copy to Clipboard (Ctrl-C)</v-btn>
      <v-textarea 
        outline 
        v-model="instructions" 
        placeholder="Medication instructions here." 
        rows="15" 
        readonly>
      </v-textarea>

    </v-container>

    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
import drugs from "../assets/Drugs.json"
import VueSimpleMarkdown from 'vue-simple-markdown'
import 'vue-simple-markdown/dist/vue-simple-markdown.css'
import Vue from 'vue'

Vue.use(VueSimpleMarkdown)

export default {
  data: function() {
    return {
      step:1,
      state: "chooseClass", // chooseClass, chooseDrug, chooseEye, chooseFreq, ready
      drugClass: "",
      activeClassBtn: "",
      activeDrugBtn: null,
      ecollar: "", // null (no cone), all (at all times), prn (unmonitored or if pawing noted)
      drug: {},
      sigEye: "",
      sigFrequency: "",
      drugList: [],
      antibiotics: drugs.Antibiotics,
      antiinflammatories: drugs.Antiinflammatories,
      classInfo: "hover",
      drugInfo: {
        drugName: "Medication Information",
        drubBlurb: "Hover over each drug for a little blurb on the medication and its use."
      },
      sbtext: "",
      snackbar: false,
      sbcolor: "success",
      sbposition: true
    }
  },
  methods: {
    resetInfo: function () {
      this.classInfo.title = "Hover for Info";
      this.classInfo.srcImage = "cat.png";
    },
    drugInfoUpdate: function(index) {
      this.drugInfo.drugName = this.antibiotics[index].drugName
      this.drugInfo.drugBlurb = this.antibiotics[index].blurb
    },
    changeInfo: function(needInfo) {
      switch(needInfo) {
        case 'antibiotics':
          this.classInfo.title="Antibiotics";
          this.classInfo.srcImage= "antibiotic-class-ulcer.png";
          this.classInfo.text = "Topical antibiotics are indicated for treatment of corneal ulcerations. Considerations when choosing an antibiotic include <b>blah blah blah</b>"
          break;
        default:
          this.resetInfo()
          break;
      }
    },
    selectClass: function(drugclass) {
      this.drugClass = drugclass;
      // this.activeClassBtn = drugclass;
      this.state = "chooseDrug";
      this.step = 2;
    },
    selectDrug: function(index) {
      switch(this.drugClass) {
        case 'antibiotic':
          this.drug = this.antibiotics[index];
          break;
        case 'antiinflammatory':
          this.drug = this.antiinflammatories[index];
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
      this.state="ready";
      this.step = 5;
    },
    addDrug: function() {
      this.drugList.push({
        drug: this.drug,
        eye: this.sigEye,
        frequency: this.sigFrequency
      });
      this.drug = "";
      this.drugClass = "";
      this.sigEye = "";
      this.sigFrequency = "";
      this.activeClassBtn = "";
      this.activeDrugBtn = null;
      this.state = "chooseClass";
      this.step = 1;
    },
    prevState: function() {
      switch(this.state) {
        case 'chooseClass':
        case 'chooseDrug':
          this.drugClass = "";
          this.activeClassBtn = "";
          this.state = "chooseClass";
          this.step = (this.step > 1 ? this.step - 1 : 1)
          break;
        case 'chooseEye':
          this.drug = {};
          this.activeDrugBtn = null;
          this.state = "chooseDrug";
          this.step = (this.step > 1 ? this.step - 1 : 1)
          break;
        case 'chooseFreq':
          this.state = "chooseEye";
          this.step = (this.step > 1 ? this.step - 1 : 1)
          break;
        case 'ready':
          this.state = "chooseFreq";
          this.step = (this.step > 1 ? this.step - 1 : 1)
          break;
      }
    },
    handleShortCut(event) {
      switch (event.srcKey) {
        case 'enter':
          if(this.state == "ready")
            this.addDrug()
          break;
        case 'esc':
          this.prevState();
          break;
        case '1':
          switch(this.state) {
            case 'chooseClass':
              this.selectClass('antibiotic')
              break;
            case 'chooseDrug':
              this.selectDrug(0)
              break;
            case 'chooseEye':
              this.selectEye("OS");
              break;
            case 'chooseFreq':
              this.selectFreq("q24h");
              break;
            case 'ready':
              break;
          }
          break
        case '2':
          switch(this.state) {
            case 'chooseClass':
              this.selectClass('antiinflammatory')
              break;
            case 'chooseDrug':
              this.selectDrug(1)
              break;
            case 'chooseEye':
              this.selectEye("OD");
              break;
            case 'chooseFreq':
              this.selectFreq("BID");
              break;
            case 'ready':
              break;
          }
          break
        case '3':
          switch(this.state) {
            case 'chooseClass':
              this.selectClass('glaucoma')
              break;
            case 'chooseDrug':
              this.selectDrug(2)
              break;
            case 'chooseEye':
              this.selectEye("OU");
              break;
            case 'chooseFreq':
              this.selectFreq("TID");
              break;
            case 'ready':
              break;
          }
          break
        case '4':
          switch(this.state) {
            case 'chooseClass':
              this.selectClass('kcs')
              break;
            case 'chooseDrug':
              this.selectDrug(3)
              break;
            case 'chooseEye':
              break;
            case 'chooseFreq':
              this.selectFreq("QID");
              break;
            case 'ready':
              break;
          }
          break
        case '5':
          switch(this.state) {
            case 'chooseClass':
              this.selectClass('misc')
              break;
            case 'chooseDrug':
              this.selectDrug(4)
              break;
            case 'chooseEye':
              break;
            case 'chooseFreq':
              this.selectFreq("q4h");
              break;
            case 'ready':
              break;
          }
          break
        case '6':
          switch(this.state) {
            case 'chooseClass':
              // this.selectClass('misc')
              break;
            case 'chooseDrug':
              this.selectDrug(5)
              break;
            case 'chooseEye':
              break;
            case 'chooseFreq':
              this.selectFreq("q2h");
              break;
            case 'ready':
              break;
          }
          break
        case '7':
          switch(this.state) {
            // case 'chooseClass':
            //   this.selectClass('misc')
            //   break;
            case 'chooseDrug':
              this.selectDrug(6)
              break;
            case 'chooseEye':
              break;
            case 'chooseFreq':
              break;
            case 'ready':
              break;
          }
          break
        case '8':
          switch(this.state) {
            // case 'chooseClass':
            //   this.selectClass('misc')
            //   break;
            case 'chooseDrug':
              this.selectDrug(7)
              break;
            case 'chooseEye':
              break;
            case 'chooseFreq':
              break;
            case 'ready':
              break;
          }
          break
        case '9':
          switch(this.state) {
            // case 'chooseClass':
            //   this.selectClass('misc')
            //   break;
            case 'chooseDrug':
              this.selectDrug(8)
              break;
            case 'chooseEye':
              break;
            case 'chooseFreq':
              break;
            case 'ready':
              break;
          }
          break
      }
    },
    doCopy() {
      this.$copyText(this.instructions).then()
      this.sbtext = "Copied to clipboard!";
      this.sbcolor="success"
      this.snackbar=true;
    },
  },
  computed: {
    instructions: function() {
      let medicationInstructions = "";
      let numTopical = 0;

      for (let i = 0; i < this.drugList.length; i++) {
        let drugInstruction = "";

        if (this.drugList.length > 1) {
          drugInstruction += (i + 1).toString() + ". ";
        }

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
        medicationInstructions += drugInstruction;
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
      return medicationInstructions;
    }
  }

}

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
* {
  text-align: left;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

>>>.v-btn__content {
  justify-content: left;
}

>>>.bigButton {
  text-transform: none;
  min-width: 250px;
}
>>>.regButton {
  text-transform: none;
}

.v-input--selection-controls {
  margin-top: 0px;
}
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
