import type { KuboRPCClient } from '../../../../src/index.js';
import type { PBNode } from '@ipld/dag-pb';
import type { CID } from 'multiformats/cid';
export declare function traverseLeafNodes(ipfs: KuboRPCClient, cid: CID): AsyncIterable<{
    node: PBNode;
    cid: CID;
}>;
//# sourceMappingURL=traverse-leaf-nodes.d.ts.map