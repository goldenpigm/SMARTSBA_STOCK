<template>
  <div class="form-group" :class="purposeClass">
    <label id="purpose_label" for="purpose" class="require">Purpose</label>
    <ComboBox
      :id="'purpose'"
      :placeholder="'Purpose'"
      :class="`form-control require`"
      :data-items="lookupPurpose"
      :text-field="'purposeename'"
      :value-field="'purposecode'"
      :value="purposeValue"
      
      :allow-custom="true"
      :item-render="customRender"
      @change="onChange"
    >
      <!-- <template v-slot:purposeRender="{ }">
        <li class="k-item">
          <span>
            {{ this.lookupPurpose.purposeename }}
          </span>
        </li>
      </template> -->
      <template v-slot:purposeRender="{ props }">
        <purposeRender
          :class="props.itemClass"
          :data-item="props.dataItem"
          :index="props.index"
          @click="(event) => props.onClick(event)"
        />
      </template>
    </ComboBox>
    <small
      id="purposetHelpText"
      data-for="purpose"
      class="form-text text-muted errText"
      >require</small
    >
  </div>
</template>

<script>
import axios from "axios";
import { ComboBox } from "@progress/kendo-vue-dropdowns";
import purposeRender from "./purposeRender";

export default {
  name: "PurposeLookup",
  components: {
    ComboBox,
    purposeRender,
  },
  props: {
    purposeClass: {
      type: String,
      required: true,
      readonly: true,
    },
  },
  data() {
    return {
      fsLang: useRuntimeConfig().public.FS_LANG,
      baseURLStock: useRuntimeConfig().public.BASE_URL_STOCK,
      headers: {
        headers: {
          "Content-Type": "application/json",
          Microservice: "false",
          "Fs-Key": "b17d681e-a827-45f8-bcce-6dff3c3a6eef",
          "Fs-Track": "kml2",
        },
      },
      data: {
        type: this.accLookuptype,
      },
      lookupPurpose: [],
      customRender: "purposeRender",

      purposeValue: "",
      purposeTextField: "",
    };
  },
  mounted() {
    this.queryLookupPurpose();
  },
  methods: {
    async queryLookupPurpose() {
      await axios
        .post(
          `${this.baseURLStock}/lookuppurpose/lookup`,
          this.data,
          this.headers
        )
        .then((result) => {
          console.log("SUCCESS : lookuppurpose");
          if (result.data.body.result == "Y") {
            this.lookupPurpose = result.data.body.lists;
          }
        })
        .catch((error) => {
          console.log("ERROR : lookuppurpose");
          console.error("Request canceled", error);
        });
      console.log(this.lookupPurpose);
      return this.lookupPurpose;
    },
    onChange(event) {
      this.purposeValue = event.target.value;
      this.purposeTextField = event.target.value.purposecode + ' : ' + event.target.value.purposeename;
      console.log(this.purposeValue);
      console.log(this.purposeTextField);
    },
  },
};
</script>
