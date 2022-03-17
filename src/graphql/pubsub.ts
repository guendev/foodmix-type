import { RedisPubSub } from "graphql-redis-subscriptions"

export const pubsub = new RedisPubSub()

export const channel: { [key: string]: string } = {
    NOTIFY: "NOTIFY",
    ACCOUNT: "ACCOUNT",
    RECIPE: "RECIPE",
}
