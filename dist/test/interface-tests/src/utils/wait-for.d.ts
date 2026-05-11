export interface Test {
    (): Promise<boolean> | boolean;
}
export interface Options {
    timeout?: number;
    interval?: number;
    name?: string;
}
/**
 * Wait for async function `test` to resolve true or timeout after
 * options.timeout milliseconds.
 */
export default function waitFor(test: Test, options?: Options): Promise<void>;
//# sourceMappingURL=wait-for.d.ts.map