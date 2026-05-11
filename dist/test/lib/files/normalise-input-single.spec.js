/* eslint-env mocha */
import { File } from '@web-std/file';
import { expect } from 'aegir/chai';
import resolve from 'aegir/resolve';
import blobToIt from 'blob-to-it';
import all from 'it-all';
import { fromString as uint8ArrayFromString } from 'uint8arrays/from-string';
import { isNode } from 'wherearewe';
import { normaliseInput } from '../../../src/lib/files/normalise-input-single.js';
import { asyncIterableOf, browserReadableStreamOf, iterableOf } from '../../utils/iterables.js';
const STRING = () => 'hello world';
const NEWSTRING = () => new String('hello world'); // eslint-disable-line no-new-wrappers
const BUFFER = () => uint8ArrayFromString(STRING());
const ARRAY = () => Array.from(BUFFER());
const TYPEDARRAY = () => Uint8Array.from(ARRAY());
const FILE = () => new File([BUFFER()], 'test-file.txt');
const BLOB = () => new Blob([STRING()]);
async function verifyNormalisation(input) {
    expect(input.length).to.equal(1);
    expect(input[0].path).to.equal('');
    let content = input[0].content;
    if (content instanceof Blob) {
        content = blobToIt(content);
    }
    if (content == null || content instanceof Uint8Array) {
        throw new Error('Content expected');
    }
    // eslint-disable-next-line @typescript-eslint/await-thenable
    expect(await all(content)).to.deep.equal([BUFFER()]);
}
async function testContent(input) {
    const result = await all(normaliseInput(input));
    await verifyNormalisation(result);
}
async function testFailure(input, message) {
    await expect(all(normaliseInput(input))).to.eventually.be.rejectedWith(message);
}
describe('normalise-input-single', function () {
    function testInputType(content, name, { acceptStream }) {
        it(name, async function () {
            await testContent(content());
        });
        if (acceptStream) {
            it(`ReadableStream<${name}>`, async function () {
                await testContent(browserReadableStreamOf(content()));
            });
            it(`Iterable<${name}>`, async function () {
                await testContent(iterableOf(content()));
            });
            it(`AsyncIterable<${name}>`, async function () {
                await testContent(asyncIterableOf(content()));
            });
        }
        else {
            it(`Failure ReadableStream<${name}>`, async function () {
                await testFailure(browserReadableStreamOf(content()), /Unexpected input/);
            });
            it(`Failure Iterable<${name}>`, async function () {
                await testFailure(iterableOf(content()), /Unexpected input/);
            });
            it(`Failure AsyncIterable<${name}>`, async function () {
                await testFailure(asyncIterableOf(content()), /Unexpected input/);
            });
        }
        it(`{ path: '', content: ${name} }`, async function () {
            await testContent({ path: '', content: content() });
        });
        if (acceptStream) {
            it(`{ path: '', content: ReadableStream<${name}> }`, async function () {
                await testContent({ path: '', content: browserReadableStreamOf(content()) });
            });
            it(`{ path: '', content: Iterable<${name}> }`, async function () {
                await testContent({ path: '', content: iterableOf(content()) });
            });
            it(`{ path: '', content: AsyncIterable<${name}> }`, async function () {
                await testContent({ path: '', content: asyncIterableOf(content()) });
            });
        }
        if (acceptStream) {
            it(`ReadableStream<${name}>`, async function () {
                await testContent(browserReadableStreamOf(content()));
            });
        }
        else {
            it(`Failure ReadableStream<${name}>`, async function () {
                await testFailure(browserReadableStreamOf(content()), /multiple items passed/);
            });
        }
        it(`Failure Iterable<{ path: '', content: ${name} }>`, async function () {
            await testFailure(iterableOf({ path: '', content: content() }), /multiple items passed/);
        });
        it(`Failure AsyncIterable<{ path: '', content: ${name} }>`, async function () {
            await testFailure(asyncIterableOf({ path: '', content: content() }), /multiple items passed/);
        });
        if (acceptStream) {
            it(`Failure Iterable<{ path: '', content: ReadableStream<${name}> }>`, async function () {
                await testFailure(iterableOf({ path: '', content: browserReadableStreamOf(content()) }), /multiple items passed/);
            });
            it(`Failure Iterable<{ path: '', content: Iterable<${name}> }>`, async function () {
                await testFailure(iterableOf({ path: '', content: iterableOf(content()) }), /multiple items passed/);
            });
            it(`Failure Iterable<{ path: '', content: AsyncIterable<${name}> }>`, async function () {
                await testFailure(iterableOf({ path: '', content: asyncIterableOf(content()) }), /multiple items passed/);
            });
            it(`Failure AsyncIterable<{ path: '', content: ReadableStream<${name}> }>`, async function () {
                await testFailure(asyncIterableOf({ path: '', content: browserReadableStreamOf(content()) }), /multiple items passed/);
            });
            it(`Failure AsyncIterable<{ path: '', content: Iterable<${name}> }>`, async function () {
                await testFailure(asyncIterableOf({ path: '', content: iterableOf(content()) }), /multiple items passed/);
            });
            it(`Failure AsyncIterable<{ path: '', content: AsyncIterable<${name}> }>`, async function () {
                await testFailure(asyncIterableOf({ path: '', content: asyncIterableOf(content()) }), /multiple items passed/);
            });
        }
    }
    describe('String', () => {
        testInputType(STRING, 'String', {
            acceptStream: true
        });
        testInputType(NEWSTRING, 'new String()', {
            acceptStream: true
        });
    });
    describe('Buffer', () => {
        testInputType(BUFFER, 'Buffer', {
            acceptStream: true
        });
    });
    describe('Blob', () => {
        testInputType(BLOB, 'Blob', {
            acceptStream: false
        });
    });
    describe('@web-std/file', () => {
        testInputType(FILE, 'File', {
            acceptStream: false
        });
    });
    describe('Iterable<Number>', () => {
        testInputType(ARRAY, 'Iterable<Number>', {
            acceptStream: false
        });
    });
    describe('TypedArray', () => {
        testInputType(TYPEDARRAY, 'TypedArray', {
            acceptStream: true
        });
    });
    if (isNode) {
        let fs;
        before(async () => {
            fs = await import('fs');
        });
        describe('Node fs.ReadStream', () => {
            const NODEFSREADSTREAM = () => {
                const path = resolve('test/fixtures/file.txt');
                return fs.createReadStream(path);
            };
            testInputType(NODEFSREADSTREAM, 'Node fs.ReadStream', {
                acceptStream: false
            });
        });
    }
});
//# sourceMappingURL=normalise-input-single.spec.js.map