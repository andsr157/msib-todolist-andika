<script lang="ts" setup>
defineProps<{
  name: string
  classname: boolean
}>()
</script>

<template>
  <button
    type="button"
    :class="`${
      classname ? 'bg-red-600' : 'bg-black'
    } text-white  lg:py-2 lg:px-3 focus:outline-white text-sm rounded-md hover:bg-[#2e2e2e] py-0 px-1 mx-1 `"
  >
    {{ name }}
  </button>
</template>
