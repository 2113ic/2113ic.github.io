<script setup>
import headLine from './HeadLine.vue'
import CONFIG from '@/config'

const { articles, showNum } = CONFIG.blogs
const sorted = articles.sort((a, b) => b.time - a.time)
const data = sorted.slice(0, showNum)

function formatDate(time) {
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDay()

  return [y, m, d].map((item) => patchDate(item)).join('-')
}

function patchDate(num) {
  return num < 10 ? `0${num}` : num
}
</script>

<template>
  <div class="blogs">
    <headLine #title :more="'./blogs'">博客</headLine>
    <div class="content">
      <a v-for="item in data">
        <span>{{ item.title }}</span>
        <span class="time">{{ formatDate(item.time) }}</span>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-bottom: 24px;

  a {
    display: block;
    padding: 12px 16px;
    margin: 8px 0;
    border-radius: 8px;
    font-size: 1.125rem;
    cursor: pointer;
    overflow: hidden;
    transition: background-color .3s;

    &:hover {
      background-color: var(--hover-color);
    }
  }

  .time {
    float: right;
    color: var(--font-subtitle-color);
  }
}
</style>
