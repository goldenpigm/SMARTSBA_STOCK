<template>
  <li class="k-item" @click="handleClick">
    <span class="">{{ dataItem.purposecode ? dataItem.purposecode + ' : ' : '' }} {{ dataItem.purposeename }}</span>
  </li>
</template>

<script setup lang="ts">
interface PurposeLookupProps {
  id?: string,
  index?: number
  dataItem?: any
  textField?: string,
  focused?: boolean,
  selected?: boolean,
}
const props = defineProps<PurposeLookupProps>();
const emit = defineEmits(['click']);

const handleClick = (event: any) => {
  emit("click", event);
}
</script>
