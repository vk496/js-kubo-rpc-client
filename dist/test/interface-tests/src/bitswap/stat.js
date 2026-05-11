/* eslint-env mocha */
import { expect } from 'aegir/chai';
import { expectIsBitswap } from '../stats/utils.js';
import { getDescribe, getIt } from '../utils/mocha.js';
export function testStat(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('.bitswap.stat', function () {
        this.timeout(60 * 1000);
        let ipfs;
        before(async function () {
            ipfs = (await factory.spawn()).api;
        });
        after(async function () {
            await factory.clean();
        });
        it('should get bitswap stats', async () => {
            const res = await ipfs.bitswap.stat();
            expectIsBitswap(null, res);
        });
        it('should not get bitswap stats when offline', async () => {
            const node = await factory.spawn();
            await node.stop();
            return expect(node.api.bitswap.stat()).to.eventually.be.rejected();
        });
    });
}
//# sourceMappingURL=stat.js.map