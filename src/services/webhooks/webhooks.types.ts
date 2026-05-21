import type { components, operations } from "../../models/waas-types.js"

// ── Schemas ─────────────────────────────────────────────────────────────────
export type Core_Webhook = components["schemas"]["v2Webhook"]
export type Core_CreateWebhookRequest = components["schemas"]["v2CreateWebhookRequest"]
export type Core_ListWebhooksResponse = components["schemas"]["v2ListWebhooksResponse"]
export type Core_Subscription = components["schemas"]["v2Subscription"]
export type Core_SubscriptionConfig = components["schemas"]["v2SubscriptionConfig"]
export type Core_ListSubscriptionsResponse = components["schemas"]["v2ListSubscriptionsResponse"]

// ── ListWebhooks ────────────────────────────────────────────────────────────
export type ListWebhooksQueryParams = NonNullable<
  operations["WebhookService_ListWebhooks"]["parameters"]["query"]
>

// ── GetWebhook / DeleteWebhook ──────────────────────────────────────────────
export type GetWebhookPathParams = operations["WebhookService_GetWebhook"]["parameters"]["path"]
export type DeleteWebhookPathParams =
  operations["WebhookService_DeleteWebhook"]["parameters"]["path"]

// ── ListSubscriptions ───────────────────────────────────────────────────────
export type ListSubscriptionsPathParams =
  operations["WebhookService_ListSubscriptions"]["parameters"]["path"]
export type ListSubscriptionsQueryParams = NonNullable<
  operations["WebhookService_ListSubscriptions"]["parameters"]["query"]
>

// ── CreateSubscriptions ─────────────────────────────────────────────────────
export type CreateSubscriptionsPathParams =
  operations["WebhookService_CreateSubscriptions"]["parameters"]["path"]
/**
 * The endpoint accepts a *list* of subscription configs in a single call;
 * the body is an array, not an object. The response mirrors that — an array
 * of `Core_Subscription`.
 */
export type CreateSubscriptionsBody =
  operations["WebhookService_CreateSubscriptions"]["requestBody"]["content"]["application/json"]

// ── GetSubscription / DeleteSubscription ────────────────────────────────────
export type GetSubscriptionPathParams =
  operations["WebhookService_GetSubscription"]["parameters"]["path"]
export type DeleteSubscriptionPathParams =
  operations["WebhookService_DeleteSubscription"]["parameters"]["path"]
