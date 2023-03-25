<template>
  <CalendarCell :style="cellStyle">
    {{ formattedValue }}
  </CalendarCell>
</template>
<script>
import { CalendarCell } from '@progress/kendo-vue-dateinputs';

export default {
  name: 'CustomCalendarCell',
  props: CalendarCell.props,
  components: {
    CalendarCell
  },
  computed: {
    cellStyle: function () {
      return this.$props.isWeekend ? { opacity: '.6', color: 'red' } : { opacity: '1', color: 'black' }
    }
  },
}
</script>