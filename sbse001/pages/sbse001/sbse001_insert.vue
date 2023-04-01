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
                  <AccountDetail 
                    :title="'ข้อมูลเลขที่บัญชีหลักทรัพย์ผู้ฝาก / Depositor’s Information'"
                    :mode="mode"
                    :detailPage="detailPage" 
                    @account-detail-value="accountDetailValue" />
                  <TrandetailTransactionDetail />
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

<script setup lang="ts">
const mode = 'insert'
// const accdetail = {
//   account: 'test_account',
//   depacc: 'test_depacc',
//   cardid: 'test_cardid',
//   prefixcode: 'test_prefixcode',
//   prefixdesc: 'test_prefixdesc',
//   custname: 'test_custname',
//   test: 'test_test'
// }
const detailPage = {
  account: {
    label: 'เลขที่บัญชีหลักทรัพย์ / Account',
    id: 'account',
    name: 'account',
    className: 'col-sm-12 col-md-4 col-lg-4 px-0',
    require: true
  },
  depacc: {
    label: 'Depository Account',
    id: 'depository_account',
    name: 'depository_account',
    className: 'col-sm-12 col-md-4 col-lg-4 px-0',
    require: true
  },
  cardid: {
    label: 'เลขประจำตัวประชาชน / Card ID',
    id: 'cardid',
    name: 'cardid',
    className: 'col-sm-12 col-md-4 col-lg-4 px-0',
    require: true
  },
  prefixcode: {
    label: 'รหัสคำนำหน้า / Prefix Code',
    id: 'prefixcode',
    name: 'prefixcode',
    className: 'col-sm-12 col-md-4 col-lg-4 px-0',
    require: true
  },
  prefixdesc: {
    label: 'คำนำหน้า / Prefix Desc.',
    id: 'prefixdesc',
    name: 'prefixdesc',
    className: 'col-sm-12 col-md-4 col-lg-4 px-0',
    require: true
  },
  custname: {
    label: 'ชื่อ-นามสกุลของลูกค้า / Customer Name',
    id: 'custname',
    name: 'custname',
    className: 'col-sm-12 col-md-4 col-lg-4 px-0',
    require: true
  }
}

const accountDetailValue = (value: object): void => {
  console.log('accountDetailValue', value);
};
</script>