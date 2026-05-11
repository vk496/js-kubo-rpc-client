import http from 'http';
export interface PinningServiceStartOptions {
    port?: number;
    token?: string;
}
export interface PinningServiceInit {
    server: http.Server;
    host: string;
    port: number;
    token?: string;
}
export declare class PinningService {
    static start({ port, token }?: PinningServiceStartOptions): Promise<PinningService>;
    server: http.Server;
    host: string;
    port: number;
    token?: string;
    constructor({ server, host, port, token }: PinningServiceInit);
    get endpoint(): string;
    stop(): Promise<void>;
}
//# sourceMappingURL=mock-pinning-service.d.ts.map