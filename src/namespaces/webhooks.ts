import { URLs } from "../constants/urls.js"
import type {
  Core_CreateWebhookRequest,
  Core_ListSubscriptionsResponse,
  Core_ListWebhooksResponse,
  Core_Subscription,
  Core_Webhook,
  CreateSubscriptionsBody,
  CreateSubscriptionsPathParams,
  DeleteSubscriptionPathParams,
  DeleteWebhookPathParams,
  GetSubscriptionPathParams,
  GetWebhookPathParams,
  ListSubscriptionsPathParams,
  ListSubscriptionsQueryParams,
  ListWebhooksQueryParams,
} from "../services/webhooks/index.js"
import type { TypedTransport } from "../transport/index.js"

export function createWebhooks(t: TypedTransport) {
  return {
    // ── Webhooks ──────────────────────────────────────────────────────────
    list: (query?: ListWebhooksQueryParams) =>
      t.get<Core_ListWebhooksResponse>(URLs.webhooks, query),

    create: (body: Core_CreateWebhookRequest) => t.post<Core_Webhook>(URLs.webhooks, body),

    get: (params: GetWebhookPathParams) => t.get<Core_Webhook>(URLs.webhook, params),

    delete: (params: DeleteWebhookPathParams) => t.delete<unknown>(URLs.webhook, params),

    // ── Subscriptions ─────────────────────────────────────────────────────
    listSubscriptions: (
      params: ListSubscriptionsPathParams,
      query?: ListSubscriptionsQueryParams,
    ) =>
      t.get<Core_ListSubscriptionsResponse>(URLs.webhookSubscriptions, {
        ...params,
        ...query,
      }),

    /**
     * Create one or more subscriptions on a webhook. The body is a *list*
     * of `Core_SubscriptionConfig` — the endpoint creates them atomically
     * and returns the resulting `Core_Subscription[]`.
     */
    createSubscriptions: (params: CreateSubscriptionsPathParams, body: CreateSubscriptionsBody) =>
      t.post<Core_Subscription[]>(URLs.webhookSubscriptions, body, params),

    getSubscription: (params: GetSubscriptionPathParams) =>
      t.get<Core_Subscription>(URLs.webhookSubscription, params),

    deleteSubscription: (params: DeleteSubscriptionPathParams) =>
      t.delete<unknown>(URLs.webhookSubscription, params),
  } as const
}
