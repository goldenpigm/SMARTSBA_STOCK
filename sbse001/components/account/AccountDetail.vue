<template>
  <div id="DepositoryInformation">
    <div id="detail" class="container keyform-section">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-lg-12 p-1 pr-2">
          <div class="portlet light bordered h-100">
            <div class="container section">
              <div class="title-row">ข้อมูลเลขที่บัญชีหลักทรัพย์ผู้ฝาก / Depositor’s Information</div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-4 col-lg-4 px-0">
                <div class="form-group">
                  <AccountLookup 
                    :tagid="'account'" 
                    :tagname="'account'" 
                    :value="''"
                    :textLabel="'เลขที่บัญชีหลักทรัพย์ / Account'" 
                    :required="true"
                    :accountClass="'col-sm-12 col-md-6 col-lg-6 mb-0'" 
                    :showCustname="true" 
                    :custnameId="'custname'"
                    :custnameClass="'col-sm-12 col-md-6 col-lg-6 mb-0'" 
                    :accLookuptype="'P'" 
                    :showAccLookuptype="true"
                    @setAccountValue="setAccountValue"
                    @claerAccountDetail="claerAccountDetail"
                  />
                </div>
              </div>
              <div class="col-sm-12 col-md-4 col-lg-4 px-0">
                <div class="form-group col-sm-12 col-md-6 col-lg-6">
                  <label id="depository_account_label" for="depository_account" class="require">Depository
                    Account</label>
                    <ComboBox
                      :id="'depository_account'"
                      :name="'depository_account'"
                      :placeholder="'Depository Account'"
                      :data-items="lookupDepAcc" 
                      :text-field="depAccValue"
                      :value-field="depAccValue"
                      :value-primitive="true"
                      :value="depInfo.depacc"
                      @change="onDepAccChange"
                    />
                  <small v-show="errorTextFlag.depacc" id="depository_accountHelpText" data-for="depository_account"
                    class="form-text text-muted errText">{{ errorText.depacc }}</small>
                </div>
              </div>
              <div class="col-sm-12 col-md-4 col-lg-4">
                <div class="form-group">
                  <label id="cardid_label" for="cardid">เลขประจำตัวประชาชน / Card ID</label>
                  <input name="cardid" id="cardid" readonly placeholder="N/A" class="form-control read-only"
                    :value="depInfo.cardid">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12 col-md-4 col-lg-4">
                <div class="form-group">
                  <label id="prefixcode_label" for="prefixcode">รหัสคำนำหน้า / Prefix Code</label>
                  <input name="prefixcode" id="prefixcode" readonly placeholder="N/A" class="form-control read-only"
                    :value="depInfo.prefixcode">
                </div>
              </div>
              <div class="col-sm-12 col-md-4 col-lg-4">
                <div class="form-group col-sm-12 col-md-6 col-lg-6 px-0">
                  <label id="prefixdesc_label" for="prefixdesc" class="require">คำนำหน้า / Prefix Desc.</label>
                  <input name="prefixdesc" id="prefixdesc" placeholder="N/A" :class="`form-control ${prefixcodeEditFlag}`"
                    :value="depInfo.prefixdesc" required>
                  <small v-show="errorTextFlag.prefixdesc" id="prefix_descHelpText" data-for="prefix_desc"
                    class="form-text text-muted errText">{{ errorText.prefixdesc }}</small>
                </div>
              </div>
              <div class="col-sm-12 col-md-4 col-lg-4">
                <div class="form-group">
                  <label id="name_label" for="name">ชื่อ-นามสกุลของลูกค้า / Customer Name</label>
                  <input name="name" id="name" readonly placeholder="N/A" class="form-control read-only"
                    :value="depInfo.custname">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AccountLookup from "./AccountLookup"
import { ComboBox } from '@progress/kendo-vue-dropdowns';

export default {
  name: 'AccountDetail',
  components: {
    AccountLookup,
    ComboBox
  },
  data() {
    return {
      fsLang: useRuntimeConfig().public.FS_LANG,
      baseURLStock: useRuntimeConfig().public.BASE_URL_STOCK,
      headers: {
        headers: {
          "Content-Type": "application/json",
          "Microservice": "false",
          "Fs-Key": "b17d681e-a827-45f8-bcce-6dff3c3a6eef",
          "Fs-Track": "kml2"
        }
      },
      
      depInfo: {
        account: '',
        depacc: '',
        cardid: '',
        prefixcode: '',
        prefixdesc: '',
        custname: ''
      },
      errorTextFlag: {
        depacc: false,
        prefixdesc: false
      },
      errorText: {
        depacc: '',
        prefixdesc: ''
      },
      depAccValue: '',
      prefixcodeEditFlag: 'read-only',

      lookupDepAcc: [],
      
    }
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    setAccountValue(account) {
      this.depInfo.account = account;
      this.queryAccDetail();
    },
    onDepAccChange (event) {
      this.depInfo.depacc = event.value;
    },
    setAccountDetail(result) {
      if (result.USEOMNIBUS == '1') {
        this.depAccValue = 'sdcsubmember';
        this.queryLookupDepAcc(result.pcflag);
      } else {
        this.depAccValue = 'dpaccount';
        this.lookupDepAcc = [
          {
            'dpaccount': result.dpaccount
          }
        ];
        this.depInfo.depacc = result.dpaccount;
      }
      this.depInfo.cardid = result.cardid;
      this.depInfo.prefixcode = result.titlecode;
      this.depInfo.prefixdesc = result.titlename;
      this.depInfo.custname = result.custname;

      if (result.titlename == 'อื่น ๆ') {
        this.prefixcodeEditFlag = '';
      }
    },
    queryAccDetail() {
      let data = {
        'account': this.depInfo.account
      }
      axios.post(`${this.baseURLStock}/inqstkaccdetail/inquiry`, data, this.headers)
        .then((result) => {
          console.log("SUCCESS : inqstkaccdetail");
          if (result.data.body.result == "Y") {
            console.log(result.data.body);
            this.setAccountDetail(result.data.body);
          }
        })
        .catch((error) => {
          console.log("ERROR : inqstkaccdetail");
          console.error('Request canceled', error);
        });
    },
    queryLookupDepAcc(pcflag) {
      let data = {
        'pcflag': pcflag
      }
      axios.post(`${this.baseURLStock}/lookupdepacct/lookup`, data, this.headers)
        .then((result) => {
          console.log("SUCCESS : lookupdepacct");
          if (result.data.body.result == "Y") {
            console.log(result.data.body.lists);
            this.lookupDepAcc = result.data.body.lists;
          }
        })
        .catch((error) => {
          console.log("ERROR : lookupdepacct");
          console.error('Request canceled', error);
        });
    },
    claerAccountDetail() {
      this.lookupDepAcc = []
      this.depInfo.cardid = '';
      this.depInfo.prefixcode = '';
      this.depInfo.prefixdesc = '';
      this.depInfo.custname = '';
      this.prefixcodeEditFlag = 'read-only';
    }
  },
}
</script>