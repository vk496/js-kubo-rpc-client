export function iterableOf(thing) {
    return [thing];
}
export function asyncIterableOf(thing) {
    return (async function* () {
        yield thing;
    }());
}
export function browserReadableStreamOf(thing) {
    return new ReadableStream({
        start(controller) {
            controller.enqueue(thing);
            controller.close();
        }
    });
}
//# sourceMappingURL=iterables.js.map