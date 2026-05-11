import http from 'http';
import getPort from 'aegir/get-port';
// @ts-expect-error no types
import { setup } from 'mock-ipfs-pinning-service';
const defaultPort = 1139;
const defaultToken = 'secret';
export class PinningService {
    static async start({ port = defaultPort, token = defaultToken } = {}) {
        const service = await setup({ token });
        const server = http.createServer(service);
        const host = '127.0.0.1';
        port = await getPort(port);
        await new Promise(resolve => server.listen(port, host, () => {
            resolve(null);
        }));
        return new PinningService({ server, host, port, token });
    }
    server;
    host;
    port;
    token;
    constructor({ server, host, port, token }) {
        this.server = server;
        this.host = host;
        this.port = port;
        this.token = token;
    }
    get endpoint() {
        return `http://${this.host}:${this.port}`;
    }
    async stop() {
        return new Promise((resolve, reject) => {
            this.server.close((err) => {
                if (err != null) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
//# sourceMappingURL=mock-pinning-service.js.map