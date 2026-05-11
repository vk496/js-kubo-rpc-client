import type { Skip } from './mocha.js';
export interface CreateSuiteOptions {
    skip?: boolean | Skip | string[] | Skip[];
    only?: boolean | string | string[];
}
export declare function createSuite(tests: any, parent?: any): any;
//# sourceMappingURL=suite.d.ts.map