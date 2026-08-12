"use client";

import { Suspense } from "react";
import { InviteProvider } from "./invite-provider";
import { QuoteWizard } from "./quote-wizard";

function QuoteWizardFallback() {
  return (
    <div className="wizard-panel animate-pulse">
      <div className="h-8 w-48 rounded bg-gray-bg" />
      <div className="mt-8 h-40 rounded-xl bg-gray-bg" />
    </div>
  );
}

export function DevisWizard() {
  return (
    <Suspense fallback={<QuoteWizardFallback />}>
      <InviteProvider>
        <QuoteWizard />
      </InviteProvider>
    </Suspense>
  );
}
