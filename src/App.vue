<template>
  <router-view></router-view>
</template>

<script></script>
<style>
.container.fill-height > .row {
  flex: 1 1 100%;
  max-width: calc(100%) !important;
}

.v-card--link:focus:before {
  opacity: 0 !important;
}
.v-toolbar__content {
  z-index: 10002 !important;
}
</style>
