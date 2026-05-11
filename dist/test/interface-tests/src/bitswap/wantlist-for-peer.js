/* eslint-env mocha */
import { CID } from 'multiformats/cid';
import { getDescribe, getIt } from '../utils/mocha.js';
import { waitForWantlistKey } from './utils.js';
export function testWantlistForPeer(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('.bitswap.wantlistForPeer', function () {
        this.timeout(60 * 1000);
        let ipfsA;
        let ipfsB;
        const key = 'QmUBdnXXPyoDFXj3Hj39dNJ5VkN3QFRskXxcGaYFBB8CNR';
        before(async function () {
            ipfsA = (await factory.spawn()).api;
            ipfsB = (await factory.spawn()).api;
            // Add key to the wantlist for ipfsB
            ipfsB.block.get(CID.parse(key)).catch(() => { });
            const ipfsBId = await ipfsB.id();
            await ipfsA.swarm.connect(ipfsBId.addresses[0]);
        });
        after(async function () {
            await factory.clean();
        });
        it('should get the wantlist by peer ID for a different node', async () => {
            const ipfsBId = await ipfsB.id();
            return waitForWantlistKey(ipfsA, key, {
                peerId: ipfsBId.id,
                timeout: 60 * 1000
            });
        });
    });
}
//# sourceMappingURL=wantlist-for-peer.js.map