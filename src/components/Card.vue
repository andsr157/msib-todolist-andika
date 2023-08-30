<script setup lang="ts">
import { Todo } from "../store/todoStore"
import { useTodoStore } from "../store/todoStore"

const todoStore = useTodoStore()

defineProps<{
  todo: Todo[]
}>()
</script>

<template>
  <div v-for="item in todo" :key="item.id">
    <div class="todoCard p-3 bg-[#3a3a3a] grid grid-cols-3">
      <div class="col-span-2 flex items-center text-md">
        <input
          type="checkbox"
          v-model="item.completed"
          @change="todoStore.updateTodo(Number(item.id), item.completed)"
          class="rounded-none w-4 h-4 me-3"
        />
        <p :class="!item.completed ? '' : 'line-through'">
          {{ item.title }}
        </p>
      </div>
      <div class="text-right">
        <p
          class="text-red-600 cursor-pointer"
          @click="todoStore.deleteTodo(Number(item.id))"
        >
          delete
        </p>
      </div>
    </div>
  </div>
</template>
