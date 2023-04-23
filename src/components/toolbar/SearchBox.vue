<script setup></script>

<template>
  <form class="search-box" action="" method="get">
    <input class="search-input" type="text" placeholder="请输入..." />
    <button type="submit" class="search-btn">
      <svg
        width="24"
        height="24"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4 4 11.611 4 21s7.611 17 17 17z"
          stroke="currentColor"
          stroke-width="4"
          stroke-linejoin="round"
        />
        <path
          d="M26.657 14.343A7.975 7.975 0 0 0 21 12c-2.209 0-4.209.895-5.657 2.343M33.222 33.222l8.485 8.485"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </form>
</template>

<style lang="scss">
.search-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-input {
  outline: 0;
  border: 0;
  font-size: inherit;
  padding: 0 8px;
  line-height: 38px;
  background-color: var(--bg-card-color);
  border-radius: 6px 0 0 6px;
}

.search-btn {
  border: 0;
  color: inherit;
  background-color: var(--bg-card-color);
  padding: 7px 12px;
  border-radius: 0 6px 6px 0;

  svg {
    vertical-align: bottom;
  }

  &:hover {
    background-color: var(--hover-color);
  }
}
</style>
