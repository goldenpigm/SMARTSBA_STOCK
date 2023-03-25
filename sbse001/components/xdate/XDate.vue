<template>
  <div class="form-group " :class="xdateClass">
    <label id="xdate_label" for="xdate">X Date</label>
    <DatePicker 
      :id="'xdate'" 
      :value="currentDate" 
      :format="'dd/MM/yyyy'" 
      
      :disable-dates="disableDates"
      :footer="false" 
      @change="onChange"
      :ref="'xdate'"></DatePicker>
  </div>
</template>

<script>
import axios from "axios";
import { DatePicker } from '@progress/kendo-dateinputs-vue-wrapper';

export default {
  name: 'XDate',
  components: {
    DatePicker,
  },
  props: {
    xdateClass: {
      type: String,
      required: true,
      readonly: true
    },
  },
  data() {
    return {
      fsLang: useRuntimeConfig().public.FS_LANG,
      baseURLCash: useRuntimeConfig().public.BASE_URL_CASH,
      headers: {
        headers: {
          "Content-Type": "application/json",
          "Microservice": "false",
          "Fs-Key": "b17d681e-a827-45f8-bcce-6dff3c3a6eef",
          "Fs-Track": "kml2"
        }
      },
      xdatetDetail: {
        xdate: '',
      },
      errorTextFlag: {
        xdate: false,
      },
      errorText: {
        xdate: '',
      },

      holidayLists: [],
      currentDate: new Date(),
      value: null,
    }
  },
  mounted() {
    this.lookupCalendar();

  },
  computed: {

  },
  create() {
  },
  methods: {
    async lookupCalendar() {
      let data = {
        'from_date': '',
        'to_date': ''
      }
      await axios.post(`${this.baseURLCash}/lookupcalendar/collect`, data, this.headers)
        .then((result) => {
          console.log("SUCCESS : lookupcalendar");
          if (result.data.body.result == "Y") {
            let holidaysDate = [];
            for (let date of result.data.body.lists) {
              if (date.holidaydate.trim()) {
                let d = date.holidaydate.split("/");
                holidaysDate.push(new Date(parseInt(d[2], 10), parseInt(d[1], 10) - 1, parseInt(d[0], 10)));
              }
            }
            this.holidayLists = holidaysDate;
          }
        })
        .catch((error) => {
          console.log("ERROR : lookupcalendar");
          console.error('Request canceled', error);
        });
      return this.holidayLists;
    },
    disableDates(date) {
      if (date.getDay() == 6) return true;
      if (date.getDay() == 0) return true;
      for (let holiday of this.holidayLists) {
        if (holiday.getFullYear() == date.getFullYear() &&
          holiday.getMonth() == date.getMonth() &&
          holiday.getDate() == date.getDate()) {
          return true
        }
      }
      return false;
    },
    onChange(event) {
      this.$refs.xdate.value == event.value
      console.log(this);
      console.log(event);
      console.log(this.value);
      console.log(this.$refs.xdate.value);
    },
  }
}

</script>