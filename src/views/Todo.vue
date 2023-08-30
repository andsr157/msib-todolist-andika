<script setup lang="ts">
import { onMounted, computed } from "vue"
import ButtonComponent from "../components/Button.vue"
import CardComponent from "../components/Card.vue"
import InputComponent from "../components/Input.vue"

import { useTodoStore } from "../store/todoStore"

const todoStore = useTodoStore()

const dynamicGetter = computed(() => {
  if (todoStore.mode === "all") {
    return todoStore.filterAll
  } else if (todoStore.mode === "active") {
    return todoStore.filterActive
  } else if (todoStore.mode === "completed") {
    return todoStore.filterCompleted
  } else {
    return todoStore.filterAll
  }
})

onMounted(() => {
  todoStore.fetchTodo()
})
</script>

<template>
  <h1 class="text-center text-6xl font-thin my-5">Todos</h1>
  <InputComponent
    v-model="todoStore.inputValue"
    @keyup.enter="todoStore.createTodo"
  />
  <!-- <p v-if="inputError" class="text-red-600 text-sm">{{ inputError }}</p> -->

  <div class="flex justify-between my-4">
    <p class="text-md">{{ todoStore.countUncompleted }} item left</p>
    <ButtonComponent @click="todoStore.mode = 'all'" name="All" />
    <ButtonComponent @click="todoStore.mode = 'active'" name="Active" />
    <ButtonComponent @click="todoStore.mode = 'completed'" name="Completed" />
    <p class="text-md cursor-pointer" @click="todoStore.clearTodo">
      clear completed
    </p>
  </div>

  <CardComponent :todo="dynamicGetter" />
</template>
