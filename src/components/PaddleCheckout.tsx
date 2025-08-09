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
      console.error('Paddle Client ID is not configured');
      return;
    }

    // Initialize Paddle - using dynamic import to avoid SSR issues
    const initPaddle = async () => {
      try {
        const { Paddle } = await import('@paddle/paddle-js');
        paddleRef.current = new Paddle({
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
    if (!paddleRef.current) {
      console.error('Paddle not initialized');
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
      }
    } catch (error) {
      console.error('Failed to open checkout:', error);
      onError?.(error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className={`inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
  );
}
