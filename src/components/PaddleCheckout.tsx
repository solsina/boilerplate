'use client';

import { useEffect, useRef } from 'react';

interface PaddleCheckoutProps {
  priceId: string;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onClose?: () => void;
  className?: string;
  children: React.ReactNode;
}

export function PaddleCheckout({
  priceId,
  onSuccess,
  onError,
  onClose,
  className = '',
  children,
}: PaddleCheckoutProps) {
  const paddleRef = useRef<any>(null);
  const clientId = process.env.NEXT_PUBLIC_PADDLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) {
      console.warn('Paddle Client ID is not configured. Paddle checkout will be disabled.');
      return;
    }

    // Initialize Paddle - using dynamic import to avoid SSR issues
    const initPaddle = async () => {
      try {
        const paddleModule = await import('@paddle/paddle-js');
        paddleRef.current = new paddleModule.default({
          clientId: clientId,
          environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
        });

        // Set up event listeners
        if (paddleRef.current) {
          paddleRef.current.on('checkout.completed', (data: any) => {
            console.log('Checkout completed:', data);
            onSuccess?.(data);
          });

          paddleRef.current.on('checkout.error', (error: any) => {
            console.error('Checkout error:', error);
            onError?.(error);
          });

          paddleRef.current.on('checkout.close', () => {
            console.log('Checkout closed');
            onClose?.();
          });
        }
      } catch (error) {
        console.error('Failed to initialize Paddle:', error);
        onError?.(new Error('Failed to initialize Paddle checkout'));
      }
    };

    initPaddle();

    return () => {
      if (paddleRef.current && typeof paddleRef.current.destroy === 'function') {
        paddleRef.current.destroy();
      }
    };
  }, [clientId, onSuccess, onError, onClose]);

  const handleCheckout = async () => {
    if (!clientId) {
      const error = new Error('Paddle is not configured. Please set up your Paddle Client ID.');
      console.error(error.message);
      onError?.(error);
      return;
    }

    if (!paddleRef.current) {
      const error = new Error('Paddle not initialized. Please try again.');
      console.error(error.message);
      onError?.(error);
      return;
    }

    try {
      if (typeof paddleRef.current.open === 'function') {
        await paddleRef.current.open({
          items: [
            {
              priceId: priceId,
              quantity: 1,
            },
          ],
          customerEmail: 'customer@example.com', // You can get this from your auth system
          successUrl: `${window.location.origin}/dashboard?success=true`,
          closeOnSuccess: true,
        });
      } else {
        throw new Error('Paddle checkout is not available');
      }
    } catch (error) {
      console.error('Failed to open checkout:', error);
      onError?.(error);
    }
  };

  // If Paddle is not configured, show a disabled button
  if (!clientId) {
    return (
      <button
        disabled
        className={`inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-muted-foreground cursor-not-allowed ${className}`}
        title="Paddle is not configured. Please set up your Paddle Client ID."
      >
        {children} (Paddle not configured)
      </button>
    );
  }

  return (
    <button
      onClick={handleCheckout}
      className={`inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
  );
}
