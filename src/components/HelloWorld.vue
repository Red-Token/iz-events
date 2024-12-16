<script setup lang="ts">
defineProps<{
  msg: string
}>()

// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import {onMounted} from "vue";
//
// const x = 55.7047;
// const y = 13.1910;
//
// onMounted(() => {
//   const map = L.map("map").setView([x, y], 13);
//   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
//
//   L.marker([x, y]).addTo(map)
//       .bindPopup("Zool is cool")
//       .openPopup();
// });
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
