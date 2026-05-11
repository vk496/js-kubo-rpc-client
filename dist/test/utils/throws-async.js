function isPromise(obj) {
    return obj.then != null;
}
export async function throwsAsync(fnOrPromise) {
    try {
        await (isPromise(fnOrPromise) ? fnOrPromise : fnOrPromise());
    }
    catch (err) {
        return err;
    }
    throw new Error('did not throw');
}
//# sourceMappingURL=throws-async.js.map