/* eslint-env mocha */
import { expect } from 'aegir/chai';
import { getDescribe, getIt } from '../utils/mocha.js';
export function testDisconnect(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('.swarm.disconnect', function () {
        this.timeout(80 * 1000);
        let ipfsA;
        let ipfsB;
        let ipfsBId;
        before(async function () {
            ipfsA = (await factory.spawn()).api;
            ipfsB = (await factory.spawn()).api;
            ipfsBId = await ipfsB.id();
        });
        beforeEach(async function () {
            await ipfsA.swarm.connect(ipfsBId.addresses[0]);
        });
        after(async function () {
            await factory.clean();
        });
        it('should disconnect from a peer', async () => {
            let peers;
            peers = await ipfsA.swarm.peers();
            expect(peers).to.have.length.above(0);
            await ipfsA.swarm.disconnect(ipfsBId.addresses[0]);
            peers = await ipfsA.swarm.peers();
            expect(peers).to.have.length(0);
        });
    });
}
//# sourceMappingURL=disconnect.js.map