/* eslint-env mocha */
import { expect } from 'aegir/chai';
import { getDescribe, getIt } from '../utils/mocha.js';
export function testVersion(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('.version', () => {
        let ipfs;
        before(async function () {
            ipfs = (await factory.spawn()).api;
        });
        after(async function () {
            await factory.clean();
        });
        it('should get the node version', async () => {
            const result = await ipfs.version();
            expect(result).to.have.a.property('version');
            expect(result).to.have.a.property('commit');
            expect(result).to.have.a.property('repo');
        });
    });
}
//# sourceMappingURL=version.js.map