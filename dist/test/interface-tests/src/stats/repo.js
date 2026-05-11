/* eslint-env mocha */
import { getDescribe, getIt } from '../utils/mocha.js';
import { expectIsRepo } from './utils.js';
export function testRepo(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('.stats.repo', () => {
        let ipfs;
        before(async function () {
            ipfs = (await factory.spawn()).api;
        });
        after(async function () {
            await factory.clean();
        });
        it('should get repo stats', async () => {
            const res = await ipfs.stats.repo();
            expectIsRepo(null, res);
        });
    });
}
//# sourceMappingURL=repo.js.map