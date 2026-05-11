/* eslint-env mocha */
import { expect } from 'aegir/chai';
import { errorHandler, HTTPError } from '../src/lib/core.js';
import { throwsAsync } from './utils/throws-async.js';
describe('lib/error-handler', function () {
    it('should parse json error response', async function () {
        const res = {
            ok: false,
            statusText: 'test',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            json: async () => Promise.resolve({
                Message: 'boom',
                Code: 0,
                Type: 'error'
            }),
            bytes: async () => Promise.reject(new Error('boom')),
            status: 500,
            redirected: false,
            url: '',
            type: 'basic',
            clone: () => { },
            body: null,
            bodyUsed: false,
            arrayBuffer: () => { },
            blob: () => { },
            formData: () => { },
            text: () => { }
        };
        const err = await throwsAsync(async () => {
            await errorHandler(res);
        });
        expect(err instanceof HTTPError).to.be.true();
        expect(err.message).to.eql('boom');
        expect(err.response.status).to.eql(500);
    });
    it('should gracefully fail on parse json', async function () {
        const res = {
            ok: false,
            statusText: 'test',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            json: async () => 'boom', // not valid json!
            bytes: async () => Promise.reject(new Error('boom')),
            status: 500,
            redirected: false,
            url: '',
            type: 'basic',
            clone: () => { },
            body: null,
            bodyUsed: false,
            arrayBuffer: () => { },
            blob: () => { },
            formData: () => { },
            text: () => { }
        };
        const err = await throwsAsync(errorHandler(res));
        expect(err instanceof HTTPError).to.be.true();
    });
    it('should gracefully fail on read text', async function () {
        const res = {
            ok: false,
            statusText: 'test',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            text: async () => Promise.reject(new Error('boom')),
            status: 500,
            json: async () => 'boom', // not valid json!
            bytes: async () => Promise.reject(new Error('boom')),
            redirected: false,
            url: '',
            type: 'basic',
            clone: () => { },
            body: null,
            bodyUsed: false,
            arrayBuffer: () => { },
            blob: () => { },
            formData: () => { }
        };
        const err = await throwsAsync(errorHandler(res));
        expect(err instanceof HTTPError).to.be.true();
    });
});
//# sourceMappingURL=lib.error-handler.spec.js.map