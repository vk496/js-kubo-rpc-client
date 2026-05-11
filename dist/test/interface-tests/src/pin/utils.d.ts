import { CID } from 'multiformats/cid';
import type { KuboRPCClient } from '../../../../src/index.js';
import type { PinType } from '../../../../src/pin/index.js';
import type { RemotePin } from '../../../../src/pin/remote/index.js';
export declare const pinTypes: Record<string, PinType>;
export declare const fixtures: Readonly<{
    directory: Readonly<{
        cid: CID<unknown, number, number, import("multiformats").Version>;
        files: readonly (Readonly<{
            path: "test-folder/ipfs-add.js";
            data: Uint8Array<ArrayBufferLike>;
            cid: CID<unknown, number, number, import("multiformats").Version>;
        }> | Readonly<{
            path: "test-folder/files/ipfs.txt";
            data: Uint8Array<ArrayBufferLike>;
            cid: CID<unknown, number, number, import("multiformats").Version>;
        }>)[];
    }>;
    files: readonly (Readonly<{
        data: Uint8Array<ArrayBufferLike>;
        cid: CID<unknown, number, number, import("multiformats").Version>;
        pinName: "file-1";
    }> | Readonly<{
        data: Uint8Array<ArrayBufferLike>;
        cid: CID<unknown, number, number, import("multiformats").Version>;
        pinName: "file-2";
    }>)[];
}>;
export declare const clearPins: (ipfs: KuboRPCClient) => Promise<void>;
export declare const clearRemotePins: (ipfs: KuboRPCClient) => Promise<void>;
export declare const addRemotePins: (ipfs: KuboRPCClient, service: string, pins: Record<string, CID>) => Promise<RemotePin[]>;
export declare const clearServices: (ipfs: KuboRPCClient) => Promise<void>;
export declare const expectPinned: (ipfs: KuboRPCClient, cid: CID, type?: PinType, pinned?: boolean) => Promise<void>;
export declare const expectNotPinned: (ipfs: KuboRPCClient, cid: CID, type?: PinType) => Promise<void>;
export declare function isPinnedWithType(ipfs: KuboRPCClient, cid: CID, type: PinType): Promise<boolean>;
export declare function getInlineCid(value?: string): Promise<CID<string, 85, 18, 1>>;
//# sourceMappingURL=utils.d.ts.map