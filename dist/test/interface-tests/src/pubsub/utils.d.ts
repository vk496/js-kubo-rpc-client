import type { KuboRPCClient } from '../../../../src/index.js';
import type { PubSubSubscribeOptions, Message } from '../../../../src/pubsub/index.js';
import type { KuboNode } from 'ipfsd-ctl';
import type { Options as RetryOptions } from 'p-retry';
export declare function waitForPeers(ipfs: KuboRPCClient, topic: string, peersToWait: string[], waitForMs: number): Promise<void>;
/**
 * This function does not wait properly when waiting for itself as a peer
 */
export declare const waitForTopicPeer: (topic: string, peer: KuboNode, daemon: KuboNode, rOpts?: RetryOptions) => Promise<void>;
export declare function getTopic(): string;
interface SubscriptionTestObjectArgs {
    subscriber: KuboNode;
    publisher: KuboNode;
    topic: string;
    timeout: number;
    options?: PubSubSubscribeOptions;
    subscriptionListener?(msg: Message): Promise<void>;
}
interface SubscriptionTestObject {
    /**
     * get all the current messages
     */
    getMessages(): Message[];
    /**
     *
     * wait for count(default=1) messages on the given topic
     */
    waitForMessages(count?: number, pRetryOptions?: RetryOptions): Promise<Message[]>;
    /**
     * publish a message on the given topic
     */
    publishMessage(data: Uint8Array): Promise<void>;
    /**
     * unsubscribe from the given topic
     */
    unsubscribe(): Promise<void>;
}
export declare function getSubscriptionTestObject({ subscriber, subscriptionListener, publisher, topic, options, timeout }: SubscriptionTestObjectArgs): Promise<SubscriptionTestObject>;
export {};
//# sourceMappingURL=utils.d.ts.map