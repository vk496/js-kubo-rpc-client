import { CID } from 'multiformats/cid';
export declare const fixtures: Readonly<{
    directory: Readonly<{
        cid: CID<unknown, number, number, import("multiformats/cid").Version>;
        files: Readonly<Record<string, Uint8Array<ArrayBufferLike>>>;
    }>;
    smallFile: Readonly<{
        cid: CID<unknown, number, number, import("multiformats/cid").Version>;
        data: Uint8Array<ArrayBufferLike>;
    }>;
    bigFile: Readonly<{
        cid: CID<unknown, number, number, import("multiformats/cid").Version>;
        data: Uint8Array<ArrayBuffer>;
    }>;
    emptyFile: Readonly<{
        cid: CID<unknown, number, number, import("multiformats/cid").Version>;
        data: Uint8Array<ArrayBuffer>;
    }>;
}>;
export declare const byCID: (a: {
    cid: CID;
}, b: {
    cid: CID;
}) => 1 | -1;
//# sourceMappingURL=index.d.ts.map