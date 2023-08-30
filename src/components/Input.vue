<script setup lang="ts">
defineProps<{
  modelValue: string
}>()
</script>
<template>
  <input
    type="text"
    class="inputSearch bg-[#3a3a3a] w-full h-10 placeholder-[#6B6B6B] outline-none p-2 px-3"
    placeholder="What needs to be done"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    required
  />
</template>

<style></style>
