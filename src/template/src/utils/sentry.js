import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

export function initSentry (app, router) {
  Sentry.init({
    app,
    dsn: "https://c3bcab1d02e64efbbd462ef3ccd8ba8a@o466797.ingest.sentry.io/4504398571634688",
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracePropagationTargets: ["localhost", "my-site-url.com", /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}
