<script setup>
const goBack = () => window.history.back()
</script>

<template>
  <button class="btn-back" @click="goBack">
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 23.9917H36"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
      <path
        d="M24 36L12 24L24 12"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </svg>
  </button>
</template>

<style lang="scss">
  .btn-back {
    width: 40px;
    height: 40px;
    padding: 8px;
    border: none;
    border-radius: 50%;
    color: currentColor;
    background-color: transparent;

    &:hover {
      background-color: var(--hover-color);
    }
  }
</style>