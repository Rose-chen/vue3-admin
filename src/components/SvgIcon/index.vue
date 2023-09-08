<script setup lang="ts">
defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: {
    type: String,
  },
  color: {
    type: String,
  },
  width: {
    type: String,
    default: '16px',
  },
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<template>
  <svg :style="{ width, height }">
    <!-- 属性值以icon开始 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<style scoped></style>
