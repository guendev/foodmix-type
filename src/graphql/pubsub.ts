import { RedisPubSub } from "graphql-redis-subscriptions"

const pubsub = new RedisPubSub()

const channel: { [key: string]: string } = {}

export default {
    pubsub,
    channel
} as const
