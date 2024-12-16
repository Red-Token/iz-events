<script setup lang="ts">
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {onBeforeMount, onMounted, reactive, type Ref, ref} from "vue";
import {useRoute} from "vue-router";
import {now, setContext, sleep} from "@welshman/lib";
import {getDefaultAppContext, getDefaultNetContext} from "@welshman/app";
import {DELETE, normalizeRelayUrl, REACTION, type TrustedEvent} from "@welshman/util";
import {EventType, SignerType, SynchronisedSession} from "iz-nostrlib";
import {
  AbstractNip52CalendarEvent,
  Nip52CalendarEvent,
  Nip52CalendarEventTemplate
} from "iz-nostrlib/dist/org/nostr/nip52/Nip52CalendarEventTemplate";
import MapComponent from "@/components/MapComponent.vue";
import * as ngeohash from 'ngeohash';


// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

const route = useRoute();
const userId = route.params.id;
const zor = reactive({msg: undefined})

const x = 55.7047;
const y = 13.1910;

const calEvent = reactive({cal: new Nip52CalendarEventTemplate('', '', '', '1900-01-01')})

onBeforeMount(async () => {
  const aliceNSec = 'nsec18c4t7czha7g7p9cm05ve4gqx9cmp9w2x6c06y6l4m52jrry9xp7sl2su9x'
  const msg = 'Hello World'
  let triggered = false

  // Init welshman
  setContext({
    net: getDefaultNetContext(),
    app: getDefaultAppContext()
  })

  // const url = 'wss://relay.lxc'
  const url = 'wss://relay.stream.labs.h3.se'
  const relays = [normalizeRelayUrl(url)]

  const aliceSession = await new SynchronisedSession({type: SignerType.NIP01, nsec: aliceNSec}, relays).init()

  const TEST_EVENT = 10666

  aliceSession.eventStream.emitter.on(EventType.DISCOVERED, (event: TrustedEvent) => {

    calEvent.cal = new Nip52CalendarEvent(event)

    const resMsg = JSON.parse(event.content)
    zor.msg = resMsg
    console.log(resMsg)
    console.log(event)
  })

  console.log(userId)

  const sub = aliceSession.createSubscription([
    // Here we subscribe to the membership kind
    {kinds: [TEST_EVENT], ids: [userId]},
  ])
})

onMounted(async () => {
  const xxx = '9q8yyk8yt'
  const coordinates = ngeohash.decode(xxx)
  console.log(coordinates)
});

</script>

<template>
  <div class="container">
    {{ calEvent.cal.title }}
    {{ calEvent.cal.description }}
    <div v-for="hash in calEvent.cal.geoHashes">
      <MapComponent :hash="hash" :title="calEvent.cal.title"/>
    </div>
  </div>
</template>

<style scoped>

</style>
