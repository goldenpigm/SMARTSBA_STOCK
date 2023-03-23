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
                  <div id="TransactionDetail">
                    <div id="detail" class="container keyform-section">
                      <div class="row">
                        <div class="col-xs-12 col-sm-12 col-lg-12 p-1 pr-2">
                          <div class="portlet light bordered h-100">
                            <div class="container section">
                              <div class="title-row">รายละเอียดการทำรายการ / Transaction Detail</div>
                            </div>
                            <div class="row">
                              <div class="col-sm-12 col-md-4 col-lg-4">
                                <div class="form-group">
                                  <label id="symbol_label" for="symbol" class="require">หลักทรัพย์ / Symbol</label>
                                  <input name="symbol" id="symbol" value="" placeholder="Symbol" required />
                                  <small id="symboltHelpText" data-for="symbol"
                                    class="form-text text-muted errText">require</small>
                                </div>
                              </div>
                              <div class="col-sm-6 col-md-2 col-lg-2">
                                <div class="form-group">
                                  <label id="market_label" for="market">Market</label>
                                  <input name="market" id="market" readonly placeholder="N/A"
                                    class="form-control read-only" value="">
                                </div>
                              </div>
                              <div class="col-sm-6 col-md-2 col-lg-2">
                                <div class="">
                                  <label id="" for="regtsd" class=""></label>
                                  <input type="checkbox" id="regtsd" class="k-checkbox" value="">
                                  <label id="regtsd_label" for="regtsd" class="">Registrar is TSD</label>
                                </div>
                              </div>
                              <div class="col-sm-12 col-md-4 col-lg-4">
                                <div class="form-group">
                                  <label id="purpose_label" for="purpose" class="require">Purpose</label>
                                  <input name="purpose" id="purpose" value="" placeholder="Purpose" required />
                                  <small id="purposetHelpText" data-for="purpose"
                                    class="form-text text-muted errText">require</small>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-12 col-md-4 col-lg-4">
                                <div class="form-group">
                                  <label id="avgcost_label" for="avgcost_desc" class="require">Avg. Cost</label>
                                  <input name="avgcost" id="avgcost" placeholder="0.000000" class="form-control"
                                    value="0.000000" required>
                                  <small id="avgcostHelpText" data-for="avgcost"
                                    class="form-text text-muted errText">require</small>
                                </div>
                              </div>
                              <div class="col-sm-12 col-md-4 col-lg-4">
                                <div class="form-group radio-group">
                                  <label id="tradingflag_label" for="tradingflag" class="">Trading Flag</label>
                                  <div class="input-group col-sm-12">
                                    <div class="radio-btn col-md-6">
                                      <input type="radio" name="tradingflag" id="tradingflagY" value="Y" class="k-radio"
                                        checked>
                                      <label for="tradingflagY" id="tradingflagY_label"
                                        class="k-radio-label">Listed</label>
                                    </div>
                                    <div class="form-check radio-btn col-md-6">
                                      <input type="radio" name="tradingflag" id="tradingflagN" value="N" class="k-radio">
                                      <label for="tradingflagN" id="tradingflagN_label" class="k-radio-label">Non -
                                        Listed</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-12 col-md-4 col-lg-4">
                                <div class="form-group">
                                  <label id="xdate_label" for="xdate" class="">X Date</label>
                                  <input name="xdateavgcost" id="xdate" placeholder="" class="form-control" value="">
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-12 col-md-4 col-lg-4">
                                <div class="form-group radio-group">
                                  <label id="locationflag_label" for="locationflag" class="">Location Flag</label>
                                  <div class="input-group col-sm-12">
                                    <div class="radio-btn col-md-6">
                                      <input type="radio" name="locationflag" id="locationflagL2" value="1"
                                        class="k-radio" checked>
                                      <label for="locationflagL2" id="locationflagL2_label"
                                        class="k-radio-label">Depository (L2)</label>
                                    </div>
                                    <div class="form-check radio-btn col-md-6">
                                      <input type="radio" name="locationflag" id="locationflagL4" value="0"
                                        class="k-radio">
                                      <label for="locationflagL4" id="locationflagL4_label" class="k-radio-label">Broker
                                        (L4)</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-sm-12 col-md-4 col-lg-4">
                                <div class="form-group radio-group">
                                  <label for="tsdconfirm" id="tsdconfirm_label">Create after TSD confirm<span tabindex="0"
                                      data-toggle="tooltip" data-placement="top"
                                      title="สำหรับกำหนดการสร้างรายการ DE บนระบบ SBA หลัง TSD Confirm"
                                      class="fas fa-question-circle"></span></label>
                                  <div data-toggle="buttons" class="btn-group">
                                    <div input_name="tsdconfirm" input_value="1" id="tsdconfirm_yes_btn"
                                      class="radio-btn">
                                      <label role="button" id="tsdconfirm_yes"
                                        class="btn btn-default btn-on-1 btn-sm active"><input type="radio" value="1"
                                          name="tsdconfirm" id="radio-ch">YES</label>
                                    </div>
                                    <div input_name="tsdconfirm" input_value="0" input_checked="" id="tsdconfirm_no_btn"
                                      class="btn-group radio-btn">
                                      <label role="button" id="tsdconfirm_no"
                                        class="btn btn-default btn-off-1 btn-sm"><input type="radio" value="0"
                                          name="tsdconfirm" id="radio-ch2">NO</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-sm-12 col-md-6 col-lg-6">
                                <div class="form-group">
                                  <label id="objective_label" for="objective" class="">วัตถุประสงค์ / Objective</label>
                                  <input name="objective" id="objective" value="" placeholder="Choose ..." />
                                </div>
                              </div>
                              <div class="col-sm-12 col-md-6 col-lg-6">
                                <div class="form-group">
                                  <label id="remark_label" for="remark" class="">หมายเหตุ / Remark</label>
                                  <input name="remark" id="remark" value="" placeholder="Choose ..." />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default {
  name: 'SBSE001',
  components: {
    AccountDetail,
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