/* eslint-env mocha */
import { expectIsRepo } from '../stats/utils.js';
import { getDescribe, getIt } from '../utils/mocha.js';
export function testStat(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('.repo.stat', () => {
        let ipfs;
        before(async function () {
            ipfs = (await factory.spawn()).api;
        });
        after(async function () {
            await factory.clean();
        });
        it('should get repo stats', async () => {
            const res = await ipfs.repo.stat();
            expectIsRepo(null, res);
        });
    });
}
//# sourceMappingURL=stat.js.map