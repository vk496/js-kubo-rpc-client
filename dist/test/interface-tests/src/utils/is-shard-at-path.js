import { UnixFS } from 'ipfs-unixfs';
export default async function isShardAtPath(path, ipfs) {
    const stats = await ipfs.files.stat(path);
    const { value: node } = await ipfs.dag.get(stats.cid);
    const entry = UnixFS.unmarshal(node.Data);
    return entry.type === 'hamt-sharded-directory';
}
//# sourceMappingURL=is-shard-at-path.js.map