<template>
  <div :id="`${tagid}_box`" fs-component="account" class="account-group" :data-boxfor="`${tagid}`">
    <div v-show="!showAccLookuptype">
      <div :id="`${tagid}lktype-group`" class="row mt-0 mb-1">
        <div class="col-sm-12">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" :name="`${tagid}lktype`" :id="`${tagid}lktype-ch1`"
              value="P">
            <label class="form-check-label" :label="`${tagid}lktype-ch1_label`"
              :for="`${tagid}lktype-ch1`">Private Cash</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" :name="`${tagid}lktype`" :id="`${tagid}lktype-ch2`"
              value="W">
            <label class="form-check-label" :label="`${tagid}lktype-ch2_label`"
              :for="`${tagid}lktype-ch2`">Wallet</label>
          </div>
        </div>
      </div>
    </div>
    <div :id="`${tagid}field-group`" class="w-100 px-0 form-group">
      <div class="row m-0">
        <div class="form-group mb-0 col-sm-12">
          <label :id="`${tagid}_label`" :for="`${tagid}`" :class="`${requiredValue}`">{{ textLabel
          }}</label>
        </div>
      </div>
      <div class="row m-0">
        <div :class="`form-group ${accountClass}`">
          <ComboBox 
            :name="`${tagname}`" 
            :id="`${tagid}`" 
            :placeholder="'Account'"
            :class="`form-control account ${requiredValue}`" 
            :data-items="lookupAcc" 
            :text-field="'account'" 
            :value-field="'account'"
            :value-primitive="true"
            :allow-custom="true"
            :opened="false"
            :value="accountDetail.account"
            @keydown="onKeypress"
            @open="toggleAccDialog"
            @change="onChange"
            >
          </ComboBox>
          <small  v-if="errorTextFlag.account" :id="`${tagid}HelpText`" :data-for="`${tagid}`"
            class="form-text text-muted errText">{{ errorText.account }}</small>
        </div>
          <div v-show="showCustname" :class="`form-group ${custnameClass}`">
            <input :name="`${custnameId}`" :id="`${custnameId}`" type="text" readonly :for="`${tagid}`"
              datatype="string" class="form-control-plaintext" tabindex="-1" :value="accountDetail.custname">
          </div>
      </div>
    </div>

    <!-- Account Lookup Modal -->
    <Dialog v-if="visibleAccDialog" :title-render="customTitleBar" :width="800"  @close="toggleAccDialog">
      <template v-slot:accModalTitleBar="">
        <h5 v-if="accLookuptype === 'P'" :id="`${tagid}lk_modal_title_P`" class="modal-title">
          Account Lookup
        </h5>
        <h5 v-else-if="accLookuptype === 'W'" :id="`${tagid}lk_modal_title_W`" class="modal-title collapse">
          Wallet Lookup
        </h5>
      </template>
      <AccountGrid :gridData="lookupAcc" :columns="columns" @closeDialog="toggleAccDialog" @selectedValue="selectedValue"/>
    </Dialog>
  </div>
</template>

<script>
import axios from "axios";
import AccountGrid from './AccountGrid';
import { ComboBox } from '@progress/kendo-vue-dropdowns';
import { Dialog } from '@progress/kendo-vue-dialogs';

export default {
  name: 'AccountLookup',
  components: {
    AccountGrid,
    ComboBox,
    Dialog,
  },
  props: {
    tagid: {
      type: String,
      required: true,
      readonly: true
    },
    tagname: {
      type: String,
      required: true,
      readonly: true
    },
    value: {
      type: String,
      required: false,
      readonly: true
    },
    textLabel: {
      type: String,
      required: true,
      readonly: true
    },
    required: {
      type: Boolean,
      required: false,
      readonly: true
    },
    accountClass: {
      type: String,
      required: true,
      readonly: true
    },
    showCustname: {
      type: Boolean,
      required: true,
      readonly: true
    },
    custnameId: {
      type: String,
      required: false,
      readonly: true
    },
    custnameClass: {
      type: String,
      required: false,
      readonly: true
    },
    accLookuptype: {
      type: String,
      required: false,
      readonly: true
    },
    showAccLookuptype: {
      type: Boolean,
      required: true,
      readonly: true
    }
  },
  data() {
    return {
      fsLang: useRuntimeConfig().public.FS_LANG,
      baseURLUtil: useRuntimeConfig().public.BASE_URL_UTIL,
      headers: {
        headers: {
          "Content-Type": "application/json",
          "Microservice": "false",
          "Fs-Key": "b17d681e-a827-45f8-bcce-6dff3c3a6eef",
          "Fs-Track": "kml2"
        }
      },
      data: {
        "type": this.accLookuptype
      },
      lookupAcc: [],
      accountItem: [],
      accountDetail: {
        account: '',
        custname: ''
      },
      errorTextFlag: {
        account: false,
      },
      errorText: {
        account: '',
      },
      requiredValue: '',
      customTitleBar: 'accModalTitleBar',
      visibleAccDialog: false
    }
  },
  mounted() {
    if (this.required) {
      this.requiredValue = "require"
    }

    this.queryLookupAccount();
    this.getGridColumn();
  },
  computed: {

  },
  methods: {
    async queryLookupAccount() {
      await axios.post(`${this.baseURLUtil}/lookupaccount/collect`, this.data, this.headers)
        .then((result) => {
          console.log("SUCCESS : lookupaccount");
          if (result.data.body.result == "Y") {
            this.lookupAcc = result.data.body.lists;
          }
        })
        .catch((error) => {
          console.log("ERROR : lookupaccount");
          console.error('Request canceled', error);
        });
      return this.lookupAcc;
    },
    getGridColumn() {
      let field_acctype = "";
      let field_name = "";
      if (this.fsLang === 'TH') {
        field_acctype = 'custaccttdesc';
        field_name = 'custtname';
      } else {
        field_acctype = 'custacctedesc';
        field_name = 'custename';
      }
      this.columns = [
        {
          title: 'Account',
          field: 'account',
          width: '100'
        },
        {
          title: 'Account Type',
          field: field_acctype,
          width: '200'
        },
        {
          title: 'Name',
          field: field_name,
          width: '400'
        }
      ];
    },
    toggleAccDialog() {
      this.visibleAccDialog = !this.visibleAccDialog;
    },
    selectedValue(accountItem) {
      if (this.fsLang === 'TH') {
        this.accountDetail.custname = accountItem.custtname;
      } else {
        this.accountDetail.custname = accountItem.custename;
      }
      this.accountDetail.account = accountItem.account;
      this.$emit('setAccountValue', this.accountDetail.account);
    },
    onChange (event) {
      if (event.value == null) {
        this.accountDetail.custname = '';
        this.$emit('claerAccountDetail');
      }
      this.accountDetail.account = event.value;
    },
    onKeypress(event) {
      this.toggleAccDialog();
      // event = event ? event : window.event;
      // var charCode = (event.which) ? event.which : event.keyCode;
      // if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
      //   event.preventDefault();
      // } else {
      //   return true;
      // }
    },
  },
  wathch: {
    
  }
}
</script>

<style>
.k-window-titlebar {
  background-color: #fafafa !important;
}

.k-button-md.k-icon-button {
  padding: 4px !important;
}

.k-button-md {
  padding: 4px 8px !important;
}
</style>