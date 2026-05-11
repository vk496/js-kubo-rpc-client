/* eslint-env mocha */
import { expect } from 'aegir/chai';
import { nanoid } from 'nanoid';
import { getDescribe, getIt } from '../utils/mocha.js';
export function testGen(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('.key.gen', () => {
        const keyTypes = [
            {
                opts: { type: 'ed25519' }
            },
            {
                opts: {}
            }
        ];
        let ipfs;
        before(async function () {
            ipfs = (await factory.spawn()).api;
        });
        after(async function () {
            await factory.clean();
        });
        keyTypes.forEach((kt) => {
            it(`should generate a new ${kt.opts.type ?? 'default'} key`, async function () {
                this.timeout(20 * 1000);
                const name = nanoid();
                const key = await ipfs.key.gen(name, kt.opts);
                expect(key).to.exist();
                expect(key).to.have.property('name', name);
                expect(key).to.have.property('id');
            });
        });
    });
}
//# sourceMappingURL=gen.js.map