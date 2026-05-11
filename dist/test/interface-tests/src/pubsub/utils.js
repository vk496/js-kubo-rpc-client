import { logger } from '@libp2p/logger';
import { peerIdFromString } from '@libp2p/peer-id';
import delay from 'delay';
import { nanoid } from 'nanoid';
import pRetry from 'p-retry';
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
const log = logger('js-kubo-rpc-client:pubsub:utils:test');
export async function waitForPeers(ipfs, topic, peersToWait, waitForMs) {
    const start = Date.now();
    while (true) {
        const peers = await ipfs.pubsub.peers(topic);
        const everyPeerFound = peersToWait.map(p => peerIdFromString(p)).every(p => peers.includes(p));
        if (everyPeerFound) {
            return;
        }
        if (Date.now() > start + waitForMs) {
            throw new Error(`Timed out waiting for peers to be subscribed to "${topic}"`);
        }
        await delay(10);
    }
}
const retryOptions = {
    retries: 5,
    onFailedAttempt: async ({ attemptNumber }) => {
        await delay(1000 * attemptNumber);
    },
    maxRetryTime: 10000
};
/**
 * This function does not wait properly when waiting for itself as a peer
 */
export const waitForTopicPeer = async (topic, peer, daemon, rOpts = {}) => {
    const peerId = (await peer.api.id()).id.toString();
    const daemonDeerId = (await daemon.api.id()).id.toString();
    return pRetry(async () => {
        log(`waitForTopicPeer(${topic}): waiting for topic ${topic} from peer ${peerId} on ${daemonDeerId}`);
        const peers = await daemon.api.pubsub.peers(topic);
        const peerStrings = peers.map(p => p.toString());
        log(`waitForTopicPeer(${topic}): peers(${peers.length}): ${peerStrings}`);
        if (!peerStrings.includes(peerId)) {
            throw new Error(`Could not find peer ${peerId}`);
        }
        else {
            log(`waitForTopicPeer(${topic}): Peer found`);
        }
    }, {
        ...retryOptions,
        ...rOpts
    });
};
export function getTopic() {
    return 'pubsub-tests-' + nanoid();
}
export async function getSubscriptionTestObject({ subscriber, subscriptionListener, publisher, topic, options, timeout }) {
    const subscriberId = await subscriber.api.id();
    const allMessages = [];
    timeout = timeout ?? 10000;
    log(`${topic}: ${subscriberId.id} is subscribing`);
    const subscriptionHandler = (msg) => {
        // log(`${topic}: received message`)
        if (msg.type !== 'signed') {
            throw new Error('Message was unsigned');
        }
        log(`${topic}: ${subscriberId.id} message content: '${uint8ArrayToString(msg.data)}'`);
        allMessages.push(msg);
        void subscriptionListener?.(msg);
    };
    await subscriber.api.pubsub.subscribe(topic, subscriptionHandler, options);
    await delay(100);
    return {
        getMessages: () => allMessages,
        waitForMessages: async (count = 1, pRetryOpts = {}) => {
            await pRetry(async () => {
                if (allMessages.length < count) {
                    throw new Error(`Wanting ${count} messages but only have ${allMessages.length}`);
                }
            }, {
                retries: 5,
                onFailedAttempt: async ({ attemptNumber }) => {
                    await delay(1000 * attemptNumber);
                },
                maxRetryTime: timeout,
                ...pRetryOpts
            });
            return allMessages;
        },
        publishMessage: async (data) => {
            try {
                log(`${topic}: publishing message '${uint8ArrayToString(data)}'`);
                await publisher.api.pubsub.publish(topic, data);
                log(`${topic}: message published.`);
            }
            catch (err) {
                log(`${topic}: Error publishing message from ${(await publisher.api.id()).id}`, err);
            }
        },
        unsubscribe: async () => {
            await subscriber.api.pubsub.unsubscribe(topic, subscriptionHandler);
        }
    };
}
//# sourceMappingURL=utils.js.map