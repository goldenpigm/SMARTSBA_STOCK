<template>
  <div class="form-group" :class="purposeClass">
    <label :id="`${purposeId}_label`" :for="`${purposeId}`" class="require">{{ purposeLabel }}</label>
    <DropDownList
      :id="purposeId"
      :name="purposeName"
      :data-items="lookupPurpose"
      :text-field="'purposeename'"
      :default-item="defaultItem"
      :item-render="customItemRender"
      :value-render="customValueRender"
      @change="onChange"
      >
      <template v-slot:purposeItemRender="{ props }">
        <PurposeItemRender 
          :class="props.itemClass" 
          :data-item="props.dataItem"
          :index="props.index" 
          @click="(event) => props.onClick(event)" />
      </template>
      <template v-slot:purposeValueRender="{ props }">
        <PurposeValueRender :value="props.value" />
      </template>
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
import PurposeItemRender from "./PurposeItemRender";
import PurposeValueRender from "./PurposeValueRender";

export default {
  name: "PurposeLookup",
  components: {
    DropDownList,
    PurposeItemRender,
    PurposeValueRender
  },
  props: {
    purposeLabel: {
      type: String,
      required: true,
      readonly: true,
    },
    purposeId: {
      type: String,
      required: true,
      readonly: true,
    },
    purposeName: {
      type: String,
      required: true,
      readonly: true,
    },
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
      customItemRender: "purposeItemRender",
      customValueRender: "purposeValueRender",

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
      return this.lookupPurpose;
    },
    onChange(event) {
      this.purposeValue = event.value;
      this.$emit('purpose-value', this.purposeValue);
    },
  },
};
</script>
