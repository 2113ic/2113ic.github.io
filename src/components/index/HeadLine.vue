<script setup>
defineProps({
  more: String,
})
</script>

<template>
  <div class="head">
    <h2><slot name="title"></slot></h2>
    <a :href="more" v-if="more !== undefined">
      <svg class="icon svg-more" width="32" height="32" viewBox="0 0 21 21">
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m13.5 6.497l4 4.002l-4 4.001m-9-4h13"
        ></path>
      </svg>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  width: 36px;
  height: 36px;
  margin-right: 12px;
  font-size: 0;
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .svg-more {
    color: var(--font-subtitle-color);
    vertical-align: bottom;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: var(--font-color);
    }
  }
}
</style>
