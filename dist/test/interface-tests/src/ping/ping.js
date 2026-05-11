/* eslint-env mocha */
import { expect } from 'aegir/chai';
import all from 'it-all';
import { getDescribe, getIt } from '../utils/mocha.js';
import { expectIsPingResponse, isPong } from './utils.js';
export function testPing(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('.ping', function () {
        this.timeout(60 * 1000);
        let ipfsA;
        let ipfsB;
        let nodeBId;
        before(async function () {
            ipfsA = (await factory.spawn()).api;
            ipfsB = (await factory.spawn()).api;
            nodeBId = await ipfsB.id();
            await ipfsA.swarm.connect(nodeBId.addresses[0]);
        });
        after(async function () {
            await factory.clean();
        });
        it('should send the specified number of packets', async () => {
            const count = 3;
            const responses = await all(ipfsA.ping(nodeBId.id, { count }));
            responses.forEach(expectIsPingResponse);
            const pongs = responses.filter(isPong);
            expect(pongs.length).to.equal(count);
        });
        it('should fail when pinging a peer that is not available', () => {
            const notAvailablePeerId = 'QmUmaEnH1uMmvckMZbh3yShaasvELPW4ZLPWnB4entMTEn';
            const count = 2;
            return expect(all(ipfsA.ping(notAvailablePeerId, { count }))).to.eventually.be.rejected();
        });
        it('should fail when pinging an invalid peer Id', () => {
            const invalidPeerId = 'not a peer ID';
            const count = 2;
            return expect(all(ipfsA.ping(invalidPeerId, { count }))).to.eventually.be.rejected();
        });
        it('can ping without options', async () => {
            const res = await all(ipfsA.ping(nodeBId.id));
            expect(res.length).to.be.ok();
            expect(res[0].success).to.be.true();
        });
    });
}
//# sourceMappingURL=ping.js.map