/* eslint-env mocha */
import { isMultiaddr } from '@multiformats/multiaddr';
import { expect } from 'aegir/chai';
import { getDescribe, getIt } from '../utils/mocha.js';
export function testList(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('.bootstrap.list', function () {
        this.timeout(100 * 1000);
        let ipfs;
        before(async function () { ipfs = (await factory.spawn()).api; });
        after(async function () {
            await factory.clean();
        });
        it('should return a list of peers', async () => {
            const res = await ipfs.bootstrap.list();
            const peers = res.Peers;
            expect(peers).to.be.an('Array');
            expect(peers.every(ma => isMultiaddr(ma))).to.be.true();
        });
    });
}
//# sourceMappingURL=list.js.map