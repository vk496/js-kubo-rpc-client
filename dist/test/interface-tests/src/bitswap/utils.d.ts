import type { KuboRPCClient } from '../../../../src/index.js';
import type { PeerId } from '@libp2p/interface';
export interface WaitOptions {
    timeout?: number;
    interval?: number;
    peerId?: PeerId;
}
export declare function waitForWantlistKey(ipfs: KuboRPCClient, key: string, opts?: WaitOptions): Promise<void>;
export declare function waitForWantlistKeyToBeRemoved(ipfs: KuboRPCClient, key: string, opts?: WaitOptions): Promise<void>;
//# sourceMappingURL=utils.d.ts.map