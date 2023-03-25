<template>
  <Calendar 
    :value="value" 
    @change="handleChange" 
  />
</template>
<script>
import { Calendar } from '@progress/kendo-vue-dateinputs';

export default {
  props: Calendar.props,
  components: {
    Calendar
  },
  methods: {
    handleChange(event) {
      console.log(event);
      console.log(this.$props);
      console.log(this.$data);
      this.$emit('change', {
        event: event,
        value: event.value,
        target: {
          value: event.value
        }
      });
    }
  },
}
</script>