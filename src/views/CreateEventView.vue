<script setup lang="ts">
import {onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {now, setContext, sleep} from "@welshman/lib";
import {getDefaultAppContext, getDefaultNetContext} from "@welshman/app";
import {DELETE, normalizeRelayUrl, REACTION, type TrustedEvent} from "@welshman/util";
import {EventType, SignerType, SynchronisedSession} from "iz-nostrlib";
import {Nip52CalendarEventTemplate} from "iz-nostrlib/dist/org/nostr/nip52/Nip52CalendarEventTemplate";
import * as ngeohash from 'ngeohash';

// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

const route = useRoute();
const router = useRouter();

const x = 55.7047;
const y = 13.1910;

let aliceSession: SynchronisedSession

onMounted(async () => {
  const aliceNSec = 'nsec18c4t7czha7g7p9cm05ve4gqx9cmp9w2x6c06y6l4m52jrry9xp7sl2su9x'

  // Init welshman
  setContext({
    net: getDefaultNetContext(),
    app: getDefaultAppContext()
  })

  // const url = 'wss://relay.lxc'
  const url = 'wss://relay.stream.labs.h3.se'
  const relays = [normalizeRelayUrl(url)]

  aliceSession = await new SynchronisedSession({type: SignerType.NIP01, nsec: aliceNSec}, relays).init()
});

const lat = 37.7749;
const lon = -122.4194;

const hash = ngeohash.encode(lat, lon)
// const hash = 'sfsdfsfsdf'


const event = {tile: '', description: '', date: '', place: hash}

async function createz() {
  const TEST_EVENT = 10666
  const msg = 'Hello World'

  const publisher = aliceSession.createPublisher()

  // const uuid = randomUUID()
  const uuid = 'sdfdsfsdfsd'


  const template = new Nip52CalendarEventTemplate(
      uuid,
      event.tile,
      event.description,
      event.date,
      undefined,
      undefined,
      [event.place],
  )

  const payload = template.createNip52EventTemplate()
  const publish = publisher.publish(TEST_EVENT, payload)

  // const publish = publisher.publish(TEST_EVENT, {
  //   content: JSON.stringify(msg), tags: [
  //     ['d', uuid],
  //     ['title', 'MyEvent'],
  //     ['start', '2024-10-20'],
  //     ['location', '2024-10-20'],
  //   ]
  // })
  const publishResult = await publish.result

  console.log(publishResult)

  const id = publish.event.id
  await router.push({path: `/event/${id}`});
}

</script>

<template>
  <div class="container">
    Lets create a nice EVENT, the best ever
    TITLE: <input v-model="event.tile"/>
    DES: <input v-model="event.description"/>
    Date: <input v-model="event.date"/>
    Place: <input v-model="event.place"/>
    <button @click="createz()">CREATE</button>
  </div>
</template>

<style scoped>

</style>
