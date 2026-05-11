/* eslint-env mocha */
import { expect } from 'aegir/chai';
import { getDescribe, getIt } from '../utils/mocha.js';
export function testConnect(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('.swarm.connect', function () {
        this.timeout(80 * 1000);
        let ipfsA;
        let ipfsB;
        let ipfsBId;
        before(async function () {
            ipfsA = (await factory.spawn()).api;
            ipfsB = (await factory.spawn()).api;
            ipfsBId = await ipfsB.id();
        });
        after(async function () {
            await factory.clean();
        });
        it('should connect to a peer', async () => {
            let peers;
            peers = await ipfsA.swarm.peers();
            expect(peers).to.have.length(0);
            await ipfsA.swarm.connect(ipfsBId.addresses[0]);
            peers = await ipfsA.swarm.peers();
            expect(peers).to.have.length.above(0);
        });
    });
}
//# sourceMappingURL=connect.js.map