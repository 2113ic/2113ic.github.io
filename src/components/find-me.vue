<script setup>
import CONFIG from '../config'

const data = CONFIG.findme
</script>

<template>
  <ul class="find-me">
    <li v-for="item in data" :style="{ '--bgColor': item.background }">
      <a :href="item.url">
        <div class="icon" v-html="item.icon"></div>
        <div class="text" v-if="item.label">{{ item.label }}</div>
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.find-me {
  padding: 0;
  list-style: none;
  overflow: hidden;

  li {
    float: left;
    padding: 8px 14px;
    margin: 10px 10px 0 0;
    border-radius: 6px;
    background-color: var(--bg-color-3);

    &:hover {
      color: var(--white);
      background-color: var(--bgColor, #343438);
    }
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.icon {
  font-size: 0;
}

.text {
  margin-left: 5px;
}
</style>
