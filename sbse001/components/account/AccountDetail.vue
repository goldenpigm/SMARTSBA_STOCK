<template>
  <div id="DepositoryInformation">
    <div id="detail" class="container keyform-section">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-12 p-1 pr-2">
          <div class="portlet light bordered h-100">
            <div class="container section">
              <div class="title-row">{{ title }}</div>
            </div>
            <div class="row">
              <div :class="detailPage.account.className">
                <div class="form-group">
                  <AccountLookup :mode="mode" :tagid="detailPage.account.id" :tagname="detailPage.account.name"
                    :value="depInfo.account" :textLabel="detailPage.account.label" :required="true"
                    :accountClass="'col-sm-12 col-md-6 col-lg-6 mb-0'" :showCustname="true" :custnameId="'custname'"
                    :custnameClass="'col-sm-12 col-md-6 col-lg-6 mb-0'" :accLookuptype="'P'" :showAccLookuptype="true"
                    @set-account-detail="queryAccountDetail" @clear-account-detail="claerAccountDetail" />
                </div>
              </div>
              <div :class="detailPage.depacc.className">
                <div class="form-group col-sm-12 col-md-6 col-lg-6">
                  <label :id="`${detailPage.depacc.id}_label`" :for="detailPage.depacc.id" class="require">{{
                    detailPage.depacc.label }}</label>
                  <ComboBox v-if="mode === 'insert'" :id="detailPage.depacc.id" :name="detailPage.depacc.name"
                    :placeholder="detailPage.depacc.label" :data-items="lookupDepAcc" :text-field="depAccValue"
                    :value-field="depAccValue" :value-primitive="true" :value="depInfo.depacc" :disabled="depAccReadOnly"
                    @change="onDepAccChange" />
                  <input v-else-if="mode === 'view'" :name="detailPage.depacc.name" :id="detailPage.depacc.id" readonly
                    placeholder="N/A" class="form-control read-only" :value="depInfo.depacc">
                  <small v-show="errorTextFlag.depacc" :id="`${detailPage.depacc.id}HelpText`"
                    :data-for="detailPage.depacc.id" class="form-text text-muted errText">{{ errorText.depacc }}</small>
                </div>
              </div>
              <div :class="detailPage.cardid.className">
                <div class="form-group col-sm-12 col-md-6 col-lg-6">
                  <label :id="`${detailPage.cardid.id}_label`" :for="detailPage.cardid.id">{{ detailPage.cardid.label
                  }}</label>
                  <input :name="detailPage.cardid.name" :id="detailPage.cardid.id" readonly placeholder="N/A"
                    class="form-control read-only" :value="depInfo.cardid">
                </div>
              </div>
            </div>
            <div class="row">
              <div :class="detailPage.prefixcode.className">
                <div class="form-group col-sm-12 col-md-6 col-lg-6">
                  <label :id="`${detailPage.prefixcode.id}_label`" :for="detailPage.prefixcode.id">{{
                    detailPage.prefixcode.label
                  }}</label>
                  <input :name="detailPage.prefixcode.name" :id="detailPage.prefixcode.id" readonly placeholder="N/A"
                    class="form-control read-only" :value="depInfo.prefixcode">
                </div>
              </div>
              <div :class="detailPage.prefixdesc.className">
                <div class="form-group col-sm-12 col-md-6 col-lg-6">
                  <label :id="`${detailPage.prefixdesc.id}_label`" :for="detailPage.prefixdesc.id" class="require">{{
                    detailPage.prefixdesc.label }}</label>
                  <input :name="detailPage.prefixdesc.name" :id="detailPage.prefixdesc.id" placeholder="N/A"
                    class="form-control" :readonly="prefixcodeEditFlag" :value="depInfo.prefixdesc" required>
                  <small v-show="errorTextFlag.prefixdesc" id="prefix_descHelpText" data-for="prefix_desc"
                    class="form-text text-muted errText">{{ errorText.prefixdesc }}</small>
                </div>
              </div>
              <div :class="detailPage.custname.className">
                <div class="form-group col-sm-12 col-md-6 col-lg-6">
                  <label :id="`${detailPage.custname.id}_label`" :for="detailPage.custname.id">{{
                    detailPage.custname.label }}</label>
                  <input :name="detailPage.custname.name" :id="detailPage.custname.id" readonly placeholder="N/A"
                    class="form-control read-only" :value="depInfo.custname">
                </div>
              </div>
            </div>
            <slot name="newline"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { ComboBox } from '@progress/kendo-vue-dropdowns';

interface AccountDetailProps {
  title: string,
  mode: string,
  setValueViewMode?: object,
  detailPage: {
    account: {
      label: string,
      id: string,
      name: string,
      className: string,
      require: boolean
    },
    depacc: {
      label: string,
      id: string,
      name: string,
      className: string,
      require: boolean
    },
    cardid: {
      label: string,
      id: string,
      name: string,
      className: string,
      require: boolean
    },
    prefixcode: {
      label: string,
      id: string,
      name: string,
      className: string,
      require: boolean
    },
    prefixdesc: {
      label: string,
      id: string,
      name: string,
      className: string,
      require: boolean
    },
    custname: {
      label: string,
      id: string,
      name: string,
      className: string,
      require: boolean
    }
  },
  detailPageOther?: {
    label: string,
    id: string,
    name: string,
    className: string,
    value: string
  }
}
const props = defineProps<AccountDetailProps>();
const emit = defineEmits(['account-detail-value']);

const fsLang = useRuntimeConfig().public.FS_LANG;
const baseURLStock = useRuntimeConfig().public.BASE_URL_STOCK;
const headers = {
  headers: {
    'Content-Type': 'application/json',
    'Microservice': 'false',
    'Fs-Key': 'b17d681e-a827-45f8-bcce-6dff3c3a6eef',
    'Fs-Track': 'kml2'
  }
}

const depInfo = ref({
  account: '',
  depacc: '',
  cardid: '',
  prefixcode: '',
  prefixdesc: '',
  custname: ''
});
const errorTextFlag = ref({
  depacc: false,
  prefixdesc: false
});
const errorText = ref({
  depacc: '',
  prefixdesc: ''
});

var depAccValue = ref<string>('');
var prefixcodeEditFlag = ref<boolean>(true);
var depAccReadOnly = ref<boolean>(true);
var lookupDepAcc = ref<Array<Object>>([]);

onMounted(async () => {
  if (props.mode === 'view') {
    depInfo.value.account = props.setValueViewMode.account;
    depInfo.value.depacc = props.setValueViewMode.depacc;
    depInfo.value.cardid = props.setValueViewMode.cardid;
    depInfo.value.prefixcode = props.setValueViewMode.prefixcode;
    depInfo.value.prefixdesc = props.setValueViewMode.prefixdesc;
    depInfo.value.custname = props.setValueViewMode.custname;
  }
});


const queryAccountDetail = (account: string): void => {
  depInfo.value.account = account;
  let data = {
    'account': depInfo.value.account
  }
  axios.post(`${baseURLStock}/inqstkaccdetail/inquiry`, data, headers)
    .then((result) => {
      console.log("SUCCESS : inqstkaccdetail");
      if (result.data.body.result == "Y") {
        setAccountDetail(result.data.body);
      } else {
        claerAccountDetail();
      }
    })
    .catch((error) => {
      console.log("ERROR : inqstkaccdetail");
      console.error('Request canceled', error);
    });
};

const setAccountDetail = (result: any): void => {
  if (result.USEOMNIBUS == '1') {
    depAccReadOnly.value = false;
    depAccValue.value = 'sdcsubmember';
    queryLookupDepAcc(result.pcflag);
  } else {
    depAccReadOnly.value = true;
    depAccValue.value = 'dpaccount';
    lookupDepAcc.value = [
      {
        'dpaccount': result.dpaccount
      }
    ];
    depInfo.value.depacc = result.dpaccount;
  }
  depInfo.value.cardid = result.cardid;
  depInfo.value.prefixcode = result.titlecode;
  depInfo.value.prefixdesc = result.titlename;
  depInfo.value.custname = result.custname;

  if (result.titlename == 'อื่น ๆ') {
    prefixcodeEditFlag.value = false;
  }
  emit('account-detail-value', depInfo.value);
}

const onDepAccChange = (event: { value: string }) => {
  depInfo.value.depacc = event.value;
}

const queryLookupDepAcc = (pcflag: string): void => {
  let data = {
    'pcflag': pcflag
  }
  axios.post(`${baseURLStock}/lookupdepacct/lookup`, data, headers)
    .then((result) => {
      console.log("SUCCESS : lookupdepacct");
      if (result.data.body.result == "Y") {
        lookupDepAcc = result.data.body.lists;
      }
    })
    .catch((error) => {
      console.log("ERROR : lookupdepacct");
      console.error('Request canceled', error);
    });
}

const claerAccountDetail = (): void => {
  lookupDepAcc.value = []
  depInfo.value.account = '';
  depInfo.value.depacc = '';
  depInfo.value.cardid = '';
  depInfo.value.prefixcode = '';
  depInfo.value.prefixdesc = '';
  depInfo.value.custname = '';
  prefixcodeEditFlag.value = true;
  depAccReadOnly.value = true;
  emit('account-detail-value', depInfo.value);
}
</script>