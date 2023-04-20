<script setup>
const html = document.documentElement
const currentTheme = localStorage.getItem('theme')

html.classList.add(currentTheme)

function toggleTheme() {
  html.classList.toggle('dark')
  html.classList.toggle('light')
  localStorage.setItem(
    'theme',
    html.classList.contains('dark') ? 'dark' : 'light'
  )
}
</script>

<template>
  <button class="toggle-theme" @click="toggleTheme"></button>
</template>

<style lang="scss" scoped>
.toggle-theme {
  --icon-theme: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath fill='%23888' d='M15 2h2v4.96h-2zm6.687 6.89l3.507-3.506 1.414 1.414-3.507 3.507zM25.04 15H30v2h-4.96zm-3.347 8.104l1.414-1.414 3.507 3.507L25.2 26.61zM15 25.04h2V30h-2zm-9.604.162l3.508-3.507 1.414 1.414-3.507 3.507zM2 15h4.96v2H2zm3.39-8.197l1.415-1.414 3.507 3.507-1.414 1.414zM16 12a4 4 0 1 1-4 4 4 4 0 0 1 4-4m0-2a6 6 0 1 0 6 6 6 6 0 0 0-6-6z'/%3E%3C/svg%3E");
  position: absolute;
  right: 24px;
  top: 24px;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  color: inherit;
  background-color: currentColor;
  mask: var(--icon-theme) no-repeat;
  mask-size: 100% 100%;
  -webkit-mask: var(--icon-theme) no-repeat;
  -webkit-mask-size: 100% 100%;
  cursor: pointer;
}

.dark .toggle-theme {
  --icon-theme: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Cpath fill='%23888' d='M13.502 5.414a15.075 15.075 0 0 0 11.594 18.194 11.113 11.113 0 0 1-7.975 3.39c-.138 0-.278.005-.418 0a11.094 11.094 0 0 1-3.2-21.584M14.98 3a1.002 1.002 0 0 0-.175.016 13.096 13.096 0 0 0 1.825 25.981c.164.006.328 0 .49 0a13.072 13.072 0 0 0 10.703-5.555 1.01 1.01 0 0 0-.783-1.565A13.08 13.08 0 0 1 15.89 4.38 1.015 1.015 0 0 0 14.98 3z'/%3E%3C/svg%3E");
}
</style>
