import type { PingResult } from '../../../../src/index.js';
export declare function expectIsPingResponse(obj: any): void;
/**
 * Determine if a ping response object is a pong, or something else, like a
 * status message
 */
export declare function isPong(pingResponse: any): pingResponse is PingResult;
//# sourceMappingURL=utils.d.ts.map