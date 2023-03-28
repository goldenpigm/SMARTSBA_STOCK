<template>
  <div class="form-group" :class="purposeClass">
    <label id="purpose_label" for="purpose" class="require">Purpose</label>
    <DropDownList
      :data-items="lookupPurpose"
      :text-field="'purposeename'"
      :default-item="defaultItem"
      @change="onChange"
      >
    </DropDownList>
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
import { DropDownList } from "@progress/kendo-vue-dropdowns";

export default {
  name: "PurposeLookup",
  components: {
    DropDownList,
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
      defaultItem: { 
        purposeename: 'Choose one of the following',
        purposetname: 'Choose one of the following',
        purposecode: '',
      },
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
      console.log(event);
      this.purposeValue = event.value;
    },
  },
};
</script>
