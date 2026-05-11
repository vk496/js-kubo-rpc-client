export interface Skip {
    name?: string;
    reason?: string;
}
export declare const isSkip: (o: any) => o is Skip;
export interface MochaConfig {
    skip?: Skip | boolean;
    only?: boolean;
}
/**
 * Get a "describe" function that is optionally 'skipped' or 'onlyed'
 * If skip/only are boolean true, or an object with a reason property, then we
 * want to skip/only the whole suite
 */
export declare function getDescribe(config: MochaConfig & {
    skip: true;
}): Mocha.PendingSuiteFunction;
export declare function getDescribe(config: MochaConfig & {
    only: true;
}): Mocha.ExclusiveSuiteFunction;
export declare function getDescribe(config?: MochaConfig): Mocha.SuiteFunction;
/**
 * Get an "it" function that is optionally 'skipped' or 'onlyed'
 * If skip/only is an array, then we _might_ want to skip/only the specific
 * test if one of the items in the array is the same as the test name or if one
 * of the items in the array is an object with a name property that is the same
 * as the test name.
 */
export declare function getIt(config?: MochaConfig): Mocha.TestFunction;
//# sourceMappingURL=mocha.d.ts.map