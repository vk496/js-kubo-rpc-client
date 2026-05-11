import delay from 'delay';
import { CID } from 'multiformats/cid';
import { sha256 } from 'multiformats/hashes/sha2';
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string';
export async function fakeCid(data) {
    const bytes = data ?? uint8ArrayFromString(`TEST${Math.random()}`);
    const mh = await sha256.digest(bytes);
    return CID.createV0(mh);
}
export async function ensureReachable(nodeA, nodeB) {
    async function canFindOnDHT(source, target) {
        const { id } = await target.id();
        for await (const event of source.dht.query(id)) {
            if (event.name === 'PEER_RESPONSE' && event.from?.toString() === id.toString()) {
                return;
            }
        }
        throw new Error(`Could not find ${id} in DHT`);
    }
    const nodeBId = await nodeB.id();
    await nodeA.swarm.connect(nodeBId.addresses[0]);
    while (true) {
        try {
            await Promise.all([
                canFindOnDHT(nodeA, nodeB),
                canFindOnDHT(nodeB, nodeA)
            ]);
            break;
        }
        catch {
            await delay(1000);
        }
    }
}
//# sourceMappingURL=utils.js.map