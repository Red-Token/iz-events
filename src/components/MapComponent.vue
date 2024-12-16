<script setup lang="ts">

import {onMounted} from "vue";
import L from "leaflet";
import ngeohash from "ngeohash";

const props = defineProps(['hash', 'title'])

onMounted(() => {
  const coordinates = ngeohash.decode(props.hash);
  const map = L.map("map2").setView([coordinates.latitude, coordinates.longitude], 13);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  L.marker([coordinates.latitude, coordinates.longitude]).addTo(map)
      .bindPopup(props.title)
      .openPopup();
})

</script>

<template>
  <div>
    <div id="map2" style="height: 400px;"></div>
  </div>
</template>

<style scoped>
</style>
