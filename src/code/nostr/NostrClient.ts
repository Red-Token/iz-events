import {setContext} from "@welshman/lib";
import {getDefaultAppContext, getDefaultNetContext} from "@welshman/app";
import {SignerType, SynchronisedSession} from "iz-nostrlib";

export class NostrClient {
    private static instance: NostrClient;

    static getInstance(): NostrClient {
        if (!NostrClient.instance) {
            NostrClient.instance = new NostrClient();
        }
        return NostrClient.instance;
    }

    constructor() {
        // Init welshman
        setContext({
            net: getDefaultNetContext(),
            app: getDefaultAppContext()
        })
    }

    signerData: SignerData

    logIn(signerData: any): void {
        // const aliceNSec = 'nsec18c4t7czha7g7p9cm05ve4gqx9cmp9w2x6c06y6l4m52jrry9xp7sl2su9x'
        // const garfieldId = {type: SignerType.NIP01, nsec: aliceNSec}
        this.signerData = signerData;
    }

    logOut(): void {
        this.signerData = undefined
    }

    isLoggedIn(): boolean {
        return this.signerData !== undefined
    }

    // getPublicKey(): string {
    //     return "nostr";
    // }
    //
    // getNPub(): string {
    //     return "nostr";
    // }

    getSignerData() {
        return this.signerData;
    }

    createSession(relays: string[]) {
        return new SynchronisedSession(this.signerData, relays)
    }
}
