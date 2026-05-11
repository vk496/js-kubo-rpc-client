/* eslint-env mocha */
import { expect } from 'aegir/chai';
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string';
import { getDescribe, getIt } from '../utils/mocha.js';
export function testStat(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('.block.stat', () => {
        const data = uint8ArrayFromString('blorb');
        let ipfs;
        let cid;
        before(async function () {
            ipfs = (await factory.spawn()).api;
            cid = await ipfs.block.put(data);
        });
        after(async function () {
            await factory.clean();
        });
        it('should stat by CID', async () => {
            const stats = await ipfs.block.stat(cid);
            expect(stats.cid.toString()).to.equal(cid.toString());
            expect(stats).to.have.property('size', data.length);
        });
        it('should return error for missing argument', () => {
            // @ts-expect-error invalid input
            return expect(ipfs.block.stat(null)).to.eventually.be.rejected
                .and.be.an.instanceOf(Error);
        });
        it('should return error for invalid argument', () => {
            // @ts-expect-error invalid input
            return expect(ipfs.block.stat('invalid')).to.eventually.be.rejected
                .and.be.an.instanceOf(Error);
        });
    });
}
//# sourceMappingURL=stat.js.map