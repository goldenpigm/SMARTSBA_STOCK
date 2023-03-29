<template>
  <li class="k-item" @click="handleClick">
    <span class="">{{ dataItem.purposecode ? dataItem.purposecode + ' : ' : '' }} {{ dataItem.purposeename }}</span>
  </li>
</template>
<script>
export default {
  emits: {
    click: null,
  },
  props: {
    id: String,
    index: Number,
    dataItem: [Object, String],
    textField: String,
    focused: Boolean,
    selected: Boolean,
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    },
  },
};
</script>
