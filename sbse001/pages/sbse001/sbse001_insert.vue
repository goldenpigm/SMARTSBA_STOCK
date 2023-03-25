<template>
  <div class="container body">
    <div class="main_container">
      <div class="right_col">
        <div class="row">
          <div id="program_content" class="col-md-12 col-sm-12" style="">
            <div id="sbse001_insert_content" class="container">
              <h5 id="title" class="pb-2">Stock Management Entry</h5>
              <div class="container-fluid p-0">
                <h6 id="subtitle_result" class="header px-4 p-1">
                  <span id="add_transaction" class="nav-title-item">Add Transaction</span>
                  <span id="subtitle_type" class="nav-title-item"> DE </span>
                  <span id="infosubprog" data-for="AboutProgram" class="nav-item dropdown"></span>
                </h6>
                <div class="content p-4 container">
                  <AccountDetail />
                  <TransactionDetail />
                  <div id="CertificateDetail">
                    <div id="detail" class="container keyform-section">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-lg-12 p-1 pr-2">
                          <div class="portlet light bordered h-100">
                            <div class="container section">
                              <div class="title-row">รายละเอียดใบหุ้น / Certificate Detail</div>
                            </div>
                            <div class="row">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

import AccountDetail from "@/components/account/AccountDetail"
import TransactionDetail from "@/components/trandetail/TransactionDetail"

export default {
  name: 'SBSE001_INSERT',
  components: {
    AccountDetail,
    TransactionDetail
  },
  data() {
    return {
      // account: "account",
      depInfo: {
        // account: "",
        depAcc: "",
        cardid: "",
        prefixCode: "",
        prefix: "",
        name: ""
      },
      // baseURLUtil: useRuntimeConfig().public.baseURLUtil,
      // baseURLStock: useRuntimeConfig().public.baseURLStock,
      // headers: {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Microservice": "false",
      //     "Fs-Key": "b17d681e-a827-45f8-bcce-6dff3c3a6eef",
      //     "Fs-Track": "kml2"
      //   }
      // },
      // lookupFilter: {
      //   account: []
      // },
      // lookupAcc: [],
      // lookupDepAcc: []
    }
  },
  mounted() {
    // this.depAccount("000004-1");
  },
  methods: {
    // depAccount(account) {
    //   const data = {
    //     "account": account
    //   };
    //   axios.post(`${this.baseURLStock}/inqstkaccdetail/inquiry`, data, this.headers)
    //     .then((result) => {
    //       console.log("SUCCESS");
    //       console.log(result.data);
    //       if (result.data.body.result == "Y") {
    //         this.lookupDepAcc = result.data.body;
    //       }
    //       console.log(this.lookupDepAcc);
    //     })
    //     .catch((error) => {
    //       console.log("ERROR");
    //       console.error('Request canceled', error);
    //     });
    // },
  },
}
</script>

<style>
div#program_content {
  height: auto;
}

input#regtsd {
  position: absolute;
}

label#regtsd_label {
  padding-left: 24px;
  cursor: pointer;
  width: fit-content;
}
</style>