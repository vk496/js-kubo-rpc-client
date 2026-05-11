import type { BitswapStats } from '../../../../src/bitswap/index.js';
import type { RepoStatResult } from '../../../../src/repo/index.js';
import type { StatsBWResult } from '../../../../src/stats/index.js';
export declare function expectIsBitswap(err: Error | null, stats: BitswapStats): void;
export declare function expectIsBandwidth(err: Error | null, stats: StatsBWResult): void;
export declare function expectIsRepo(err: Error | null, res: RepoStatResult): void;
//# sourceMappingURL=utils.d.ts.map