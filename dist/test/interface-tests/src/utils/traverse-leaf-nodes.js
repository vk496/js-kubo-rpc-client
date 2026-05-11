export async function* traverseLeafNodes(ipfs, cid) {
    async function* traverse(cid) {
        const { value: node } = await ipfs.dag.get(cid);
        if (node instanceof Uint8Array || node.Links.length === 0) {
            yield {
                node,
                cid
            };
            return;
        }
        for (const link of node.Links) {
            yield* traverse(link.Hash);
        }
    }
    yield* traverse(cid);
}
//# sourceMappingURL=traverse-leaf-nodes.js.map