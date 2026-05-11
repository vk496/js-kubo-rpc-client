import http from 'node:http';
export interface TestServer {
    port: number;
    close(...args: Parameters<http.Server['close']>): ReturnType<http.Server['close']>;
}
//# sourceMappingURL=agent.d.ts.map