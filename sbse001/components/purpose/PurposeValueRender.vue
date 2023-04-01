<template>
  <span class="k-input">
    <span :style="{
      'margin': 'auto 0',
      'padding-left': '5px'
    }">{{ value.purposecode ? value.purposecode + ' : ' : '' }} {{ value.purposeename }}</span>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: any
}>();
</script>