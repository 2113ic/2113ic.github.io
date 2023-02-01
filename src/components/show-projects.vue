<script setup>
import CONFIG from '../config'
import HeadLine from './head-line.vue'

const data = CONFIG.projects
</script>

<template>
  <div class="projects">
    <HeadLine #title>项目</HeadLine>
    <div class="content">
      <a class="project" v-for="item in data" :href="item.url">
        <div class="icon" v-html="item.icon"></div>
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="summary">{{ item.summary }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.icon {
  width: 36px;
  height: 36px;
  margin-right: 12px;
  font-size: 0;
}

.title {
  line-height: 28px;
}

.summary {
  color: var(--font-color-4);
  font-size: 0.875rem;
}

.content {
  display: grid;
  grid-gap: 1rem;
  gap: 1rem;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  margin-bottom: 24px;

  .project {
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: var(--bg-color-2);
    border-radius: 8px;

    &:hover {
      background-color: var(--bg-color-4);
    }
  }
}

@media (min-width: 640px) {
  .content {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
