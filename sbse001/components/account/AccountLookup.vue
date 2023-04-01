<template>
  <div :id="`${tagid}_box`" fs-component="account" class="account-group" :data-boxfor="`${tagid}`">
    <div v-show="!showAccLookuptype">
      <div :id="`${tagid}lktype-group`" class="row mt-0 mb-1">
        <div class="col-sm-12">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" :name="`${tagid}lktype`" :id="`${tagid}lktype-ch1`" value="P" />
            <label class="form-check-label" :label="`${tagid}lktype-ch1_label`" :for="`${tagid}lktype-ch1`">Private
              Cash</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" :name="`${tagid}lktype`" :id="`${tagid}lktype-ch2`" value="W" />
            <label class="form-check-label" :label="`${tagid}lktype-ch2_label`" :for="`${tagid}lktype-ch2`">Wallet</label>
          </div>
        </div>
      </div>
    </div>
    <div :id="`${tagid}field-group`" class="w-100 px-0 form-group">
      <div class="row m-0">
        <div class="form-group mb-0 col-sm-12">
          <label :id="`${tagid}_label`" :for="`${tagid}`" :class="{ 'require': required }">{{ textLabel }}</label>
        </div>
      </div>
      <div class="row m-0">
        <div :class="`form-group ${accountClass}`">
          <div v-if="mode === 'insert'" style="display: flex">
            <MaskedTextBox :name="tagname" :id="tagid" :placeholder="'Account'" :mask="'000000-0'" :value="accountDetail.account" @change="onChange">
            </MaskedTextBox>
            <span class="k-clear-value acclk-clear" role="button" tabindex="-1" title="clear" @click="onClickClear">
              <span class="k-icon k-i-x" role="presentation"></span>
            </span>
            <button
              class="k-button k-button-md k-icon-button k-button-solid k-button-solid-base k-input-button m-0 acclk-btn"
              aria-label="expand button" type="button" tabindex="-1" @click="toggleAccDialog">
              <span class="k-icon k-i-caret-alt-down k-button-icon" role="presentation"></span>
            </button>
          </div>
          <input v-else-if="mode === 'view'" :name="tagname" :id="tagid" readonly placeholder="N/A"
                    class="form-control read-only" :value="value">
          <small v-if="errorTextFlag.account" :id="`${tagid}HelpText`" :data-for="`${tagid}`"
            class="form-text text-muted errText">{{ errorText.account }}</small>
        </div>
        <div v-show="showCustname" :class="`form-group ${custnameClass}`">
          <input :name="`${custnameId}`" :id="`${custnameId}`" type="text" readonly :for="`${tagid}`" datatype="string"
            class="form-control-plaintext" tabindex="-1" :value="accountDetail.custname" />
        </div>
      </div>
    </div>

    <!-- Account Lookup Modal -->
    <Dialog v-if="visibleAccDialog" :title-render="customTitleBar" :width="800" @close="toggleAccDialog">
      <template v-slot:accModalTitleBar="{}">
        <h5 v-if="accLookuptype === 'P'" :id="`${tagid}lk_modal_title_P`" class="modal-title">
          Account Lookup
        </h5>
        <h5 v-else-if="accLookuptype === 'W'" :id="`${tagid}lk_modal_title_W`" class="modal-title collapse">
          Wallet Lookup
        </h5>
      </template>
      <AccountGrid :gridData="lookupAcc" :columns="columns" @close-dialog="toggleAccDialog"
        @grid-selected="selectedValue" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from 'vue';
import { Dialog } from "@progress/kendo-vue-dialogs";
import { MaskedTextBox } from '@progress/kendo-vue-inputs';

interface AccountLookupProps {
  mode: string,
  tagid: string,
  tagname: string,
  value: string,
  textLabel: string,
  required: boolean,
  accountClass: string,
  showCustname: boolean,
  custnameId: string,
  custnameClass: string,
  accLookuptype: string,
  showAccLookuptype: boolean,
}
const props = defineProps<AccountLookupProps>();
const emit = defineEmits(['set-account-detail', 'clear-account-detail']);

const fsLang = useRuntimeConfig().public.FS_LANG;
const baseURLUtil = useRuntimeConfig().public.BASE_URL_UTIL;
const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Microservice': 'false',
    'Fs-Key': 'b17d681e-a827-45f8-bcce-6dff3c3a6eef',
    'Fs-Track': 'kml2'
  }
}
var data = {
  type: props.accLookuptype,
}
var lookupAcc = ref<Array<object>>([]);
var columns = ref<Array<object>>([]);
const accountDetail = ref({
  account: '',
  custname: ''
});
const errorTextFlag = ref({
  account: false,
  custname: ''
});
const errorText = ref({
  account: ''
});

const customTitleBar: string = "accModalTitleBar";
var visibleAccDialog = ref<boolean>(false);

onMounted(async () => {
  lookupAcc.value = await queryLookupAccount();
  columns.value = await getGridColumn();
});

const queryLookupAccount = async(): Promise<Array<object>> => {
  let lookupAcc: Array<object> = [];
  await axios.post(`${baseURLUtil}/lookupaccount/collect`, data, headers)
    .then((result) => {
      console.log("SUCCESS : lookupaccount");
      if (result.data.body.result == "Y") {
        lookupAcc = result.data.body.lists;
      }
    })
    .catch((error) => {
      console.log("ERROR : lookupaccount");
      console.error("Request canceled", error);
    });
  return lookupAcc;
}

const getGridColumn = (): Array<object> => {
  let field_acctype = "";
  let field_name = "";
  if (fsLang === "TH") {
    field_acctype = "custaccttdesc";
    field_name = "custtname";
  } else {
    field_acctype = "custacctedesc";
    field_name = "custename";
  }
  return [
    {
      title: "Account",
      field: "account",
      width: "100",
    },
    {
      title: "Account Type",
      field: field_acctype,
      width: "200",
    },
    {
      title: "Name",
      field: field_name,
      width: "400",
    },
  ];
}

const toggleAccDialog = (): boolean => {
  return visibleAccDialog.value = !visibleAccDialog.value;
}

const selectedValue = (accountItem: any): void => {
  if (fsLang === "TH") {
    accountDetail.value.custname = accountItem.custtname;
  } else {
    accountDetail.value.custname = accountItem.custename;
  }
  accountDetail.value.account = accountItem.account;
  emit("set-account-detail", accountDetail.value.account);
}

const onClickClear = (): void => {
  accountDetail.value.account = '';
  accountDetail.value.custname = '';
  emit('clear-account-detail');
}

const onChange = (event: { target: { value: string } }): void => {
  const value = event.target.value;
  if (accountDetail.value.account !== value) {
    accountDetail.value.account = value;
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


.acclk-clear {
  position: absolute;
  z-index: 1;
  right: 2.75em;
  width: 24px;
  height: 24px;
}
</style>
