/* eslint-env mocha */
import { AES_GCM } from '@libp2p/crypto/ciphers';
import { privateKeyToProtobuf, generateKeyPair } from '@libp2p/crypto/keys';
import { expect } from 'aegir/chai';
import { base64 } from 'multiformats/bases/base64';
import { nanoid } from 'nanoid';
import { getDescribe, getIt } from '../utils/mocha.js';
export function testImport(factory, options) {
    const describe = getDescribe(options);
    const it = getIt(options);
    describe('.key.import', () => {
        let ipfs;
        before(async function () {
            ipfs = (await factory.spawn()).api;
        });
        after(async function () {
            await factory.clean();
        });
        it('should import an exported key', async () => {
            const password = nanoid();
            const key = await generateKeyPair('Ed25519');
            const exported = await exporter(privateKeyToProtobuf(key), password);
            const importedKey = await ipfs.key.import('clone', exported, password);
            expect(importedKey).to.exist();
            expect(importedKey).to.have.property('name', 'clone');
            expect(importedKey).to.have.property('id');
        });
    });
}
async function exporter(privateKey, password) {
    const cipher = AES_GCM.create();
    const encryptedKey = await cipher.encrypt(privateKey, password);
    return base64.encode(encryptedKey);
}
//# sourceMappingURL=import.js.map