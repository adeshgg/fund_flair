import { NextResponse } from 'next/server'

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2020-08-27',
})

export async function POST(req: Request) {
  const data = await req.json()
  const origin = req.headers.get('origin') || 'http://localhost:3000'

  const params = {
    submit_type: 'donate',
    payment_method_types: ['card'],
    line_items: [
      {
        name: 'Fund Flair Donation',
        amount: Number(data.amount) * 100,
        currency: 'inr',
        quantity: 1,
      },
    ],
    mode: 'payment',
    // success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&amount=${data.amount}`,
    success_url: `${origin}/success?fundId=${data.fundId}&amount=${data.amount}`,
    cancel_url: `${origin}/cancel`,
  }

  const checkoutSession = await stripe.checkout.sessions.create(params)
  console.log(checkoutSession.id)
  console.log(data.fundId)
  return NextResponse.json({
    sessionId: checkoutSession.id,
    fundId: data.fundId,
  })
}

export function GET() {
  return NextResponse.json({ msg: 'Hello from the API' })
}
