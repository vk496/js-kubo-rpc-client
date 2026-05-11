/* eslint-env mocha */
import { expect } from 'aegir/chai';
import { getDescribe, getIt } from '../utils/mocha.js';
export function testState(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('.name.pubsub.state', () => {
        let ipfs;
        before(async function () {
            ipfs = (await factory.spawn()).api;
        });
        after(async function () {
            await factory.clean();
        });
        it('should get the current state of pubsub', async function () {
            this.timeout(50 * 1000);
            const res = await ipfs.name.pubsub.state();
            expect(res).to.exist();
            expect(res).to.have.property('enabled');
            expect(res.enabled).to.be.eql(true);
        });
    });
}
//# sourceMappingURL=state.js.map