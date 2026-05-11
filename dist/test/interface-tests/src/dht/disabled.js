/* eslint-env mocha */
import { expect } from 'aegir/chai';
import all from 'it-all';
import { CID } from 'multiformats/cid';
import { getDescribe, getIt } from '../utils/mocha.js';
export function testDisabled(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('disabled', function () {
        this.timeout(80 * 1000);
        let nodeA;
        let nodeB;
        before(async function () {
            nodeA = (await factory.spawn({
                init: {
                    config: {
                        Routing: {
                            Type: 'none'
                        }
                    }
                }
            })).api;
            nodeB = (await factory.spawn()).api;
            const nodeBId = await nodeB.id();
            await nodeA.swarm.connect(nodeBId.addresses[0]);
        });
        after(async function () {
            await factory.clean();
        });
        it('should error when DHT not available', async () => {
            const events = await all(nodeA.dht.query(CID.parse('QmQULBtTjNcMwMr4VMNknnVv3RpytrLSdgpvMcTnfNhrBJ')));
            expect(events.filter(event => event.name === 'QUERY_ERROR')).to.not.be.empty();
        });
    });
}
//# sourceMappingURL=disabled.js.map