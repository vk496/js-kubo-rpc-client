/* eslint-env mocha */
import { expect } from 'aegir/chai';
import { getDescribe, getIt } from '../utils/mocha.js';
export function testVersion(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('.repo.version', () => {
        let ipfs;
        before(async function () {
            ipfs = (await factory.spawn()).api;
        });
        after(async function () {
            await factory.clean();
        });
        it('should get the repo version', async () => {
            const version = await ipfs.repo.version();
            expect(version).to.exist();
        });
    });
}
//# sourceMappingURL=version.js.map