import { expect } from 'aegir/chai';
import loadFixture from 'aegir/fixtures';
import drain from 'it-drain';
import first from 'it-first';
import { bytes } from 'multiformats';
import { CID } from 'multiformats/cid';
import { code, encode } from 'multiformats/codecs/raw';
import { sha256 } from 'multiformats/hashes/sha2';
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string';
const { fromString } = bytes;
export const pinTypes = {
    direct: 'direct',
    recursive: 'recursive',
    indirect: 'indirect',
    all: 'all'
};
export const fixtures = Object.freeze({
    // NOTE: files under 'directory' need to be different than standalone ones in 'files'
    directory: Object.freeze({
        cid: CID.parse('QmVfR81gGg1a5pLFybBF1dvFY8fVcvdan2oT9WT4Git6XH'),
        files: Object.freeze([Object.freeze({
                path: 'test-folder/ipfs-add.js',
                data: loadFixture('test/interface-tests/fixtures/test-folder/ipfs-add.js'),
                cid: CID.parse('QmabGLRzzSFDwsh7rfLfib2U2Xk2x4XiCgpWwZfcUx4dtq')
            }), Object.freeze({
                path: 'test-folder/files/ipfs.txt',
                data: loadFixture('test/interface-tests/fixtures/test-folder/files/ipfs.txt'),
                cid: CID.parse('QmdFyxZXsFiP4csgfM5uPu99AvFiKH62CSPDw5TP92nr7w')
            })])
    }),
    files: Object.freeze([Object.freeze({
            data: uint8ArrayFromString('Plz add me!\n'),
            cid: CID.parse('Qma4hjFTnCasJ8PVp3mZbZK5g2vGDT4LByLJ7m8ciyRFZP'),
            pinName: 'file-1'
        }), Object.freeze({
            data: loadFixture('test/interface-tests/fixtures/test-folder/files/hello.txt'),
            cid: CID.parse('QmY9cxiHqTFoWamkQVkpmmqzBrY3hCBEL2XNu3NtX74Fuu'),
            pinName: 'file-2'
        })])
});
export const clearPins = async (ipfs) => {
    await drain(ipfs.pin.rmAll(ipfs.pin.ls({ type: pinTypes.recursive })));
    await drain(ipfs.pin.rmAll(ipfs.pin.ls({ type: pinTypes.direct })));
};
export const clearRemotePins = async (ipfs) => {
    for (const { service } of await ipfs.pin.remote.service.ls()) {
        const cids = [];
        const status = ['queued', 'pinning', 'pinned', 'failed'];
        for await (const pin of ipfs.pin.remote.ls({ status, service })) {
            cids.push(pin.cid);
        }
        if (cids.length > 0) {
            await ipfs.pin.remote.rmAll({
                cid: cids,
                status,
                service
            });
        }
    }
};
export const addRemotePins = async (ipfs, service, pins) => {
    const requests = [];
    for (const [name, cid] of Object.entries(pins)) {
        requests.push(ipfs.pin.remote.add(cid, {
            name,
            service,
            background: true
        }));
    }
    const settledResults = await Promise.allSettled(requests);
    const values = [];
    const failures = [];
    settledResults.forEach((settled) => {
        if (settled.status === 'fulfilled') {
            values.push(settled.value);
        }
        else {
            failures.push(settled.reason);
        }
    });
    if (failures.length > 0) {
        // eslint-disable-next-line no-console
        console.error('addRemotePins failures: ', failures);
    }
    return values;
};
export const clearServices = async (ipfs) => {
    const services = await ipfs.pin.remote.service.ls();
    await Promise.all(services.map(async ({ service }) => ipfs.pin.remote.service.rm(service)));
};
export const expectPinned = async (ipfs, cid, type = pinTypes.all, pinned = true) => {
    if (typeof type === 'boolean') {
        pinned = type;
        type = pinTypes.all;
    }
    const result = await isPinnedWithType(ipfs, cid, type);
    expect(result).to.eql(pinned);
};
export const expectNotPinned = async (ipfs, cid, type = pinTypes.all) => {
    return expectPinned(ipfs, cid, type, false);
};
export async function isPinnedWithType(ipfs, cid, type) {
    try {
        const res = await first(ipfs.pin.ls({ paths: cid, type }));
        return Boolean(res);
    }
    catch (err) {
        return false;
    }
}
export async function getInlineCid(value = process.hrtime().toString()) {
    const inlineUint8Array = fromString(value);
    try {
        const bytes = encode(inlineUint8Array);
        const hash = await sha256.digest(bytes);
        /**
         * @type {CID<string, 85, 18, 1>}
         */
        const cid = CID.create(1, code, hash);
        return cid;
    }
    catch (err) {
        // eslint-disable-next-line no-console
        console.error('Problem creating an inline CID', err);
        throw err;
    }
}
//# sourceMappingURL=utils.js.map