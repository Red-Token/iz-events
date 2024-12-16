<script>

import {reactive} from "vue";

export default {
  name: "NavBar",
  methods: {
    nc() {
      return reactive(nc)
    },
    routes() {
      return this.$router.options.routes;
    },
    goTo(route) {
      this.$router.push({name: route.name});
    },
  }
}
</script>

<template>
  <div class="navbar">
    Hello World!
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.keys {
  font-size: 12px;
}
</style>
