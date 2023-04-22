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
          d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z"
          fill="none"
          stroke="currentColor"
          stroke-width="4"
          stroke-linejoin="round"
        />
        <path
          d="M26.657 14.3431C25.2093 12.8954 23.2093 12 21.0001 12C18.791 12 16.791 12.8954 15.3433 14.3431"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M33.2216 33.2217L41.7069 41.707"
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
