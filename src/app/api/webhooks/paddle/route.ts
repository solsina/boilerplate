import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/libs/DB';
import { organizationSchema } from '@/models/Schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('paddle-signature');

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing Paddle signature' },
        { status: 400 }
      );
    }

    // Verify webhook signature (you'll need to implement this)
    // const isValid = verifyPaddleWebhook(body, signature, process.env.PADDLE_WEBHOOK_SECRET);
    // if (!isValid) {
    //   return NextResponse.json(
    //     { error: 'Invalid webhook signature' },
    //     { status: 401 }
    //   );
    // }

    const event = JSON.parse(body);
    console.log('Paddle webhook received:', event);

    switch (event.event_type) {
      case 'subscription.created':
        await handleSubscriptionCreated(event);
        break;
      case 'subscription.updated':
        await handleSubscriptionUpdated(event);
        break;
      case 'subscription.cancelled':
        await handleSubscriptionCancelled(event);
        break;
      case 'transaction.completed':
        await handleTransactionCompleted(event);
        break;
      default:
        console.log('Unhandled webhook event:', event.event_type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionCreated(event: any) {
  const { data } = event;
  const subscription = data.subscription;
  const customer = data.customer;

  // Update organization with subscription details
  await db
    .update(organizationSchema)
    .set({
      paddleCustomerId: customer.id,
      paddleSubscriptionId: subscription.id,
      paddleSubscriptionPriceId: subscription.items[0]?.price?.id,
      paddleSubscriptionStatus: subscription.status,
      paddleSubscriptionCurrentPeriodEnd: new Date(subscription.next_billed_at).getTime(),
    })
    .where(eq(organizationSchema.id, customer.custom_data?.organization_id));
}

async function handleSubscriptionUpdated(event: any) {
  const { data } = event;
  const subscription = data.subscription;

  // Update subscription details
  await db
    .update(organizationSchema)
    .set({
      paddleSubscriptionStatus: subscription.status,
      paddleSubscriptionCurrentPeriodEnd: new Date(subscription.next_billed_at).getTime(),
    })
    .where(eq(organizationSchema.paddleSubscriptionId, subscription.id));
}

async function handleSubscriptionCancelled(event: any) {
  const { data } = event;
  const subscription = data.subscription;

  // Mark subscription as cancelled
  await db
    .update(organizationSchema)
    .set({
      paddleSubscriptionStatus: 'cancelled',
    })
    .where(eq(organizationSchema.paddleSubscriptionId, subscription.id));
}

async function handleTransactionCompleted(event: any) {
  const { data } = event;
  const transaction = data.transaction;

  console.log('Transaction completed:', transaction);
  // Handle successful payment
  // You might want to update subscription status or send confirmation emails
}
