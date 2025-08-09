'use client';

import { useTranslations } from 'next-intl';
import React from 'react';

import { PaddleCheckout } from '@/components/PaddleCheckout';
import type { PricingPlan } from '@/types/Subscription';

interface PaddlePaymentButtonProps {
  plan: PricingPlan;
  isCurrentPlan?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function PaddlePaymentButton({
  plan,
  isCurrentPlan = false,
  onSuccess,
  onError,
}: PaddlePaymentButtonProps) {
  const t = useTranslations('PricingPlan');

  const getPriceId = () => {
    const env = process.env.NODE_ENV;
    if (env === 'production') {
      return plan.prodPriceId;
    } else if (env === 'test') {
      return plan.testPriceId;
    } else {
      return plan.devPriceId;
    }
  };

  const handleSuccess = (data: any) => {
    console.log('Payment successful:', data);
    onSuccess?.(data);
    // You can redirect to dashboard or show success message
    window.location.href = '/dashboard?payment=success';
  };

  const handleError = (error: any) => {
    console.error('Payment failed:', error);
    onError?.(error);
    // You can show error message to user
  };

  if (isCurrentPlan) {
    return (
      <button
        disabled
        className="w-full rounded-md bg-muted px-4 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed"
      >
        {t('current_plan')}
      </button>
    );
  }

  return (
    <PaddleCheckout
      priceId={getPriceId()}
      onSuccess={handleSuccess}
      onError={handleError}
      className="w-full"
    >
      {t('get_started')}
    </PaddleCheckout>
  );
}
