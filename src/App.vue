<script setup lang="ts"></script>

<template>
  <div
    class="lg:mx-auto lg:w-4/12 my-10 bg-transparent text-white px-8 sm:w-max sm:mx-0"
  >
    <nav>
      <div class="flex justify-between mb-4">
        <router-link :to="{ name: 'Home' }">Home</router-link>
        <router-link :to="{ name: 'Todo' }">Todo</router-link>
        <router-link :to="{ name: 'About' }">About</router-link>
      </div>
      <hr />
    </nav>

    <router-view />
  </div>
</template>

<style scoped></style>
