import { isSkip } from './mocha.js';
export function createSuite(tests, parent) {
    const suite = (factory, options = {}) => {
        Object.keys(tests).forEach(t => {
            const opts = Object.assign({}, options);
            const suiteName = parent != null ? `${parent}.${t}` : t;
            if (Array.isArray(opts.skip)) {
                const skip = opts.skip
                    .map((s) => isSkip(s) ? s : { name: s, reason: '🤷' })
                    .find((s) => s.name === suiteName);
                if (skip != null) {
                    opts.skip = skip;
                }
            }
            if (Array.isArray(opts.only)) {
                if (opts.only.includes(suiteName)) {
                    opts.only = true;
                }
            }
            tests[t](factory, opts);
        });
    };
    return Object.assign(suite, tests);
}
//# sourceMappingURL=suite.js.map