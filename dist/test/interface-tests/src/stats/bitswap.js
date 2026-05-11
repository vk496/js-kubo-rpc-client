/* eslint-env mocha */
import { getDescribe, getIt } from '../utils/mocha.js';
import { expectIsBitswap } from './utils.js';
export function testBitswap(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('.stats.bitswap', () => {
        let ipfs;
        before(async function () {
            ipfs = (await factory.spawn()).api;
        });
        after(async function () {
            await factory.clean();
        });
        it('should get bitswap stats', async () => {
            const res = await ipfs.stats.bitswap();
            expectIsBitswap(null, res);
        });
    });
}
//# sourceMappingURL=bitswap.js.map