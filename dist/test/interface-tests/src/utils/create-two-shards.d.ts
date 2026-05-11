import type { KuboRPCClient } from '../../../../src/index.js';
import type { CID } from 'multiformats/cid';
export interface TwoShardsResult {
    nextFile: {
        path: string;
        content: Uint8Array;
    };
    dirWithAllFiles: CID;
    dirWithSomeFiles: CID;
    dirPath: string;
}
export declare function createTwoShards(ipfs: KuboRPCClient, fileCount: number): Promise<TwoShardsResult>;
//# sourceMappingURL=create-two-shards.d.ts.map